import Link from "next/link";
import { Award, Sparkles, Star, TrendingUp } from "lucide-react";

import TopRatingMovies from "../../Components/Movies/TopRating/TopRating";

export default function Page() {
   return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.14),transparent_26%),linear-gradient(180deg,#111827_0%,#09090b_45%,#030712_100%)] text-white">
         <section className="border-b border-white/10">
            <div className="mx-auto max-w-7xl px-4 pb-12 pt-32 md:px-6 lg:pb-16 lg:pt-40">
               <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
                  <div className="max-w-3xl">
                     <div className="mb-5 flex flex-wrap items-center gap-3 text-sm">
                        <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-amber-200">
                           <Award className="h-4 w-4" />
                           Critics & Fans Favorite
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-neutral-200">
                           <TrendingUp className="h-4 w-4 text-cyan-300" />
                           Premium picks
                        </span>
                     </div>

                     <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Top-rated movies with the strongest audience impact.
                     </h1>

                     <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-300 sm:text-lg">
                        Dive into the highest-rated titles, revisit standout classics, and explore the most celebrated movies in one polished screen.
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
                           title: "Elite Rankings",
                           text: "A focused destination for the most celebrated films in the catalog.",
                        },
                        {
                           title: "Highly Rated",
                           text: "Built for discovering movies with standout scores and lasting impact.",
                        },
                        {
                           title: "Award-Worthy Feel",
                           text: "A cinematic layout that gives premium titles a stronger stage.",
                        },
                     ].map((item) => (
                        <div
                           key={item.title}
                           className="rounded-3xl border border-white/10 bg-white/[0.05] p-5 shadow-xl shadow-black/20 backdrop-blur"
                        >
                           <Star className="mb-4 h-5 w-5 text-amber-300" />
                           <h2 className="text-lg font-semibold text-white">{item.title}</h2>
                           <p className="mt-2 text-sm leading-6 text-neutral-400">{item.text}</p>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </section>

         <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:py-16">
            <div className="rounded-4xl border border-white/10 bg-white/4 p-4 shadow-2xl shadow-black/20 md:p-6">
               <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                     <p className="text-sm uppercase tracking-[0.35em] text-amber-300">
                        Prestige Collection
                     </p>
                     <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">
                        Top Rated Movies
                     </h2>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/70">
                     <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                     Curated for quality
                  </div>
               </div>
               <TopRatingMovies />
            </div>
         </section>
      </div>
   );
}
