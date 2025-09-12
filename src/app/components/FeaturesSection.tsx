"use client";
import { motion } from "framer-motion";
import Section from "./Section";

export default function FeaturesSection() {
  return (
    <Section id="features" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              title: "The Guardian System",
              desc: "Prevents missed meetings and guards your commitments with proactive alerts.",
            },
            {
              title: "The Shield System",
              desc: "Blocks distractions and preserves deep work when it matters most.",
            },
            {
              title: "The Coach System",
              desc: "Helps you plan realistic goals and builds consistency with gentle nudges.",
            },
          ].map((card, idx) => (
            <motion.article
              key={card.title}
              className="rounded-2xl border border-white/10 p-6 md:p-8 bg-gradient-to-b from-white/5 to-transparent hover:translate-y-[-4px] transition-transform"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
            >
              <h3 className="font-serif text-2xl md:text-3xl">{card.title}</h3>
              <p className="mt-3 text-sm md:text-base text-white/80">{card.desc}</p>
              <div className="mt-6 flex items-center gap-4">
                <a href="#final-cta" className="btn-subtle">Join Waitlist</a>
              </div>
              <div className="mt-6 text-xs text-white/60">✅ Prevents Missed Meetings • ✅ Full-Screen Alerts</div>
            </motion.article>
          ))}
        </div>
      </div>
    </Section>
  );
}


