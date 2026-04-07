import Link from "next/link";
import { Clapperboard, Film, Sparkles, Tv } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/#trending-movies", label: "Trending" },
  { href: "/#popular-movies", label: "Popular" },
  { href: "/#top-rated-movies", label: "Top Rated" },
  { href: "/#upcoming-movies", label: "Upcoming" },
  { href: "/tv-series", label: "Series" },
  { href: "/up-coming", label: "Coming Soon" },
];

export default function AppFooter() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-[linear-gradient(180deg,_rgba(10,10,12,0.96)_0%,_rgba(2,6,23,1)_100%)] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
              <Sparkles className="h-4 w-4 text-yellow-300" />
              Built for movie nights and series binges
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 text-black shadow-lg shadow-amber-500/25">
                <Film className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-2xl font-black tracking-tight text-yellow-300">
                  Movies Hub
                </h2>
                <p className="text-sm text-white/60">
                  Discover films, track upcoming releases, and dive into TV series.
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-xl text-sm leading-7 text-neutral-400">
              A polished space to explore trending movies, popular picks, top rated titles,
              upcoming releases, and binge-worthy series across one connected experience.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-white/80">
                <Clapperboard className="h-4 w-4 text-cyan-300" />
                Movies
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-white/80">
                <Tv className="h-4 w-4 text-pink-300" />
                TV Series
              </span>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
                Navigate
              </h3>
              <nav className="mt-4 grid grid-cols-2 gap-3 text-sm">
                {quickLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-white/70 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
                About
              </h3>
              <div className="mt-4 space-y-3 text-sm text-white/65">
                <p>Browse curated content for what to watch next.</p>
                <p>Follow trending titles and upcoming premieres in one place.</p>
                <p>Designed with a cinematic look across desktop and mobile.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
          <p>(c) 2026 Movies Hub. Crafted for discovering great stories.</p>
          <p>Powered by TMDB data and a custom Next.js experience.</p>
        </div>
      </div>
    </footer>
  );
}
