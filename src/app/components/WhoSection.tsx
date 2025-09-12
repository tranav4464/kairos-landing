"use client";
import { motion } from "framer-motion";
import Section from "./Section";

export default function WhoSection() {
  return (
    <Section id="philosophy" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="font-serif text-3xl md:text-4xl text-center">Who is Kairos for?</h2>
        <div className="mt-10 grid md:grid-cols-3 gap-6 md:gap-8">
          {[{
            role: "Students",
            text: "Master your deadlines and eliminate procrastination.",
          }, {
            role: "Professionals",
            text: "Protect your deep work and command your schedule.",
          }, {
            role: "Creators",
            text: "Structure your creativity and turn ideas into output.",
          }].map((item, idx) => (
            <motion.div
              key={item.role}
              className="rounded-xl border border-white/10 p-6 bg-white/[.03] hover:bg-white/[.06] transition-colors"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
            >
              <div className="text-sm uppercase tracking-wide text-white/70">{item.role}</div>
              <div className="mt-2 text-base md:text-lg">{item.text}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}


