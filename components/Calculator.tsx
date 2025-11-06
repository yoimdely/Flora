"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { DISTRICTS, PROPERTY_TYPES, RENT_FORMATS } from "../lib/constants";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(value);

type CalculatorForm = {
  district: string;
  area: number;
  sleeps: number;
  rentFormat: string;
  propertyType: string;
};

const initialValues: CalculatorForm = {
  district: DISTRICTS[0]?.value ?? "center",
  area: 40,
  sleeps: 3,
  rentFormat: RENT_FORMATS[0]?.value ?? "daily",
  propertyType: PROPERTY_TYPES[1]?.value ?? "one"
};

export function Calculator() {
  const [form, setForm] = useState<CalculatorForm>(initialValues);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const result = useMemo(() => {
    const district = DISTRICTS.find((item) => item.value === form.district) ?? DISTRICTS[0];
    const property = PROPERTY_TYPES.find((item) => item.value === form.propertyType) ?? PROPERTY_TYPES[0];
    const format = RENT_FORMATS.find((item) => item.value === form.rentFormat) ?? RENT_FORMATS[0];

    const baseIncome = form.area * district.baseRate * property.multiplier * format.factor;
    const fillRate = Math.min(0.95, district.occupancy + form.sleeps * 0.01 + property.multiplier * 0.02);
    const gross = baseIncome * fillRate;
    const floraCommission = gross * 0.3;
    const netIncome = gross - floraCommission;
    const selfManaged = gross * 0.75;
    const uplift = ((netIncome - selfManaged) / Math.max(selfManaged, 1)) * 100;

    return {
      netIncome,
      occupancy: fillRate,
      selfManaged,
      uplift
    };
  }, [form]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/calculator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form, result })
      });

      if (!response.ok) {
        throw new Error("Ошибка отправки");
      }

      setStatus("success");
      setTimeout(() => setStatus("idle"), 4000);
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <section id="calculator" className="section-padding">
      <div className="container-tight grid gap-10 md:grid-cols-2 md:items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Калькулятор доходности</h2>
          <p className="section-subtitle">
            Оцените потенциал объекта: формула учитывает метраж, район, формат сдачи и алгоритмическую загрузку. Точный прогноз
            рассчитываем после аудита и подключения аналитики.
          </p>
          <form className="glass-panel mt-8 grid gap-5 p-8" onSubmit={handleSubmit}>
            <label className="flex flex-col gap-2">
              <span className="text-sm text-white/60">Район</span>
              <select
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/90 focus:border-primary focus:outline-none"
                value={form.district}
                onChange={(event) => setForm((prev) => ({ ...prev, district: event.target.value }))}
              >
                {DISTRICTS.map((district) => (
                  <option key={district.value} value={district.value} className="bg-slate-900">
                    {district.label}
                  </option>
                ))}
              </select>
            </label>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-sm text-white/60">Площадь, м²</span>
                <input
                  type="number"
                  min={15}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-primary focus:outline-none"
                  value={form.area}
                  onChange={(event) => setForm((prev) => ({ ...prev, area: Number(event.target.value) }))}
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm text-white/60">Спальных мест</span>
                <input
                  type="number"
                  min={1}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-primary focus:outline-none"
                  value={form.sleeps}
                  onChange={(event) => setForm((prev) => ({ ...prev, sleeps: Number(event.target.value) }))}
                />
              </label>
            </div>
            <label className="flex flex-col gap-2">
              <span className="text-sm text-white/60">Формат сдачи</span>
              <select
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/90 focus:border-primary focus:outline-none"
                value={form.rentFormat}
                onChange={(event) => setForm((prev) => ({ ...prev, rentFormat: event.target.value }))}
              >
                {RENT_FORMATS.map((format) => (
                  <option key={format.value} value={format.value} className="bg-slate-900">
                    {format.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm text-white/60">Тип жилья</span>
              <select
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/90 focus:border-primary focus:outline-none"
                value={form.propertyType}
                onChange={(event) => setForm((prev) => ({ ...prev, propertyType: event.target.value }))}
              >
                {PROPERTY_TYPES.map((type) => (
                  <option key={type.value} value={type.value} className="bg-slate-900">
                    {type.label}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="submit"
              className="rounded-full bg-gradient-to-r from-primary to-emerald-500 px-6 py-3 text-base font-semibold text-slate-950 transition hover:opacity-90"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Считаем..." : "Рассчитать прогноз"}
            </button>
            {status === "success" ? (
              <p className="rounded-2xl bg-emerald-500/10 p-4 text-sm text-emerald-200">
                Расчёт отправлен в CRM. Менеджер свяжется и пришлёт детальный план запуска.
              </p>
            ) : null}
            {status === "error" ? (
              <p className="rounded-2xl bg-red-500/10 p-4 text-sm text-red-200">
                Не удалось отправить данные. Попробуйте позже или напишите в Telegram @florahome.
              </p>
            ) : null}
          </form>
        </motion.div>
        <motion.div
          className="glass-panel flex flex-col gap-6 p-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-2xl font-semibold text-white">Прогноз чистого дохода</h3>
          <div className="grid gap-4 text-white/80">
            <div>
              <span className="text-sm uppercase tracking-[0.3em] text-white/50">Чистый доход с Flora Home</span>
              <p className="mt-2 text-4xl font-semibold text-white">{formatCurrency(result.netIncome)}</p>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <span className="text-xs uppercase tracking-[0.3em] text-white/50">Заполняемость</span>
                <p className="mt-2 text-2xl font-semibold text-white">{Math.round(result.occupancy * 100)}%</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <span className="text-xs uppercase tracking-[0.3em] text-white/50">Самостоятельно</span>
                <p className="mt-2 text-xl font-semibold text-white/80">{formatCurrency(result.selfManaged)}</p>
              </div>
            </div>
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5">
              <span className="text-xs uppercase tracking-[0.3em] text-emerald-200">Рост дохода</span>
              <p className="mt-2 text-3xl font-semibold text-emerald-200">{result.uplift > 0 ? `+${result.uplift.toFixed(1)}%` : "Без изменений"}</p>
            </div>
          </div>
          <button className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
            Получить полный отчёт и план запуска
          </button>
        </motion.div>
      </div>
    </section>
  );
}
