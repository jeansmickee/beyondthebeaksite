"use client";

import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const fd = new FormData(e.currentTarget);

    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      message: String(fd.get("message") || ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("sent");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-14">
      <h1 className="font-serif text-4xl">Request a proposal</h1>
      <p className="mt-3 max-w-2xl opacity-80">
        Tell us your preferred dates, interests and pace — we’ll reply with a tailored itinerary and quote.
      </p>

      <form onSubmit={onSubmit} className="mt-10 max-w-xl space-y-4">
        <input
          name="name"
          placeholder="Your name"
          required
          className="w-full rounded-2xl border border-black/15 bg-white/40 px-4 py-3 outline-none focus:ring-2 focus:ring-black/10"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full rounded-2xl border border-black/15 bg-white/40 px-4 py-3 outline-none focus:ring-2 focus:ring-black/10"
        />
        <textarea
          name="message"
          placeholder="Dates, group size, interests (birds / nature / photo), and preferred pace…"
          required
          rows={7}
          className="w-full rounded-2xl border border-black/15 bg-white/40 px-4 py-3 outline-none focus:ring-2 focus:ring-black/10"
        />

        <button
          disabled={status === "sending"}
          className="rounded-full bg-[#3f4f36] px-7 py-3.5 text-white text-sm tracking-wide hover:opacity-90 transition shadow-sm disabled:opacity-60"
        >
          {status === "sending" ? "Sending..." : "Send request"}
        </button>

        {status === "sent" && (
          <p className="text-sm opacity-80">Thank you — we’ll get back to you soon.</p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-700">Something went wrong. Please try again.</p>
        )}
      </form>
    </main>
  );
}