import { motion } from "framer-motion";
import { BENEFITS } from "../lib/constants";
import {
  ChartBarIcon,
  KeyIcon,
  DocumentChartBarIcon,
  ClockIcon,
  HandshakeIcon,
  ShieldCheckIcon,
  SparklesIcon,
  CurrencyDollarIcon
} from "@heroicons/react/24/outline";

const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  chart: ChartBarIcon,
  key: KeyIcon,
  report: DocumentChartBarIcon,
  clock: ClockIcon,
  handshake: HandshakeIcon,
  shield: ShieldCheckIcon,
  sparkles: SparklesIcon,
  guarantee: CurrencyDollarIcon
};

export function Benefits() {
  return (
    <section id="benefits" className="section-padding">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4"
        >
          <h2 className="section-title">Почему Flora Home</h2>
          <p className="section-subtitle">
            Всё под ключ. Прозрачно. Без рисков. Команда, технологии и сервис премиального уровня для удалённых собственников.
          </p>
        </motion.div>
        <motion.div
          className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08
              }
            }
          }}
        >
          {BENEFITS.map((benefit) => {
            const Icon = iconMap[benefit.icon] ?? SparklesIcon;
            return (
              <motion.div
                key={benefit.title}
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                className="glass-panel flex flex-col gap-4 p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-white">{benefit.title}</h3>
                <p className="text-white/60">{benefit.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
