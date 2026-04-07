"use client"
import { useParams } from "next/navigation"
import { useMovieDetails } from './../../../hooks/useMovie';
import Image from "next/image";
import { ImageBaseUrl } from "../../../lib/tmdb";
import { Loader2 } from "lucide-react";
import GetVideos from "../../../Components/Movies/Videos/GetVideos";
import SimilarMovies from "../../../Components/Movies/SimilarMovies/SimilarMovies";

function formatMoney(n) {
   if (!n) return "N/A";
   return `$${(n / 1_000_000).toFixed(1)}M`;
}

function formatRuntime(mins) {
   if (!mins) return null;
   return `${Math.floor(mins / 60)}h ${mins % 60}m`;
}

export default function Page() {
   const { id } = useParams();
   const { movie, isLoading, error } = useMovieDetails(id);
   if (isLoading) {
      return (
         <div className="flex items-center justify-center min-h-75">
            <Loader2 className="w-8 h-8 text-yellow-400 animate-spin" />
         </div>
      );
   }

   if (error || !movie) return (
      <div className="flex items-center justify-center h-96 text-red-400">
         Failed to load movie.
      </div>
   );

   return (
      <div className="min-h-screen bg-neutral-950 text-white font-sans">

         {/* Hero */}
         <div className="relative h-80 md:h-105 overflow-hidden">
            <Image
               src={`${ImageBaseUrl}${movie.backdrop_path}`}
               alt={movie.backdrop_path}
               className="w-full h-full object-cover brightness-[0.50]"
               width={300}
               height={300}
            />
            <div className="absolute inset-0 bg-linear-to-r from-neutral-950 via-neutral-950/70 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex gap-6 items-end">
               <Image
                  src={`${ImageBaseUrl}${movie.poster_path}`}
                  alt={movie.title}
                  className="hidden md:block w-24 rounded-md border border-white/10 shadow-xl shrink-0"
                  width={250}
                  height={250}
               />
               <div>
                  <h1 className="font-serif text-3xl md:text-4xl font-bold leading-tight">
                     {movie.title}
                  </h1>
                  {movie.tagline && (
                     <p className="italic text-white/50 text-sm mt-1 mb-3">{movie.tagline}</p>
                  )}
                  <div className="flex flex-wrap gap-2 mt-3">
                     <span className="text-xs px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        ★ {movie.vote_average?.toFixed(1)}
                     </span>
                     {movie.genres?.map(g => (
                        <span key={g.id} className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/70 border border-white/15">
                           {g.name}
                        </span>
                     ))}
                     {movie.runtime && (
                        <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/70 border border-white/15">
                           {formatRuntime(movie.runtime)}
                        </span>
                     )}
                     <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/70 border border-white/15">
                        {movie.release_date?.slice(0, 4)}
                     </span>
                  </div>
               </div>
            </div>
         </div>

         {/* Body */}
         <div className="max-w-4xl mx-auto px-6 py-8 space-y-4">

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
               {[
                  { label: "Budget", value: formatMoney(movie.budget), sub: "production" },
                  { label: "Revenue", value: formatMoney(movie.revenue), sub: "worldwide" },
                  { label: "Votes", value: movie.vote_count?.toLocaleString(), sub: "user ratings" },
               ].map(s => (
                  <div key={s.label} className="bg-neutral-900 rounded-xl p-4">
                     <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">{s.label}</p>
                     <p className="text-xl font-medium">{s.value}</p>
                     <p className="text-xs text-neutral-500">{s.sub}</p>
                  </div>
               ))}
            </div>

            {/* Overview */}
            <div className="bg-neutral-900 rounded-xl p-5">
               <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-3">Overview</p>
               <p className="text-sm text-neutral-300 leading-relaxed">{movie.overview}</p>
            </div>

            {/* Details + Score */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="bg-neutral-900 rounded-xl p-5">
                  <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-3">Details</p>
                  <table className="w-full text-sm">
                     <tbody>
                        {[
                           ["Status", movie.status],
                           ["Release", movie.release_date],
                           ["Language", movie.original_language?.toUpperCase()],
                           ["Country", movie.origin_country?.join(", ")],
                           ["IMDB", movie.imdb_id],
                        ].map(([k, v]) => (
                           <tr key={k}>
                              <td className="text-neutral-500 py-1 w-1/3">{k}</td>
                              <td className="text-neutral-200">{v}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>

               <div className="bg-neutral-900 rounded-xl p-5">
                  <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-3">
                     Production Companies
                  </p>
                  <div className="flex flex-wrap gap-2">
                     {movie.production_companies?.map(c => (
                        <span
                           key={c.id}
                           className="text-xs bg-neutral-800 text-neutral-300 px-3 py-1 rounded-lg border border-neutral-700"
                        >
                           {c.name}
                        </span>
                     ))}
                  </div>
               </div>
            </div>
         </div>
         <GetVideos id={id} />
         <SimilarMovies id={id} />
      </div>
   );
}