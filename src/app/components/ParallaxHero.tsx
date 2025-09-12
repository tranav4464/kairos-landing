"use client";
import Image from "next/image";
import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SplineEmbed from "./SplineEmbed";

export default function ParallaxHero() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 400], [0, 80]);
  const doorY = useTransform(scrollY, [0, 400], [0, -20]);
  const titleY = useTransform(scrollY, [0, 400], [0, -40]);
  const [count, setCount] = React.useState<number | null>(null);

  React.useEffect(() => {
    async function loadCount() {
      try {
        const res = await fetch("/api/waitlist-count", { cache: "no-store" });
        const data = await res.json();
        setCount(data?.count ?? null);
      } catch {}
    }
    loadCount();
    const id = setInterval(loadCount, 15000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative h-[90svh] min-h-[640px] overflow-hidden">
      {/* Spline Embed as background, full width */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10">
        <SplineEmbed />
      </motion.div>

      {/* Right-side Kairos wordmark */}
      <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 text-white/80 pointer-events-none select-none">
        <span className="font-serif font-semibold tracking-wide text-5xl md:text-7xl underline decoration-[#00e5ff] decoration-2 underline-offset-8">Kairos</span>
      </div>

      {/* Content positioned to avoid Spline overlap */}
      <div className="absolute inset-0 z-10 flex flex-col items-start justify-center text-left px-8 md:px-12 lg:px-20">
        <div className="max-w-2xl">
          <motion.h1
            style={{ y: titleY }}
            className="text-5xl md:text-7xl font-serif font-semibold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-[#c2c7cc] via-[#66d0ff] to-[#009dff]"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            Clarity. Focus. Impact.
          </motion.h1>
          <motion.p
            className="mt-6 text-lg md:text-xl text-white/90 max-w-xl"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            Stop letting distractions derail your goals. Kairos is your proactive partner in productivity.
          </motion.p>
          {count !== null && (
            <motion.p
              className="mt-4 text-sm text-white/70"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            >
              Join {count.toLocaleString()} others on the waitlist
            </motion.p>
          )}
          <div className="flex items-center gap-4 mt-8">
            <motion.a
              href="#final-cta"
              className="btn-glow"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
            >
              Join Now
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}


