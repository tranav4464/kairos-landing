"use client";
import Section from "./Section";
import { useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const TABS = [
  {
    key: "guardian",
    title: "Guardian",
    headline: "The Guardian System",
    copy: "Prevents missed meetings and guards your commitments with proactive, escalating alerts.",
    benefit: "Feel the confidence of knowing you'll never miss a critical deadline again.",
  },
  {
    key: "shield",
    title: "Shield",
    headline: "The Shield System",
    copy: "Blocks distractions and preserves deep work with automatic Focus Modes when it matters most.",
    benefit: "Reclaim uninterrupted hours and finish what you start.",
  },
  {
    key: "coach",
    title: "Coach",
    headline: "The Coach System",
    copy: "Builds realistic plans and nudges you toward consistency with data-driven guidance.",
    benefit: "Turn intentions into habits without relying on willpower alone.",
  },
];

export default function SolutionTabs() {
  const [active, setActive] = useState("guardian");
  const tab = TABS.find((t) => t.key === active)!;

  // Scroll sequencing
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: "-20% 0px -20% 0px" });
  const sequence = useMemo(() => (
    active === "guardian" ? { enter: { scale: 0.96, opacity: 0 }, show: { scale: 1, opacity: 1 } } :
    active === "shield" ? { enter: { x: 80, opacity: 0 }, show: { x: 0, opacity: 1 } } :
    { enter: { x: -80, opacity: 0 }, show: { x: 0, opacity: 1 } }
  ), [active]);

  return (
    <Section id="solution" className="py-16 md:py-24">
      <div ref={ref} className="mx-auto max-w-6xl px-4">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={`px-4 py-2 rounded-full text-sm border ${active === t.key ? "border-cyan-300 text-cyan-300" : "border-white/20 hover:border-white/40"}`}
              aria-pressed={active === t.key}
            >
              {t.title}
            </button>
          ))}
        </div>
        <motion.div
          key={tab.key}
          initial={sequence.enter}
          animate={inView ? sequence.show : sequence.enter}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-8 rounded-2xl border border-white/10 p-6 md:p-8 bg-white/[.03] relative overflow-hidden"
          style={{ boxShadow: active ? "0 0 60px rgba(0,229,255,.06) inset" : undefined }}
        >
          <div className="pointer-events-none absolute inset-0 opacity-20 bg-[radial-gradient(50%_40%_at_70%_30%,rgba(0,229,255,.15),transparent_60%)]" />
          <h3 className="relative font-serif text-2xl md:text-3xl">{tab.headline}</h3>
          <p className="relative mt-3 text-white/80">{tab.copy}</p>
          <p className="relative mt-3">{tab.benefit}</p>
        </motion.div>
      </div>
    </Section>
  );
}


