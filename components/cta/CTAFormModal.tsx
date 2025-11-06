"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { motion } from "framer-motion";

const initialState = {
  name: "",
  phone: "",
  email: "",
  district: "",
  link: "",
  format: "",
  property: ""
};

type CTAFormModalProps = {
  open: boolean;
  onClose: () => void;
};

export function CTAFormModal({ open, onClose }: CTAFormModalProps) {
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
        throw new Error("Не удалось отправить форму");
      }

      setStatus("success");
      setFormData(initialState);
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <Transition show={open} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center px-4 py-10">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 translate-y-4"
              enterTo="opacity-100 translate-y-0"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-4"
            >
              <Dialog.Panel className="w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-2xl">
                <Dialog.Title className="text-2xl font-semibold text-white">
                  Получите прогноз дохода за 24 часа
                </Dialog.Title>
                <Dialog.Description className="mt-2 text-white/60">
                  Оставьте контакты — пришлём расчёт в WhatsApp или на email, а также чек-лист подготовки объекта.
                </Dialog.Description>

                <motion.form
                  className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <label className="flex flex-col gap-2">
                    <span className="text-sm text-white/70">Имя</span>
                    <input
                      required
                      type="text"
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-primary focus:outline-none"
                      value={formData.name}
                      onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-sm text-white/70">Телефон</span>
                    <input
                      required
                      type="tel"
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-primary focus:outline-none"
                      value={formData.phone}
                      onChange={(event) => setFormData((prev) => ({ ...prev, phone: event.target.value }))}
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-sm text-white/70">Email</span>
                    <input
                      type="email"
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-primary focus:outline-none"
                      value={formData.email}
                      onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-sm text-white/70">Район или ЖК</span>
                    <input
                      required
                      type="text"
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-primary focus:outline-none"
                      value={formData.district}
                      onChange={(event) => setFormData((prev) => ({ ...prev, district: event.target.value }))}
                    />
                  </label>
                  <label className="flex flex-col gap-2 md:col-span-2">
                    <span className="text-sm text-white/70">Ссылка на объявление или фото</span>
                    <input
                      type="url"
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-primary focus:outline-none"
                      value={formData.link}
                      onChange={(event) => setFormData((prev) => ({ ...prev, link: event.target.value }))}
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-sm text-white/70">Формат сдачи</span>
                    <input
                      type="text"
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-primary focus:outline-none"
                      value={formData.format}
                      onChange={(event) => setFormData((prev) => ({ ...prev, format: event.target.value }))}
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-sm text-white/70">Тип жилья</span>
                    <input
                      type="text"
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-primary focus:outline-none"
                      value={formData.property}
                      onChange={(event) => setFormData((prev) => ({ ...prev, property: event.target.value }))}
                    />
                  </label>
                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full rounded-full bg-gradient-to-r from-primary to-emerald-500 px-6 py-3 text-base font-semibold text-slate-950 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {status === "loading" ? "Отправляем..." : "Получить расчёт"}
                    </button>
                  </div>
                </motion.form>

                {status === "success" ? (
                  <p className="mt-4 rounded-2xl bg-emerald-500/10 p-4 text-sm text-emerald-300">
                    Спасибо! Мы отправим расчёт в течение 24 часов и свяжемся с вами для уточнения деталей.
                  </p>
                ) : null}

                {status === "error" ? (
                  <p className="mt-4 rounded-2xl bg-red-500/10 p-4 text-sm text-red-300">
                    Что-то пошло не так. Попробуйте снова или напишите в Telegram @florahome.
                  </p>
                ) : null}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
