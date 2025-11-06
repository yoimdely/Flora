import { motion } from "framer-motion";
import { PARTNER_OFFER } from "../lib/constants";

export function Partners() {
  return (
    <section id="partners" className="section-padding">
      <div className="container-tight grid gap-10 md:grid-cols-2 md:items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">{PARTNER_OFFER.title}</h2>
          <p className="section-subtitle">{PARTNER_OFFER.description}</p>
          <button className="mt-8 rounded-full bg-gradient-to-r from-primary to-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-90">
            {PARTNER_OFFER.cta}
          </button>
        </motion.div>
        <motion.div
          className="glass-panel p-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <ul className="space-y-4 text-white/70">
            <li>• Личные менеджеры для ваших клиентов</li>
            <li>• Совместные презентации и аналитика по объектам</li>
            <li>• Прозрачные выплаты в день заселения первого гостя</li>
            <li>• Бонусы за повторные рекомендации</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
