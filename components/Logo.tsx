import { motion } from "framer-motion";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`flex items-center gap-2 ${className}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-emerald-600/80 shadow-lg">
        <div className="absolute inset-1 rounded-full bg-white/10 backdrop-blur-md" />
        <svg
          className="relative h-6 w-6 text-white"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 21c-4.97-3.5-7-6.5-7-9.5C5 7.91 8.13 4 12 4s7 3.91 7 7.5c0 3-2.03 6-7 9.5Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M12 8v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M9 11h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </div>
      <div className="flex flex-col text-left">
        <span className="text-lg font-semibold tracking-tight">Flora Home</span>
        <span className="text-xs uppercase tracking-[0.3em] text-white/60">Property Management</span>
      </div>
    </motion.div>
  );
}
