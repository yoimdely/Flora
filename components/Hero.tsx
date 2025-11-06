"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { CTAFormModal } from "./cta/CTAFormModal";

export function Hero() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <video
          className="h-full w-full object-cover opacity-60"
          autoPlay
          playsInline
          muted
          loop
          poster="/images/hero/poster.jpg"
        >
          <source src="/videos/sochi.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-slate-950/70 mix-blend-multiply" />
        <div className="absolute inset-0 hero-gradient opacity-80" />
      </div>

      <div className="container-tight flex min-h-[90vh] flex-col justify-center gap-10 py-24">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-6 text-sm uppercase tracking-[0.4em] text-white/60">
            Flora Home — доверительное управление апартаментами и домами в Сочи, Адлере и Красной Поляне
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-white md:text-6xl">
            Сдадим вашу квартиру в Сочи за 5 дней — под ключ, без вашего участия
          </h1>
          <p className="mt-6 text-lg text-white/80 md:text-xl">
            Комиссия 30 %, но чистый доход выше за счёт динамического ценообразования и полной автоматизации.
          </p>
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row">
            <button
              onClick={() => setOpenModal(true)}
              className="group rounded-full bg-gradient-to-r from-primary to-emerald-500 px-8 py-4 text-base font-semibold text-slate-950 shadow-xl transition hover:opacity-90"
            >
              Получить прогноз дохода за 24 часа
            </button>
            <Link
              href="#process"
              className="rounded-full border border-white/20 px-8 py-4 text-base font-semibold text-white transition hover:bg-white/10"
            >
              Как мы работаем
            </Link>
          </div>
        </motion.div>
        <motion.div
          className="glass-panel flex flex-col gap-6 p-8 md:max-w-xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-white">Вы в Москве — ваша квартира в Сочи работает на вас.</h3>
          <p className="text-white/70">
            Ускоряем запуск, выводим листинги в топ Airbnb и Booking, подключаем Telegram-отчётность и гарантируем KPI в договоре.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-white/60">
            <span className="rounded-full border border-white/10 px-4 py-2">Первые брони за 5 дней</span>
            <span className="rounded-full border border-white/10 px-4 py-2">GA4 + Метрика</span>
            <span className="rounded-full border border-white/10 px-4 py-2">Премиальный клининг</span>
          </div>
        </motion.div>
      </div>
      <CTAFormModal open={openModal} onClose={() => setOpenModal(false)} />
    </section>
  );
}
