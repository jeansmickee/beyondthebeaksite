import Link from "next/link";

const journeys = [
  { title: "7-day Birding Essentials", note: "Best highlights in a calm pace." },
  { title: "10-day Deep Nature Journey", note: "More habitats, more time." },
  { title: "Custom Photo Journey", note: "Designed around light and patience." },
];

export default function JourneysPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-14">
      <h1 className="font-serif text-4xl">Journeys</h1>
      <p className="mt-3 max-w-2xl opacity-80">
        A small selection of journeys — every trip is tailored. Request a proposal
        to receive an itinerary and quote.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {journeys.map((j) => (
          <div key={j.title} className="rounded-2xl border border-black/10 bg-white/30 p-6">
            <div className="font-semibold">{j.title}</div>
            <div className="mt-2 text-sm opacity-80">{j.note}</div>
            <Link href="/contact" className="mt-4 inline-block text-sm underline underline-offset-4">
              Request proposal
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}