"use client";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useState } from "react";

import { genres } from "../../lib/genres";

export default function Generes() {
   const allGenres = genres;
   const genresLength = allGenres?.length || 0;
   const [page, setPage] = useState(1);
   const [limit] = useState(6);
   const skip = (page - 1) * limit;
   const totalLength = Math.ceil(genresLength / limit);

   return (
      <section className="mt-12 rounded-4xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.02)_100%)] p-5 shadow-2xl shadow-black/20 md:p-6">
         <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
               <p className="text-sm uppercase tracking-[0.35em] text-amber-300">
                  Browse Categories
               </p>
               <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">
                  Explore Movies by Genre
               </h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-neutral-400">
               Jump into curated movie categories and open a dedicated page for each genre.
            </p>
         </div>

         <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 mb-6">
            {allGenres?.slice(skip, skip + limit)?.map((genre) => {
               const Icon = genre.icon;
               return (
                  <Link href={`/genere/${genre.id}`} key={genre.id} className="group">
                     <div className="flex items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/4 p-5 text-white transition duration-300 hover:-translate-y-1 hover:border-amber-400/30 hover:bg-white/[0.07]">
                        <div>
                           <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                              Movie Genre
                           </p>
                           <h3 className="mt-2 text-xl font-semibold text-white transition group-hover:text-amber-200">
                              {genre.name}
                           </h3>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-amber-400/20 to-orange-500/10 text-amber-300">
                           <Icon className="h-5 w-5" />
                        </div>
                     </div>
                  </Link>
               );
            })}
         </div>

         <div className="flex flex-wrap items-center justify-center gap-2">
            <button
               className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
               disabled={page === 1}
               onClick={() => setPage((prev) => prev - 1)}
            >
               <ChevronLeft className="h-4 w-4" />
               Prev
            </button>

            {Array.from({ length: totalLength }, (_, i) => i + 1).map((num) => {
               return (
                  <button
                     key={num}
                     onClick={() => setPage(num)}
                     className={`h-10 min-w-10 rounded-full px-3 text-sm font-semibold transition ${
                        num === page
                           ? "bg-amber-400 text-black"
                           : "bg-white/5 text-white hover:bg-white/10"
                     }`}
                  >
                     {num}
                  </button>
               );
            })}

            <button
               className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
               disabled={page === totalLength}
               onClick={() => setPage((prev) => prev + 1)}
            >
               Next
               <ChevronRight className="h-4 w-4" />
            </button>

            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-amber-200">
               <Sparkles className="h-3.5 w-3.5" />
               Page {page} of {totalLength}
            </span>
         </div>
      </section>
   );
}
