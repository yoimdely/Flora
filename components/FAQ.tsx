"use client";

import { Disclosure } from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { FAQ_ITEMS } from "../lib/constants";

export function FAQ() {
  return (
    <section id="faq" className="section-padding">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4"
        >
          <h2 className="section-title">Частые вопросы</h2>
          <p className="section-subtitle">Ответы на ключевые вопросы про комиссию, безопасность и отчётность.</p>
        </motion.div>

        <div className="mt-10 space-y-4">
          {FAQ_ITEMS.map((item, index) => (
            <Disclosure key={item.question}>
              {({ open }) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-120px" }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="glass-panel"
                >
                  <Disclosure.Button className="flex w-full items-center justify-between px-6 py-5 text-left">
                    <span className="text-lg font-medium text-white">{item.question}</span>
                    {open ? (
                      <MinusSmallIcon className="h-6 w-6 text-emerald-300" />
                    ) : (
                      <PlusSmallIcon className="h-6 w-6 text-white/50" />
                    )}
                  </Disclosure.Button>
                  <Disclosure.Panel className="border-t border-white/10 px-6 py-4 text-white/70">
                    {item.answer}
                  </Disclosure.Panel>
                </motion.div>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </section>
  );
}
