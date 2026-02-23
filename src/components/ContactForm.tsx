"use client";

import { useState } from "react";

type Copy = {
  title: string;
  intro: string;
  name: string;
  email: string;
  message: string;
  send: string;
  sending: string;
  sent: string;
  error: string;
};

export default function ContactForm({ copy }: { copy: Copy }) {
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
      // När Resend är kopplat kommer detta börja funka
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
    <form onSubmit={onSubmit} className="mt-10 max-w-xl space-y-4">
      <input
        name="name"
        placeholder={copy.name}
        required
        className="w-full rounded-2xl border border-black/15 bg-white/40 px-4 py-3 outline-none focus:ring-2 focus:ring-black/10"
      />
      <input
        name="email"
        type="email"
        placeholder={copy.email}
        required
        className="w-full rounded-2xl border border-black/15 bg-white/40 px-4 py-3 outline-none focus:ring-2 focus:ring-black/10"
      />
      <textarea
        name="message"
        placeholder={copy.message}
        required
        rows={7}
        className="w-full rounded-2xl border border-black/15 bg-white/40 px-4 py-3 outline-none focus:ring-2 focus:ring-black/10"
      />

      <button
        disabled={status === "sending"}
        className="rounded-full bg-[#3f4f36] px-7 py-3.5 text-white text-sm tracking-wide hover:opacity-90 transition shadow-sm disabled:opacity-60"
      >
        {status === "sending" ? copy.sending : copy.send}
      </button>

      {status === "sent" && <p className="text-sm opacity-80">{copy.sent}</p>}
      {status === "error" && <p className="text-sm text-red-700">{copy.error}</p>}
    </form>
  );
}