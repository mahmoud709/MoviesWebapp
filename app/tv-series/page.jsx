"use client";

import Image from "next/image";
import { Clapperboard, Flame, Loader2, Sparkles, Star } from "lucide-react";

import useTvSeries from "../../hooks/useTvSeries";
import { ImageBaseUrl } from "../../lib/tmdb";
import Link from "next/link";


function formatYear(date) {
   return date ? new Date(date).getFullYear() : "Coming Soon";
}

function formatRating(value) {
   return typeof value === "number" ? value.toFixed(1) : "N/A";
}

export default function Page() {
   const { series, isLoading, error } = useTvSeries();
   const featuredSeries = series[0];

   if (isLoading) {
      return (
         <div className="min-h-screen bg-neutral-950 text-white">
            <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4">
               <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-neutral-200 backdrop-blur">
                  <Loader2 className="h-5 w-5 animate-spin text-amber-400" />
                  Loading trending series...
               </div>
            </div>
         </div>
      );
   }

   if (error) {
      return (
         <div className="min-h-screen bg-neutral-950 text-white">
            <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-4">
               <div className="w-full rounded-3xl border border-red-500/20 bg-red-500/10 p-8 text-center shadow-2xl shadow-red-950/30">
                  <p className="mb-3 text-sm uppercase tracking-[0.35em] text-red-300">
                     Streaming Interrupted
                  </p>
                  <h1 className="mb-3 text-3xl font-bold">We couldn&apos;t load the TV catalog.</h1>
                  <p className="text-neutral-300">
                     Check your TMDB API key and try again.
                  </p>
               </div>
            </div>
         </div>
      );
   }

   return (
      <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.16),transparent_28%),linear-gradient(180deg,#111827_0%,#09090b_45%,#030712_100%)] text-white">
         <section className="relative border-b border-white/10">
            {featuredSeries?.backdrop_path ? (
               <>
                  <div
                     className="absolute inset-0 -z-20 bg-cover bg-center opacity-35"
                     style={{
                        backgroundImage: `url(${ImageBaseUrl}original${featuredSeries.backdrop_path})`,
                     }}
                  />
                  <div className="absolute inset-0 -z-10 bg-linear-to-b from-neutral-950/30 via-neutral-950/70 to-neutral-950" />
               </>
            ) : null}

            <div className="mx-auto grid min-h-[56vh] max-w-7xl gap-10 px-4 py-16 md:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:py-24">
               <div className="max-w-3xl">
                  <div className="mb-5 flex flex-wrap items-center gap-3 text-sm text-neutral-200">
                     <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-amber-200">
                        <Flame className="h-4 w-4" />
                        Trending Now
                     </span>
                     <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
                        <Clapperboard className="h-4 w-4 text-cyan-300" />
                        {series.length} shows loaded
                     </span>
                  </div>

                  <h1 className="max-w-2xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                     Binge-worthy series with a cinematic look.
                  </h1>
                  <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-300 sm:text-lg">
                     Explore trending TV shows, spotlight the biggest releases, and discover your next obsession in one polished screen.
                  </p>

                  {featuredSeries ? (
                     <div className="mt-8 rounded-3xl border border-white/10 bg-black/30 p-6 shadow-2xl shadow-black/30 backdrop-blur-md">
                        <div className="mb-4 flex flex-wrap items-center gap-3 text-sm">
                           <span className="inline-flex items-center gap-2 rounded-full bg-white/8 px-3 py-1.5 text-neutral-200">
                              <Sparkles className="h-4 w-4 text-amber-300" />
                              Featured pick
                           </span>
                           <span className="inline-flex items-center gap-2 rounded-full bg-white/8 px-3 py-1.5 text-neutral-200">
                              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                              {formatRating(featuredSeries.vote_average)} rating
                           </span>
                           <span className="rounded-full bg-white/8 px-3 py-1.5 text-neutral-200">
                              {formatYear(featuredSeries.first_air_date)}
                           </span>
                        </div>

                        <h2 className="text-2xl font-bold text-white sm:text-3xl">
                           {featuredSeries.name}
                        </h2>
                        <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-300 sm:text-base">
                           {featuredSeries.overview || "No overview available for this series yet."}
                        </p>
                     </div>
                  ) : null}
               </div>

               <div className="relative mx-auto w-full max-w-md lg:mx-0">
                  <div className="absolute inset-0 -z-10 rounded-4xl bg-linear-to-br from-amber-400/30 via-orange-500/15 to-cyan-400/10 blur-3xl" />
                  <div className="rounded-4xl border border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/40 backdrop-blur-md">
                     {featuredSeries?.poster_path ? (
                        <Image
                           src={`${ImageBaseUrl}${featuredSeries.poster_path}`}
                           alt={featuredSeries.name}
                           width={780}
                           height={1170}
                           className="aspect-2/3 w-full rounded-3xl object-cover"
                           priority
                        />
                     ) : (
                        <div className="flex aspect-2/3 w-full items-center justify-center rounded-3xl bg-neutral-900 text-neutral-400">
                           Poster unavailable
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </section>

         <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:py-16">
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
               <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-amber-300">
                     Curated Feed
                  </p>
                  <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">
                     Trending TV Series
                  </h2>
               </div>
               <p className="max-w-2xl text-sm leading-6 text-neutral-400">
                  A richer browse experience with artwork, release info, ratings, and cleaner spacing across mobile and desktop.
               </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
               {series.map((tv, index) => (
                  <Link key={tv.id} href={`/tv-series/${tv.id}`} className="group">
                     <article
                        className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/4 shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-amber-400/30 hover:bg-white/6"
                     >
                        <div className="relative">
                           {tv.backdrop_path || tv.poster_path ? (
                              <Image
                                 src={`${ImageBaseUrl}${tv.backdrop_path || tv.poster_path}`}
                                 alt={tv.name}
                                 width={780}
                                 height={440}
                                 className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                              />
                           ) : (
                              <div className="flex h-52 w-full items-center justify-center bg-neutral-900 text-neutral-500">
                                 No image available
                              </div>
                           )}

                           <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
                           <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/45 px-3 py-1 text-xs font-semibold tracking-[0.25em] text-white/90 backdrop-blur">
                              #{String(index + 1).padStart(2, "0")}
                           </div>
                           <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
                              <span className="inline-flex items-center gap-2 rounded-full bg-black/55 px-3 py-1.5 text-xs text-white backdrop-blur">
                                 <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                                 {formatRating(tv.vote_average)}
                              </span>
                              <span className="rounded-full bg-black/55 px-3 py-1.5 text-xs text-white backdrop-blur">
                                 {formatYear(tv.first_air_date)}
                              </span>
                           </div>
                        </div>

                        <div className="space-y-4 p-5">
                           <div>
                              <h3 className="text-xl font-bold text-white transition group-hover:text-amber-200">
                                 {tv.name}
                              </h3>
                              <p className="mt-3 min-h-18 text-sm leading-6 text-neutral-400">
                                 {tv.overview
                                    ? `${tv.overview.slice(0, 140)}${tv.overview.length > 140 ? "..." : ""}`
                                    : "No overview available for this series yet."}
                              </p>
                           </div>

                           <div className="flex flex-wrap items-center gap-2">
                              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-300">
                                 Original language: {String(tv.original_language || "N/A").toUpperCase()}
                              </span>
                              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-300">
                                 Popularity: {Math.round(tv.popularity || 0)}
                              </span>
                           </div>
                        </div>
                     </article>
                  </Link>
               ))}
            </div>
         </section>
      </div>
   );
}
