"use client";
import Section from "./Section";
import { useState } from "react";

export default function ProgressiveCTA() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [challenge, setChallenge] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    setLoading(true);
    setError(null);
    try {
      const payload: Record<string, unknown> = { email };
      if (challenge) payload.challenge = challenge;
      if (time) payload.time = time;
      if (name && name.trim().length > 0) payload.name = name.trim();
      if (role && role.trim().length > 0) payload.role = role.trim();

      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        let msg = "Failed to join";
        try { const j = await res.json(); msg = j?.error || msg; } catch {}
        throw new Error(msg);
      }
      setDone(true);
    } catch (e: any) {
      setError(e?.message || "Failed to join");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Section id="final-cta" className="py-16 md:py-24 border-t border-white/10">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="font-serif text-3xl md:text-4xl">Stop Failing. Start Achieving.</h2>
        {!done ? (
          <div className="mt-8">
            {step === 1 && (
              <div>
                <p className="text-white/80">What’s your biggest productivity challenge?</p>
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  {["Distractions", "Procrastination", "Overbooked", "Inconsistent"].map((c) => (
                    <button key={c} onClick={() => { setChallenge(c); setStep(2); }} className="btn-subtle">
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {step === 2 && (
              <div>
                <p className="text-white/80">When do you work best?</p>
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  {["Morning", "Afternoon", "Evening"].map((t) => (
                    <button key={t} onClick={() => { setTime(t); setStep(3); }} className="btn-subtle">
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {step === 3 && (
              <div>
                <p className="text-white/80">Tell us a bit about you.</p>
                <div className="mt-4 grid sm:grid-cols-2 gap-3">
                  <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Your name" className="w-full rounded-full bg-white/5 border border-white/10 px-5 py-3 outline-none focus:ring-2 focus:ring-cyan-300" />
                  <input value={role} onChange={(e) => setRole(e.target.value)} required placeholder="Role (Student, Engineer, Creator...)" className="w-full rounded-full bg-white/5 border border-white/10 px-5 py-3 outline-none focus:ring-2 focus:ring-cyan-300" />
                </div>
                <div className="mt-4 flex justify-center">
                  <button onClick={() => setStep(4)} className="btn-subtle">Continue</button>
                </div>
              </div>
            )}
            {step === 4 && (
              <div>
                <p className="text-white/80">Enter your email to get future updates and offers.</p>
                <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
                  <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="you@example.com" className="w-full sm:flex-1 rounded-full bg-white/5 border border-white/10 px-5 py-3 outline-none focus:ring-2 focus:ring-cyan-300" />
                  <button onClick={submit} disabled={loading || !email} className="btn-glow w-full sm:w-auto">{loading ? "Joining…" : "Join Now"}</button>
                </div>
                {error && <p className="mt-3 text-red-400 text-sm">{error}</p>}
              </div>
            )}
          </div>
        ) : (
          <p className="mt-6 text-white/80">Thanks! You're on the waitlist. We'll be in touch.</p>
        )}
      </div>
    </Section>
  );
}


