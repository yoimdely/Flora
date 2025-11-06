"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SOCIAL_LINKS } from "../lib/constants";

const initialState = {
  name: "",
  phone: "",
  email: "",
  district: "",
  listing: ""
};

export function FinalCTA() {
  const [formData, setFormData] = useState(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Ошибка отправки");
      }

      setStatus("success");
      setFormData(initialState);
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <video
          className="h-full w-full object-cover opacity-60"
          autoPlay
          loop
          muted
          playsInline
          poster="/images/footer/poster.jpg"
        >
          <source src="/videos/sea.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-slate-950/80" />
      </div>
      <div className="container-tight section-padding grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-4xl font-semibold text-white md:text-5xl">
            Готовы узнать, сколько зарабатывает ваша квартира?
          </h2>
          <p className="text-lg text-white/70">
            Отправим прогноз, план запуска и чек-лист подготовки. Связь в WhatsApp, Telegram или email — как удобно.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-white/60">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/10 px-4 py-2 transition hover:border-white/40"
              >
                {social.name}
              </a>
            ))}
          </div>
          <div className="text-sm text-white/50">
            <p>Офис: Сочи, ул. Войкова, 1</p>
            <p>Email: hello@flora-home.ru</p>
            <p>© 2025 Flora Home. Доверительное управление недвижимостью в Сочи.</p>
            <a href="/privacy.pdf" className="mt-2 inline-block text-white/40 hover:text-white/70">
              Политика конфиденциальности
            </a>
          </div>
        </motion.div>
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-panel grid gap-5 p-8"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className="text-sm text-white/60">Имя</span>
              <input
                required
                type="text"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-primary focus:outline-none"
                value={formData.name}
                onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm text-white/60">Телефон</span>
              <input
                required
                type="tel"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-primary focus:outline-none"
                value={formData.phone}
                onChange={(event) => setFormData((prev) => ({ ...prev, phone: event.target.value }))}
              />
            </label>
          </div>
          <label className="flex flex-col gap-2">
            <span className="text-sm text-white/60">Email</span>
            <input
              type="email"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-primary focus:outline-none"
              value={formData.email}
              onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm text-white/60">Район или ЖК</span>
            <input
              required
              type="text"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-primary focus:outline-none"
              value={formData.district}
              onChange={(event) => setFormData((prev) => ({ ...prev, district: event.target.value }))}
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm text-white/60">Ссылка на объявление</span>
            <input
              type="url"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-primary focus:outline-none"
              value={formData.listing}
              onChange={(event) => setFormData((prev) => ({ ...prev, listing: event.target.value }))}
            />
          </label>
          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded-full bg-gradient-to-r from-primary to-emerald-500 px-6 py-3 text-base font-semibold text-slate-950 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === "loading" ? "Отправляем..." : "Получить прогноз за 24 часа"}
          </button>
          {status === "success" ? (
            <p className="rounded-2xl bg-emerald-500/10 p-4 text-sm text-emerald-200">
              Спасибо! Свяжемся в течение дня и отправим PDF-отчёт на указанные контакты.
            </p>
          ) : null}
          {status === "error" ? (
            <p className="rounded-2xl bg-red-500/10 p-4 text-sm text-red-200">
              Не удалось отправить заявку. Свяжитесь напрямую: hello@flora-home.ru.
            </p>
          ) : null}
        </motion.form>
      </div>
    </section>
  );
}
