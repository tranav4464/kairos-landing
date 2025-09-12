"use client";
import Section from "./Section";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function useCountdown(deadlineIso: string) {
  const deadline = useMemo(() => new Date(deadlineIso).getTime(), [deadlineIso]);
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const ms = Math.max(0, deadline - now);
  const s = Math.floor(ms / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return { d, h, m, sec };
}

export default function OfferScarcitySection() {
  // Avoid SSR/client time drift by only showing countdown after mount
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const { d, h, m, sec } = useCountdown(new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString());
  // Sync with API, but never show a number below the configured floor to avoid looking empty for early users
  const DISPLAY_FLOOR = 500;
  const [apiCount, setApiCount] = useState<number | null>(null);
  const [limit, setLimit] = useState<number>(1500);
  const claimed = Math.max(DISPLAY_FLOOR, apiCount ?? DISPLAY_FLOOR);
  const total = limit;
  const pct = Math.min(100, Math.round((claimed / total) * 100));

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const res = await fetch("/api/waitlist-count", { cache: "no-store" });
        const data = await res.json();
        if (!isMounted) return;
        setApiCount(typeof data?.count === "number" ? data.count : null);
        setLimit(typeof data?.limit === "number" ? data.limit : 1500);
      } catch {}
    };
    load();
    const id = setInterval(load, 60_000);
    return () => { isMounted = false; clearInterval(id); };
  }, []);

  // Social proof ticker - render deterministically on server, randomize only after mount
  const [ticker, setTicker] = useState(0);
  const baseNames = useMemo(
    () => [
      "Mike","Sara","Dev","Yuki","Ava","Liam","Noah","Mia","Ethan","Zoe",
      "Olivia","Lucas","Emma","Jack","Nora","Amelia","Henry","Leah","Ivy","Mason",
      "Ella","Aiden","Chloe","Leo","Ruby"
    ],
    []
  );
  const [names, setNames] = useState<string[]>(baseNames);
  useEffect(() => {
    // Shuffle only on the client to keep SSR stable
    const arr = baseNames.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setNames(arr);
  }, [baseNames]);
  useEffect(() => {
    const id = setInterval(() => setTicker((t) => (t + 1) % names.length), 60000);
    return () => clearInterval(id);
  }, [names.length]);
  const weeklyMeetings = 12847;

  return (
    <Section id="offer" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="font-serif text-3xl md:text-4xl text-center">Become a Founding Member. The Offer Ends Soon.</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-8 items-center">
          <div className="rounded-2xl border border-white/10 p-6 bg-black card-glow">
            <h3 className="text-xl">First 1,500 users get Lifetime Pro Access</h3>
            <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-[#ffdd00] to-[#00e5ff] progress-shimmer"
                style={{ width: pct + "%" }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ type: "spring", stiffness: 120, damping: 18 }}
              />
            </div>
            <div className="mt-2 text-sm text-white/70">{claimed} / {total} spots claimed</div>
            <div className="mt-4 text-sm">Offer ends in: <span className="font-mono">{mounted ? `${d}d ${h}h ${m}m ${sec}s` : "--d --h --m --s"}</span></div>
          </div>
          <div className="rounded-2xl border border-white/10 p-6 bg-black card-glow">
            <h3 className="text-xl">Social Proof</h3>
            <div className="mt-3 text-white/80 text-sm h-5 overflow-hidden">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={ticker}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  {names[ticker % names.length] ?? baseNames[0]} just joined
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="mt-4 text-sm text-white/70">Welcome aboard</div>
          </div>
        </div>
      </div>
    </Section>
  );
}


