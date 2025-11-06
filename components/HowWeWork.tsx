import { motion } from "framer-motion";
import { TIMELINE } from "../lib/constants";

export function HowWeWork() {
  return (
    <section id="process" className="section-padding">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4"
        >
          <h2 className="section-title">Как мы работаем</h2>
          <p className="section-subtitle">
            Настраиваем доверительное управление с прозрачными KPI. Каждый шаг — оцифрован и подкреплён SLA в договоре.
          </p>
        </motion.div>
        <div className="mt-12 grid gap-6 md:grid-cols-5">
          {TIMELINE.map((step, index) => (
            <motion.div
              key={step.title}
              className="glass-panel flex flex-col gap-4 p-6"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <span className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">{step.step}</span>
              <h3 className="text-xl font-semibold text-white">{step.title}</h3>
              <p className="text-white/60">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
