"use client";

import { useRef, useState } from "react";

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
  const formRef = useRef<HTMLFormElement | null>(null);

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      message: String(fd.get("message") || "").trim(),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("sent");
        formRef.current?.reset();
        return;
      }

      let raw = "";
      try {
        raw = await res.text();
      } catch {
        raw = "";
      }

      setStatus("error");
      setErrorMsg(raw || `Request failed (HTTP ${res.status})`);
    } catch {
      setStatus("error");
      setErrorMsg(copy.error || "Something went wrong. Please try again.");
    }
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="mt-10 max-w-xl space-y-4">
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
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-[#3f4f36] px-7 py-3.5 text-white text-sm tracking-wide hover:opacity-90 transition shadow-sm disabled:opacity-60"
      >
        {status === "sending" ? copy.sending : copy.send}
      </button>

      {status === "sent" && (
        <p className="text-sm text-green-800">{copy.sent}</p>
      )}

      {status === "error" && (
        <p className="text-sm text-red-700">{errorMsg || copy.error}</p>
      )}
    </form>
  );
}