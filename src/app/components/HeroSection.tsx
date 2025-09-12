"use client";
import { motion } from "framer-motion";
import Section from "./Section";

export default function HeroSection() {
  return (
    <Section id="hero" className="relative pt-28 md:pt-36 pb-20 md:pb-28">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(106,0,255,0.25),transparent_60%)]" />
      <div className="mx-auto max-w-5xl px-4 text-center">
        <motion.h1
          className="text-4xl md:text-6xl font-serif font-semibold tracking-tight"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          The First Calendar That Actively Prevents You From Failing.
        </motion.h1>
        <motion.p
          className="mt-6 text-base md:text-lg text-white/80 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
        >
          Stop letting distractions derail your goals. Kairos is your proactive partner in productivity.
        </motion.p>
        <motion.div
          className="mt-10 flex items-center justify-center gap-4"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          <a href="#final-cta" className="btn-glow">Join Waitlist</a>
        </motion.div>
      </div>
    </Section>
  );
}


