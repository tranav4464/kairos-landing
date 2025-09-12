"use client";
import Section from "./Section";
import { motion } from "framer-motion";

const items = [
  { title: "Missed Deadlines", text: "Ineffective notifications lead to missed opportunities." },
  { title: "Broken Focus", text: "Digital distractions constantly derail your most important work." },
  { title: "Failed Goals", text: "Your schedule shows the plan, but doesn't help you execute it." },
];

export default function ProblemSection() {
  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = e.currentTarget as HTMLDivElement;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (py - 0.5) * -6; // tilt up/down
    const ry = (px - 0.5) * 6;  // tilt left/right
    card.style.setProperty("--rx", `${rx}deg`);
    card.style.setProperty("--ry", `${ry}deg`);
    card.style.setProperty("--mx", `${px * 100}%`);
    card.style.setProperty("--my", `${py * 100}%`);
  }

  function onMouseLeave(e: React.MouseEvent<HTMLDivElement>) {
    const card = e.currentTarget as HTMLDivElement;
    card.style.setProperty("--rx", `0deg`);
    card.style.setProperty("--ry", `0deg`);
  }

  return (
    <Section id="problem" className="py-16 md:py-24 relative">
      <div className="absolute inset-0 -z-10 opacity-40 pointer-events-none problem-bg" />
      <div className="mx-auto max-w-6xl px-4">
        <motion.h2
          className="font-serif text-3xl md:text-4xl text-center"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          A Passive Calendar Can't Solve an Active Problem.
        </motion.h2>
        <motion.div
          className="mt-10 grid md:grid-cols-3 gap-6 md:gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px" }}
          variants={{
            show: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {items.map((item) => (
            <motion.div
              key={item.title}
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              className="group rounded-2xl border border-white/10 p-6 bg-black transition-transform will-change-transform card-glow"
              style={{
                transform: "perspective(700px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
              }}
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseLeave}
            >
              <div className="text-sm uppercase tracking-wide text-white/70">
                {item.title}
                <span className="block h-px w-0 bg-gradient-to-r from-[#6a00ff] to-[#00e5ff] transition-all duration-300 group-hover:w-full group-focus-within:w-full" />
              </div>
              <div className="mt-2 text-base md:text-lg">
                {item.text}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}


