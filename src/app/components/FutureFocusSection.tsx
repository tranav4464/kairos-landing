"use client";
import Section from "./Section";
import { motion, useScroll, useTransform, MotionValue, useSpring, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

type Card = {
  key: string;
  headline: string;
  sub: string;
  desc: string;
};

const CARDS: Card[] = [
  {
    key: "focus-control",
    headline: "Focus Control: Structured Concentration",
    sub: "Reclaim time from digital distractions with policy‑based sessions.",
    desc:
      "Start a focus session to automatically enforce rules—block chosen apps and sites and protect your attention for deep work.",
  },
  {
    key: "smart-scheduling",
    headline: "Smart Scheduling: Natural Input, Precise Output",
    sub: "Create events with natural language or voice—accurate parsing, zero admin.",
    desc:
      "Describe the meeting once. Kairos extracts title, time, attendees, and location, then adds it to your calendar without the busywork.",
  },
  {
    key: "execution-planner",
    headline: "Execution Planner: From Goals to Deliverables",
    sub: "Translate intent into a realistic plan with nudges that sustain momentum.",
    desc:
      "Define the objective; Kairos allocates time, sequences tasks, and keeps progress on track with timely prompts.",
  },
  {
    key: "commitment-assurance",
    headline: "Commitment Assurance: Never Miss What Matters",
    sub: "Proactive, escalating alerts prevent misses and delays.",
    desc:
      "If you risk being late, Kairos escalates—nudge, full‑screen alert, even notify attendees—so obligations are reliably met.",
  },
];

export default function FutureFocusSection() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  // Drive progress relative to viewport so the active card aligns with the center of screen
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 24, mass: 0.8 });
  const lineScaleX = useTransform(smooth, [0, 1], [0, 1]);
  const [active, setActive] = useState(0);
  useMotionValueEvent(smooth, "change", (v) => {
    const step = Math.max(0, Math.min(3, Math.floor(v * 4)));
    setActive(step);
  });
  const dot1 = useTransform(smooth, [0.00, 0.25], [0, 1]);
  const dot2 = useTransform(smooth, [0.25, 0.50], [0, 1]);
  const dot3 = useTransform(smooth, [0.50, 0.75], [0, 1]);
  const dot4 = useTransform(smooth, [0.75, 1.00], [0, 1]);

  function AnimatedCard({ card, idx, progress }: { card: Card; idx: number; progress: MotionValue<number> }) {
    // Longer readable windows per card
    const step = 0.24; // total span per card
    const base = 0.04 + idx * step; // start
    const enterEnd = base + 0.12;   // slow enter
    const holdEnd = enterEnd + 0.18; // long hold
    const exitEnd = holdEnd + 0.12;  // clear exit
    const dir = idx % 2 === 0 ? -100 : 100;

    const x = useTransform(progress, [base, enterEnd, holdEnd, exitEnd], [dir, 0, 0, -dir]);
    const opacity = useTransform(progress, [base, enterEnd, holdEnd, exitEnd], [0, 1, 1, 0]);
    const scale = useTransform(progress, [base, enterEnd], [0.98, 1]);

    return (
      <motion.article
        style={{ x, opacity, scale } as any}
        className="rounded-2xl border border-white/10 p-6 md:p-8 will-change-transform bg-black card-glow"
        onMouseMove={(e) => {
          const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
          const px = ((e.clientX - r.left) / r.width) * 100;
          const py = ((e.clientY - r.top) / r.height) * 100;
          (e.currentTarget as HTMLDivElement).style.setProperty('--mx', px + '%');
          (e.currentTarget as HTMLDivElement).style.setProperty('--my', py + '%');
        }}
      >
        <h3 className="font-serif text-xl md:text-2xl">{card.headline}</h3>
        <p className="mt-2 text-sm md:text-base text-white/80">{card.sub}</p>
        <p className="mt-4 text-sm md:text-base">{card.desc}</p>
      </motion.article>
    );
  }

  return (
    <Section id="future-focus" className="py-16 md:py-24 relative">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="font-serif text-3xl md:text-4xl text-center">A Glimpse Into Your Future Focus</h2>
        {/* Unified sticky stage: timeline + active card together */}
        <div ref={trackRef} className="relative h-[320vh] mt-6">
          <div className="sticky top-[14vh] h-[70vh]">
            {/* Timeline */}
            <div className="px-2">
              <div className="relative h-2 bg-black rounded-full overflow-hidden border border-white/10">
                <motion.div style={{ scaleX: lineScaleX }} className="origin-left absolute inset-y-0 left-0 bg-gradient-to-r from-[#6a00ff] to-[#00e5ff]" />
              </div>
              <div className="mt-4 grid grid-cols-4 gap-4">
                {[dot1, dot2, dot3, dot4].map((d, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <motion.div style={{ opacity: d, scale: d }} className={`h-3 w-3 rounded-full ${active === i ? "bg-cyan-300" : "bg-white/40"}`} />
                    <div className={`text-xs ${active === i ? "text-cyan-300" : "text-white/50"}`}>{i + 1}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Card stage directly under timeline */}
            <div className="mt-6 flex items-center justify-center">
              <div className="relative w-full max-w-3xl">
                <AnimatePresence mode="wait">
                  <motion.div key={active} className="absolute inset-0">
                    <AnimatedCard card={CARDS[active]} idx={active} progress={smooth} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}


