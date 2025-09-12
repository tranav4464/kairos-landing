"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [isSolid, setIsSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsSolid(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // basic scrollspy
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const sectionIds = ["hero", "problem", "solution", "future-focus", "offer", "final-cta"];
    const observers: IntersectionObserver[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(id);
          });
        },
        { rootMargin: "-40% 0px -50% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        isSolid ? "bg-black/80 backdrop-blur supports-[backdrop-filter]:bg-black/60" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-center relative">
        <Link href="#" className="absolute left-4 md:left-6 flex items-center gap-2 text-sm font-semibold tracking-wide">
          <span className="inline-block h-3 w-3 rounded-full bg-gradient-to-r from-[#6a00ff] to-[#00e5ff]" />
          <span>Kairos</span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm">
          <a href="#problem" className={`hover:opacity-80 ${active === "problem" ? "text-cyan-300" : ""}`} aria-current={active === "problem" ? "page" : undefined}>Problem</a>
          <a href="#solution" className={`hover:opacity-80 ${active === "solution" ? "text-cyan-300" : ""}`} aria-current={active === "solution" ? "page" : undefined}>Solution</a>
          <a href="#future-focus" className={`hover:opacity-80 ${active === "future-focus" ? "text-cyan-300" : ""}`} aria-current={active === "future-focus" ? "page" : undefined}>Preview</a>
          <a href="#offer" className={`hover:opacity-80 ${active === "offer" ? "text-cyan-300" : ""}`} aria-current={active === "offer" ? "page" : undefined}>Offer</a>
          <a href="#final-cta" className={`hover:opacity-80 ${active === "final-cta" ? "text-cyan-300" : ""}`} aria-current={active === "final-cta" ? "page" : undefined}>Join</a>
        </div>
      </nav>
    </header>
  );
}


