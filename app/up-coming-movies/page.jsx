import Link from "next/link";
import { CalendarRange, Clapperboard, Sparkles } from "lucide-react";

import UpcommingMovies from "../../Components/Movies/Upcoming/UpcomingMovies";

export default function Page() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(250,204,21,0.14),_transparent_28%),linear-gradient(180deg,_#111827_0%,_#09090b_42%,_#020617_100%)] text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-32 md:px-6 lg:pb-16 lg:pt-40">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="max-w-3xl">
              <div className="mb-5 flex flex-wrap items-center gap-3 text-sm">
                <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-amber-200">
                  <CalendarRange className="h-4 w-4" />
                  Coming Soon
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-neutral-200">
                  <Clapperboard className="h-4 w-4 text-cyan-300" />
                  Big-screen releases
                </span>
              </div>

              <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                Upcoming movies worth watching before everyone else.
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-300 sm:text-lg">
                Browse the next wave of releases, spot the biggest premieres, and keep your watchlist ahead of schedule with a cleaner cinema-style layout.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/#trending-movies"
                  className="rounded-full bg-yellow-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-yellow-300"
                >
                  Explore Trending
                </Link>
                <Link
                  href="/tv-series"
                  className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Browse Series
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {[
                {
                  title: "Fresh Releases",
                  text: "Track movies preparing to hit theaters and streaming platforms.",
                },
                {
                  title: "Watchlist Ready",
                  text: "Use this page to decide what deserves a reminder next.",
                },
                {
                  title: "Cinematic Feed",
                  text: "A cleaner showcase built around discovery and fast browsing.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-5 shadow-xl shadow-black/20 backdrop-blur"
                >
                  <Sparkles className="mb-4 h-5 w-5 text-amber-300" />
                  <h2 className="text-lg font-semibold text-white">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-neutral-400">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:py-16">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-black/20 md:p-6">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-amber-300">
                Release Radar
              </p>
              <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">
                Upcoming Movies Collection
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-neutral-400">
              Scroll through upcoming titles and preview what&apos;s arriving next across the movie lineup.
            </p>
          </div>

          <UpcommingMovies />
        </div>
      </section>
    </div>
  );
}
