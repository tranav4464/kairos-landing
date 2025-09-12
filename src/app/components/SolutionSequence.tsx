"use client";
import Section from "./Section";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const PANELS = [
  {
    key: "assurance",
    headline: "Commitment Assurance",
    copy: "Proactive, escalating notifications keep you on time and on track for critical commitments.",
    benefit: "Operational confidence—no missed deadlines or meetings.",
  },
  {
    key: "focus-control",
    headline: "Focus Control",
    copy: "Policy‑based focus sessions block distracting apps and sites during protected work windows.",
    benefit: "Sustained concentration and fewer context switches.",
  },
  {
    key: "execution-planner",
    headline: "Execution Planner",
    copy: "Converts goals into realistic plans, allocates time, and nudges progress with data‑driven guidance.",
    benefit: "Predictable output without relying on willpower.",
  },
];

export default function SolutionSequence() {
  // Outer scroll container (tall) to keep page scrolling; inner sticky centers content
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  // Timeline with holds to let the user read
  // Guardian: 0.00→0.15 zoom in, hold 0.15→0.30, fade out 0.30→0.40
  const gScale = useTransform(scrollYProgress, [0.0, 0.15, 0.30], [0.9, 1.0, 1.0]);
  const gOpacity = useTransform(scrollYProgress, [0.0, 0.15, 0.30, 0.40], [0, 1, 1, 0]);

  // Shield (panel 2): slow enter from LEFT, quick exit to RIGHT
  // Enter slow: 0.40→0.62 from -140→0. Hold: 0.62→0.70. Exit fast: 0.70→0.76 from 0→+160
  const sX = useTransform(scrollYProgress, [0.40, 0.62, 0.70, 0.76], [-140, 0, 0, 160]);
  const sOpacity = useTransform(scrollYProgress, [0.40, 0.55, 0.62, 0.70, 0.76], [0, 0.85, 1, 1, 0]);

  // Coach (panel 3): slow enter from RIGHT, quick exit to LEFT
  // Enter slow: 0.76→0.90 from +160→0. Hold: 0.90→0.96. Exit fast: 0.96→1.00 from 0→-160
  const cX = useTransform(scrollYProgress, [0.76, 0.90, 0.96, 1.00], [160, 0, 0, -160]);
  const cOpacity = useTransform(scrollYProgress, [0.76, 0.88, 0.90, 0.96, 1.00], [0, 0.9, 1, 1, 0]);

  return (
    <Section id="solution" className="py-24 relative">
      {/* ambient lighting backdrop */}
      <div className="solution-ambient absolute inset-0 -z-10 opacity-60" />
      {/* Tall container to preserve page scroll; sticky viewport panel inside */}
      <div ref={containerRef} className="relative h-[200vh]">
        <div className="sticky top-0 h-[100svh] flex items-start pt-[8vh]">
          <div className="mx-auto max-w-6xl px-4 w-full">
            {/* Sticky heading that scrolls together with cards */}
            <motion.div
              style={{ opacity: useTransform(scrollYProgress, [0.0, 0.05, 0.95, 1.0], [0, 1, 1, 0]) }}
              className="text-center mb-2"
            >
              <h2 className="font-serif text-2xl md:text-3xl">
                Kairos, your smart <span className="line-through decoration-red-400/70">calendar</span> assistant
              </h2>
              <div className="mx-auto mt-3 h-px w-40 bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent opacity-70" />
              <p className="mt-2 text-white/60 text-sm">One outcome: reliable execution. Scroll to preview.</p>
            </motion.div>
            <div className="relative min-h-[420px] md:min-h-[480px]">
          {/* Guardian zoom in then out */}
              <motion.article
                style={{ scale: gScale, opacity: gOpacity, '--glow': 0 } as any}
                className="absolute left-1/2 -translate-x-1/2 rounded-2xl border border-white/10 p-5 md:p-6 bg-black card-glow w-full max-w-3xl"
                onMouseMove={(e) => {
                  const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
                  const px = ((e.clientX - r.left) / r.width) * 100;
                  const py = ((e.clientY - r.top) / r.height) * 100;
                  (e.currentTarget as HTMLDivElement).style.setProperty('--mx', px + '%');
                  (e.currentTarget as HTMLDivElement).style.setProperty('--my', py + '%');
                }}
              >
            <h3 className="font-serif text-2xl md:text-3xl">{PANELS[0].headline}</h3>
            <p className="mt-3 text-white/80">{PANELS[0].copy}</p>
            <p className="mt-3">{PANELS[0].benefit}</p>
              </motion.article>

          {/* Shield in from right, out to left */}
              <motion.article
                style={{ x: sX, opacity: sOpacity, '--glow': 0 } as any}
                className="absolute left-1/2 -translate-x-1/2 rounded-2xl border border-white/10 p-5 md:p-6 bg-black card-glow w-full max-w-3xl"
                onMouseMove={(e) => {
                  const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
                  const px = ((e.clientX - r.left) / r.width) * 100;
                  const py = ((e.clientY - r.top) / r.height) * 100;
                  (e.currentTarget as HTMLDivElement).style.setProperty('--mx', px + '%');
                  (e.currentTarget as HTMLDivElement).style.setProperty('--my', py + '%');
                }}
              >
            <h3 className="font-serif text-2xl md:text-3xl">{PANELS[1].headline}</h3>
            <p className="mt-3 text-white/80">{PANELS[1].copy}</p>
            <p className="mt-3">{PANELS[1].benefit}</p>
              </motion.article>

          {/* Coach in from left, out to right */}
              <motion.article
                style={{ x: cX, opacity: cOpacity, '--glow': 0 } as any}
                className="absolute left-1/2 -translate-x-1/2 rounded-2xl border border-white/10 p-5 md:p-6 bg-black card-glow w-full max-w-3xl"
                onMouseMove={(e) => {
                  const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
                  const px = ((e.clientX - r.left) / r.width) * 100;
                  const py = ((e.clientY - r.top) / r.height) * 100;
                  (e.currentTarget as HTMLDivElement).style.setProperty('--mx', px + '%');
                  (e.currentTarget as HTMLDivElement).style.setProperty('--my', py + '%');
                }}
              >
            <h3 className="font-serif text-2xl md:text-3xl">{PANELS[2].headline}</h3>
            <p className="mt-3 text-white/80">{PANELS[2].copy}</p>
            <p className="mt-3">{PANELS[2].benefit}</p>
              </motion.article>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}


