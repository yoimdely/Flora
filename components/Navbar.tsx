"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";

const links = [
  { href: "#benefits", label: "Почему мы" },
  { href: "#calculator", label: "Калькулятор" },
  { href: "#process", label: "Как работаем" },
  { href: "#case", label: "Кейсы" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Контакты" }
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/70 border-b border-white/5"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container-tight flex items-center justify-between py-4">
        <Link href="#hero" onClick={() => setOpen(false)} aria-label="Flora Home">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-10 text-sm md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white/70 transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#contact"
            className="rounded-full bg-white/10 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
          >
            Получить прогноз
          </Link>
        </nav>
        <button
          className="relative z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Открыть меню"
        >
          <span className="sr-only">Открыть меню</span>
          <motion.div
            initial={false}
            animate={{ rotate: open ? 45 : 0 }}
            className="h-5 w-5"
          >
            <span className="absolute left-1.5 right-1.5 top-3 h-[2px] bg-white" />
            <span className="absolute left-1.5 right-1.5 top-4 h-[2px] bg-white" />
            <span className="absolute left-1.5 right-1.5 top-5 h-[2px] bg-white" />
          </motion.div>
        </button>
      </div>
      <AnimatePresence>
        {open ? (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container-tight pb-6">
              <div className="glass-panel flex flex-col gap-4 p-6">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-lg text-white/80 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-gradient-to-r from-primary to-emerald-500 px-6 py-3 text-center text-base font-semibold text-slate-950"
                >
                  Получить прогноз
                </Link>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
