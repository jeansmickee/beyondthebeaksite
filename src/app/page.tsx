import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] opacity-60">
              Sri Lanka · Birdwatching · Nature Travel
            </p>

              <h1 className="mt-6 text-5xl md:text-6xl font-serif leading-[1.02] tracking-tight">
              Beyond the Beak
            </h1>

            <p className="mt-6 text-lg opacity-80 max-w-xl">
              Journeys for the curious and kind. Small-group birdwatching and nature
              experiences in Sri Lanka — designed with presence, patience and respect.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded-full bg-[#3f4f36] px-7 py-3.5 text-white text-sm tracking-wide hover:opacity-90 transition shadow-sm"
              >
                Request a proposal
              </Link>

              <Link
                href="/journeys"
                className="rounded-full border border-black/20 px-6 py-3 text-sm hover:bg-black/5 transition"
              >
                Explore journeys
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-4 text-sm">
              <div className="rounded-2xl border border-black/10 bg-white/30 p-4">
                <div className="font-semibold">Small groups</div>
                <div className="opacity-75">Calm pace</div>
              </div>
              <div className="rounded-2xl border border-black/10 bg-white/30 p-4">
                <div className="font-semibold">Local insight</div>
                <div className="opacity-75">Deep knowledge</div>
              </div>
              <div className="rounded-2xl border border-black/10 bg-white/30 p-4">
                <div className="font-semibold">Respect first</div>
                <div className="opacity-75">Ethical travel</div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-black/10 bg-white/30 p-6">
            <div className="aspect-[4/3] w-full rounded-2xl bg-black/10" />
            <p className="mt-4 text-sm opacity-75">
              Hej.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}