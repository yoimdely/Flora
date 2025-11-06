import Image from "next/image";
import { motion } from "framer-motion";
import { CASE_STUDY } from "../lib/constants";

export function CaseStudy() {
  return (
    <section id="case" className="section-padding">
      <div className="container-tight grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="glass-panel overflow-hidden"
        >
          <div className="relative h-80 w-full md:h-full">
            <Image
              src={CASE_STUDY.image}
              alt={CASE_STUDY.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-3">
              <span className="text-sm uppercase tracking-[0.3em] text-emerald-200">Кейс</span>
              <h3 className="text-2xl font-semibold text-white">{CASE_STUDY.title}</h3>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col gap-6"
        >
          <h2 className="section-title">Как мы увеличили доход</h2>
          <p className="section-subtitle text-white/70">{CASE_STUDY.description}</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="glass-panel p-5">
              <span className="text-xs uppercase tracking-[0.3em] text-white/50">Низкий сезон</span>
              <p className="mt-2 text-2xl font-semibold text-white">{CASE_STUDY.lowSeasonIncome}</p>
            </div>
            <div className="glass-panel p-5">
              <span className="text-xs uppercase tracking-[0.3em] text-white/50">Высокий сезон</span>
              <p className="mt-2 text-2xl font-semibold text-white">{CASE_STUDY.highSeasonIncome}</p>
            </div>
            <div className="glass-panel p-5">
              <span className="text-xs uppercase tracking-[0.3em] text-white/50">Заполняемость</span>
              <p className="mt-2 text-2xl font-semibold text-white">{CASE_STUDY.occupancy}</p>
            </div>
            <div className="glass-panel p-5">
              <span className="text-xs uppercase tracking-[0.3em] text-white/50">ROI улучшений</span>
              <p className="mt-2 text-2xl font-semibold text-white">{CASE_STUDY.roi}</p>
            </div>
          </div>
          <button className="w-fit rounded-full bg-gradient-to-r from-primary to-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-90">
            {CASE_STUDY.cta}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
