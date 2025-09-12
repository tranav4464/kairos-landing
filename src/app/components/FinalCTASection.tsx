"use client";
import { useState } from "react";

export default function FinalCTASection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to join");
      }
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="final-cta" className="py-16 md:py-24 border-t border-white/10">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="font-serif text-3xl md:text-4xl">Stop Failing. Start Achieving.</h2>
        {!submitted ? (
          <>
            <form onSubmit={onSubmit} className="mt-8 flex flex-col sm:flex-row items-center gap-3">
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full sm:flex-1 rounded-full bg-white/5 border border-white/10 px-5 py-3 outline-none focus:ring-2 focus:ring-cyan-300"
              />
              <button type="submit" className="btn-glow w-full sm:w-auto" disabled={loading}>
                {loading ? "Joining…" : "Join Now"}
              </button>
            </form>
            {error && <p className="mt-3 text-red-400 text-sm">{error}</p>}
          </>
        ) : (
          <p className="mt-6 text-white/80">Thanks! You're on the waitlist. We'll be in touch.</p>
        )}
      </div>
    </section>
  );
}


