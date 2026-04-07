"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clapperboard, Loader2, Sparkles } from "lucide-react";

import MovieCard from "../../../Components/Movies/MovieCard";
import { genres as genreList } from "../../../lib/genres";
import { useMoviesByGenre } from "../../../hooks/useMovie";

export default function Page() {
   const { id } = useParams();
   const { movies, isLoading, error } = useMoviesByGenre(id);
   const activeGenre = genreList.find((genre) => String(genre.id) === String(id));
   const Icon = activeGenre?.icon ?? Clapperboard;

   if (isLoading) {
      return (
         <div className="flex min-h-screen items-center justify-center bg-neutral-950 text-white">
            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-neutral-200 backdrop-blur">
               <Loader2 className="h-5 w-5 animate-spin text-amber-400" />
               Loading genre movies...
            </div>
         </div>
      );
   }

   if (error) {
      return (
         <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-4 text-white">
            <div className="w-full max-w-2xl rounded-3xl border border-red-500/20 bg-red-500/10 p-8 text-center shadow-2xl shadow-red-950/30">
               <p className="mb-3 text-sm uppercase tracking-[0.35em] text-red-300">
                  Genre Load Error
               </p>
               <h1 className="mb-3 text-3xl font-bold">We couldn&apos;t load this genre.</h1>
               <p className="text-neutral-300">
                  Check the request and try again.
               </p>
            </div>
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.16),transparent_28%),linear-gradient(180deg,#111827_0%,#09090b_45%,#030712_100%)] text-white">
         <section className="border-b border-white/10">
            <div className="mx-auto max-w-7xl px-4 pb-12 pt-32 md:px-6 lg:pb-16 lg:pt-40">
               <Link
                  href="/#trending-movies"
                  className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
               >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
               </Link>

               <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
                  <div className="max-w-3xl">
                     <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm text-amber-200">
                        <Icon className="h-4 w-4" />
                        Genre Spotlight
                     </div>

                     <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                        {activeGenre?.name || "Movie Genre"}
                     </h1>

                     <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-300 sm:text-lg">
                        Explore movies grouped under this genre and discover a focused collection built for faster browsing.
                     </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                     {[
                        {
                           label: "Titles Found",
                           value: movies.length,
                        },
                        {
                           label: "Category",
                           value: activeGenre?.name || "Unknown",
                        },
                     ].map((item) => (
                        <div
                           key={item.label}
                           className="rounded-[1.75rem] border border-white/10 bg-white/[0.05] p-5 shadow-xl shadow-black/20 backdrop-blur"
                        >
                           <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                              {item.label}
                           </p>
                           <p className="mt-3 text-3xl font-bold text-white">{item.value}</p>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </section>

         <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:py-16">
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
               <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-amber-300">
                     Curated Results
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">
                     {activeGenre?.name || "Genre"} Movies
                  </h2>
               </div>
               <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/70">
                  <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                  Discover more
               </div>
            </div>

            {movies.length ? (
               <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                  {movies.map((movie) => (
                     <MovieCard key={movie.id} movie={movie} />
                  ))}
               </div>
            ) : (
               <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-10 text-center shadow-xl shadow-black/20">
                  <h3 className="text-2xl font-bold text-white">No movies found yet</h3>
                  <p className="mt-3 text-sm leading-6 text-neutral-400">
                     This genre did not return any titles right now. Try another genre from the browser.
                  </p>
               </div>
            )}
         </section>
      </div>
   );
}
