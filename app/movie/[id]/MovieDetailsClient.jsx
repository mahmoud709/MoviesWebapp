"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import {
   CalendarDays,
   Clock3,
   ExternalLink,
   Film,
   Loader2,
   PlayCircle,
   Quote,
   Sparkles,
   Star,
   Tv,
   Users,
} from "lucide-react";
import {
   useMovieCredits,
   useMovieDetails,
   useMovieReviews,
   useMovieVideos,
   useMovieWatchProviders,
   useRecommendedMovies,
   useSimilarMovies,
} from "../../../hooks/useMovie";
import { ImageBaseUrl } from "../../../lib/tmdb";
import Link from "next/link";

function formatMoney(n) {
   if (!n) return "N/A";
   return `$${(n / 1_000_000).toFixed(1)}M`;
}

function formatRuntime(mins) {
   if (!mins) return "Unknown";
   return `${Math.floor(mins / 60)}h ${mins % 60}m`;
}

function formatDate(value) {
   if (!value) return "Unknown";
   return new Date(value).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
   });
}

function getPreferredProviders(providerMap) {
   if (!providerMap) return null;
   return providerMap.US || providerMap.EG || Object.values(providerMap)[0] || null;
}

export default function MovieDetailsClient() {
   const { id } = useParams();
   const { movie, isLoading, error } = useMovieDetails(id);
   const { credits } = useMovieCredits(id);
   const { videos } = useMovieVideos(id);
   const { reviews } = useMovieReviews(id);
   const { movies: similarMovies } = useSimilarMovies(id);
   const { movies: recommendedMovies } = useRecommendedMovies(id);
   const { providers } = useMovieWatchProviders(id);

   const topCast = credits?.cast?.slice(0, 6) ?? [];
   const featuredVideo = videos?.find((video) => video.site === "YouTube") ?? null;
   const watchProviders = getPreferredProviders(providers);
   const reviewList = reviews.slice(0, 3);

   if (isLoading) {
      return (
         <div className="flex min-h-screen items-center justify-center bg-neutral-950 text-white">
            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-neutral-200 backdrop-blur">
               <Loader2 className="h-5 w-5 animate-spin text-yellow-400" />
               Loading movie details...
            </div>
         </div>
      );
   }

   if (error || !movie) {
      return (
         <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-4 text-white">
            <div className="w-full max-w-2xl rounded-3xl border border-red-500/20 bg-red-500/10 p-8 text-center shadow-2xl shadow-red-950/30">
               <p className="mb-3 text-sm uppercase tracking-[0.35em] text-red-300">
                  Playback Failed
               </p>
               <h1 className="mb-3 text-3xl font-bold">We couldn&apos;t load this movie.</h1>
               <p className="text-neutral-300">
                  Check the API response and try again.
               </p>
            </div>
         </div>
      );
   }

   return (
      <div className="min-h-screen mt-8 overflow-hidden bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.15),transparent_28%),linear-gradient(180deg,#111827_0%,#09090b_48%,#020617_100%)] text-white">
         <section className="relative isolate overflow-hidden border-b border-white/10">
            {movie.backdrop_path ? (
               <>
                  <div
                     className="absolute inset-0 -z-20 bg-cover bg-center opacity-35"
                     style={{ backgroundImage: `url(${ImageBaseUrl}${movie.backdrop_path})` }}
                  />
                  <div className="absolute inset-0 -z-10 bg-linear-to-r from-slate-950 via-slate-950/85 to-slate-950/45" />
                  <div className="absolute inset-0 -z-10 bg-linear-to-t from-slate-950 via-slate-950/30 to-transparent" />
               </>
            ) : null}

            <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:px-6 lg:grid-cols-[300px_1fr] lg:items-end lg:py-20">
               <div className="mx-auto w-full max-w-[300px] lg:mx-0">
                  <div className="rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-2xl shadow-black/40 backdrop-blur-md">
                     {movie.poster_path ? (
                        <Image
                           src={`${ImageBaseUrl}${movie.poster_path}`}
                           alt={movie.title}
                           width={780}
                           height={1170}
                           className="aspect-[2/3] w-full rounded-[1.5rem] object-cover"
                           priority
                        />
                     ) : (
                        <div className="flex aspect-[2/3] w-full items-center justify-center rounded-[1.5rem] bg-slate-900 text-slate-400">
                           Poster unavailable
                        </div>
                     )}
                  </div>
               </div>

               <div>
                  <div className="mb-5 flex flex-wrap items-center gap-3 text-sm">
                     <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-amber-200">
                        <Film className="h-4 w-4" />
                        Movie
                     </span>
                     <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-amber-200">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        {movie.vote_average?.toFixed(1)} score
                     </span>
                     <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-neutral-200">
                        <Users className="h-4 w-4 text-emerald-300" />
                        {movie.vote_count?.toLocaleString() || "0"} votes
                     </span>
                  </div>

                  <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                     {movie.title}
                  </h1>
                  {movie.tagline ? (
                     <p className="mt-3 text-lg italic text-amber-100/80">{movie.tagline}</p>
                  ) : null}

                  <p className="mt-6 max-w-3xl text-sm leading-7 text-neutral-300 sm:text-base">
                     {movie.overview || "No overview available for this movie yet."}
                  </p>

                  <div className="mt-7 flex flex-wrap gap-2">
                     {movie.genres?.map((genre) => (
                        <span
                           key={genre.id}
                           className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-neutral-200"
                        >
                           {genre.name}
                        </span>
                     ))}
                  </div>

                  <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                     {[
                        {
                           label: "Release Date",
                           value: formatDate(movie.release_date),
                           icon: CalendarDays,
                        },
                        {
                           label: "Runtime",
                           value: formatRuntime(movie.runtime),
                           icon: Clock3,
                        },
                        {
                           label: "Budget",
                           value: formatMoney(movie.budget),
                           icon: Sparkles,
                        },
                        {
                           label: "Revenue",
                           value: formatMoney(movie.revenue),
                           icon: Tv,
                        },
                     ].map((item) => {
                        const Icon = item.icon;
                        return (
                           <div
                              key={item.label}
                              className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 shadow-lg shadow-black/20 backdrop-blur"
                           >
                              <Icon className="mb-3 h-5 w-5 text-amber-300" />
                              <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
                                 {item.label}
                              </p>
                              <p className="mt-2 text-lg font-semibold text-white">
                                 {item.value}
                              </p>
                           </div>
                        );
                     })}
                  </div>
               </div>
            </div>
         </section>

         <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:px-6 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-8">
               <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/20">
                  <div className="mb-5">
                     <p className="text-sm uppercase tracking-[0.35em] text-amber-300">
                        Details
                     </p>
                     <h2 className="mt-2 text-2xl font-bold text-white">
                        Production snapshot
                     </h2>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                     <div className="space-y-3 text-sm">
                        {[
                           ["Status", movie.status],
                           ["Release", formatDate(movie.release_date)],
                           ["Language", movie.original_language?.toUpperCase()],
                           ["Country", movie.production_countries?.map((c) => c.name).join(", ") || "Unknown"],
                           ["IMDb", movie.imdb_id || "Unavailable"],
                        ].map(([label, value]) => (
                           <div
                              key={label}
                              className="flex items-start justify-between gap-4 border-b border-white/8 pb-3"
                           >
                              <span className="text-neutral-500">{label}</span>
                              <span className="max-w-[60%] text-right text-neutral-200">
                                 {value}
                              </span>
                           </div>
                        ))}
                     </div>

                     <div>
                        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-neutral-500">
                           Production Companies
                        </p>
                        <div className="flex flex-wrap gap-2">
                           {movie.production_companies?.length ? (
                              movie.production_companies.map((company) => (
                                 <span
                                    key={company.id}
                                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-neutral-200"
                                 >
                                    {company.name}
                                 </span>
                              ))
                           ) : (
                              <span className="text-sm text-neutral-400">
                                 No production company information available.
                              </span>
                           )}
                        </div>
                     </div>
                  </div>
               </section>

               <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/20">
                  <div className="mb-6">
                     <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">
                        Recommendations
                     </p>
                     <h2 className="mt-2 text-2xl font-bold text-white">
                        You may also like
                     </h2>
                  </div>

                  {recommendedMovies.length ? (
                     <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {recommendedMovies.slice(0, 6).map((item) => (
                           <Link key={item?.id} href={`/movie/${item.id}`}>
                              <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                                 <Image
                                    src={`${ImageBaseUrl}${item.poster_path}`}
                                    alt={item.title}
                                    width={400}
                                    height={600}
                                    className="mb-3 aspect-[2/3] w-full rounded-xl object-cover"
                                 />
                                 <p className="font-semibold text-white">{item.title}</p>
                                 <p className="mt-1 text-sm text-neutral-400">
                                    {item.release_date?.slice(0, 4) || "Unknown"}
                                 </p>
                              </div>
                           </Link>
                        ))}
                     </div>
                  ) : (
                     <p className="text-sm text-neutral-400">
                        No recommendations available yet.
                     </p>
                  )}
               </section>

               <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/20">
                  <div className="mb-6">
                     <p className="text-sm uppercase tracking-[0.35em] text-emerald-300">
                        Similar Content
                     </p>
                     <h2 className="mt-2 text-2xl font-bold text-white">
                        More like this
                     </h2>
                  </div>

                  {similarMovies.length ? (
                     <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {similarMovies.slice(0, 6).map((item) => (
                           <Link key={item?.id} href={`/movie/${item.id}`}>
                              <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                                 <Image
                                    src={`${ImageBaseUrl}${item.poster_path}`}
                                    alt={item.title}
                                    width={400}
                                    height={600}
                                    className="mb-3 aspect-[2/3] w-full rounded-xl object-cover"
                                 />
                                 <p className="font-semibold text-white">{item.title}</p>
                                 <p className="mt-1 text-sm text-neutral-400">
                                    {item.release_date?.slice(0, 4) || "Unknown"}
                                 </p>
                              </div>
                           </Link>
                        ))}
                     </div>
                  ) : (
                     <p className="text-sm text-neutral-400">
                        No similar movies available yet.
                     </p>
                  )}
               </section>
            </div>

            <div className="space-y-8">
               <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/20">
                  <div className="mb-6">
                     <p className="text-sm uppercase tracking-[0.35em] text-pink-300">
                        Watch
                     </p>
                     <h2 className="mt-2 text-2xl font-bold text-white">
                        Trailer spotlight
                     </h2>
                  </div>

                  {featuredVideo ? (
                     <div className="space-y-4">
                        <a
                           href={`https://www.youtube.com/watch?v=${featuredVideo.key}`}
                           target="_blank"
                           rel="noreferrer"
                           className="group flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:border-pink-400/30 hover:bg-black/30"
                        >
                           <div>
                              <p className="text-lg font-semibold text-white">
                                 {featuredVideo.name}
                              </p>
                              <p className="mt-1 text-sm text-neutral-400">
                                 Open the trailer on YouTube
                              </p>
                           </div>
                           <PlayCircle className="h-10 w-10 text-pink-300 transition group-hover:scale-110" />
                        </a>

                        <div className="grid gap-2">
                           {videos.slice(0, 4).map((video) => (
                              <a
                                 key={video.id}
                                 href={`https://www.youtube.com/watch?v=${video.key}`}
                                 target="_blank"
                                 rel="noreferrer"
                                 className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-neutral-200 transition hover:border-white/20 hover:bg-white/10"
                              >
                                 {video.name}
                              </a>
                           ))}
                        </div>
                     </div>
                  ) : (
                     <p className="text-sm text-neutral-400">
                        No trailer videos available for this movie yet.
                     </p>
                  )}
               </section>

               <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/20">
                  <div className="mb-6">
                     <p className="text-sm uppercase tracking-[0.35em] text-violet-300">
                        Streaming
                     </p>
                     <h2 className="mt-2 text-2xl font-bold text-white">
                        Watch providers
                     </h2>
                  </div>

                  {watchProviders ? (
                     <div className="space-y-4">
                        {[
                           ["Stream", watchProviders.flatrate],
                           ["Rent", watchProviders.rent],
                           ["Buy", watchProviders.buy],
                        ].map(([label, items]) => (
                           <div key={label}>
                              <p className="mb-2 text-xs uppercase tracking-[0.3em] text-neutral-500">
                                 {label}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                 {items?.length ? (
                                    items.slice(0, 6).map((provider) => (
                                       <span
                                          key={`${label}-${provider.provider_id}`}
                                          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-neutral-200"
                                       >
                                          {provider.provider_name}
                                       </span>
                                    ))
                                 ) : (
                                    <span className="text-sm text-neutral-400">
                                       No {String(label).toLowerCase()} providers listed.
                                    </span>
                                 )}
                              </div>
                           </div>
                        ))}

                        {watchProviders.link ? (
                           <a
                              href={watchProviders.link}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
                           >
                              View on TMDB
                              <ExternalLink className="h-4 w-4" />
                           </a>
                        ) : null}
                     </div>
                  ) : (
                     <p className="text-sm text-neutral-400">
                        No streaming provider information available for this movie.
                     </p>
                  )}
               </section>

               <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/20">
                  <div className="mb-6">
                     <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">
                        Reviews
                     </p>
                     <h2 className="mt-2 text-2xl font-bold text-white">
                        Audience takes
                     </h2>
                  </div>

                  <div className="space-y-4">
                     {reviewList.length ? (
                        reviewList.map((review) => (
                           <article
                              key={review.id}
                              className="rounded-2xl border border-white/10 bg-black/20 p-4"
                           >
                              <div className="mb-3 flex items-center gap-3">
                                 <Quote className="h-5 w-5 text-amber-300" />
                                 <div>
                                    <p className="font-semibold text-white">{review.author}</p>
                                    <p className="text-xs text-neutral-500">
                                       {formatDate(review.created_at)}
                                    </p>
                                 </div>
                              </div>
                              <p className="text-sm leading-6 text-neutral-300">
                                 {review.content.length > 320
                                    ? `${review.content.slice(0, 320)}...`
                                    : review.content}
                              </p>
                           </article>
                        ))
                     ) : (
                        <p className="text-sm text-neutral-400">
                           No reviews available for this movie yet.
                        </p>
                     )}
                  </div>
               </section>

               <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/20">
                  <div className="mb-6">
                     <p className="text-sm uppercase tracking-[0.35em] text-emerald-300">
                        Cast
                     </p>
                     <h2 className="mt-2 text-2xl font-bold text-white">
                        Main faces
                     </h2>
                  </div>

                  <div className="space-y-3">
                     {topCast.length ? (
                        topCast.map((person) => (
                           <div
                              key={person.cast_id ?? `${person.id}-${person.name}`}
                              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/20 p-3"
                           >
                              {person.profile_path ? (
                                 <Image
                                    src={`${ImageBaseUrl}${person.profile_path}`}
                                    alt={person.name}
                                    width={72}
                                    height={72}
                                    className="h-16 w-16 rounded-xl object-cover"
                                 />
                              ) : (
                                 <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-slate-900 text-slate-500">
                                    <Users className="h-6 w-6" />
                                 </div>
                              )}
                              <div>
                                 <p className="font-semibold text-white">{person.name}</p>
                                 <p className="text-sm text-neutral-400">
                                    {person.character || "Cast member"}
                                 </p>
                              </div>
                           </div>
                        ))
                     ) : (
                        <p className="text-sm text-neutral-400">
                           No cast information available.
                        </p>
                     )}
                  </div>
               </section>
            </div>
         </div>
      </div>
   );
}
