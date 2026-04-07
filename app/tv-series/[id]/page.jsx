"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
   CalendarDays,
   Clapperboard,
   Loader2,
   PlayCircle,
   Radio,
   Sparkles,
   Star,
   Tv,
   Users,
} from "lucide-react";

import {
   useSimilarTvSeries,
   useTvSeriesCredits,
   useTvSeriesDetails,
   useTvSeriesVideos,
} from "../../../hooks/useTvSeries";

const imageBase = "https://image.tmdb.org/t/p/";

function formatRating(value) {
   return typeof value === "number" ? value.toFixed(1) : "N/A";
}

function formatDate(value) {
   if (!value) return "Unknown";
   return new Date(value).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
   });
}

function runtimeLabel(minutes) {
   if (!minutes) return "Unknown";
   const hours = Math.floor(minutes / 60);
   const mins = minutes % 60;
   return hours ? `${hours}h ${mins}m` : `${mins}m`;
}

export default function Page() {
   const { id } = useParams();
   const { series, isLoading, error } = useTvSeriesDetails(id);
   const { credits } = useTvSeriesCredits(id);
   const { videos } = useTvSeriesVideos(id);
   const { series: similarSeries } = useSimilarTvSeries(id);

   const topCast = credits?.cast?.slice(0, 6) ?? [];
   const featuredVideo = videos?.find((video) => video.site === "YouTube") ?? null;
   const networks = series?.networks ?? [];
   const seasons = series?.seasons?.filter((season) => season.season_number > 0) ?? [];
   const createdBy = series?.created_by?.map((person) => person.name).join(", ");

   if (isLoading) {
      return (
         <div className="flex min-h-screen items-center justify-center bg-neutral-950 text-white">
            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-neutral-200 backdrop-blur">
               <Loader2 className="h-5 w-5 animate-spin text-amber-400" />
               Loading series details...
            </div>
         </div>
      );
   }

   if (error || !series) {
      return (
         <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-4 text-white">
            <div className="w-full max-w-2xl rounded-3xl border border-red-500/20 bg-red-500/10 p-8 text-center shadow-2xl shadow-red-950/30">
               <p className="mb-3 text-sm uppercase tracking-[0.35em] text-red-300">
                  Broadcast Error
               </p>
               <h1 className="mb-3 text-3xl font-bold">We couldn&apos;t load this TV series.</h1>
               <p className="text-neutral-300">
                  Check the API response and try again.
               </p>
            </div>
         </div>
      );
   }

   return (
      <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.14),_transparent_28%),linear-gradient(180deg,_#111827_0%,_#09090b_48%,_#020617_100%)] text-white">
         <section className="relative isolate overflow-hidden border-b border-white/10">
            {series.backdrop_path ? (
               <>
                  <div
                     className="absolute inset-0 -z-20 bg-cover bg-center opacity-35"
                     style={{
                        backgroundImage: `url(${imageBase}original${series.backdrop_path})`,
                     }}
                  />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/45" />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
               </>
            ) : null}

            <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:px-6 lg:grid-cols-[300px_1fr] lg:items-end lg:py-20">
               <div className="mx-auto w-full max-w-[300px] lg:mx-0">
                  <div className="rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-2xl shadow-black/40 backdrop-blur-md">
                     {series.poster_path ? (
                        <Image
                           src={`${imageBase}w780${series.poster_path}`}
                           alt={series.name}
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
                     <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-cyan-200">
                        <Tv className="h-4 w-4" />
                        TV Series
                     </span>
                     <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-amber-200">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        {formatRating(series.vote_average)} score
                     </span>
                     <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-neutral-200">
                        <Users className="h-4 w-4 text-emerald-300" />
                        {series.vote_count?.toLocaleString() || "0"} votes
                     </span>
                  </div>

                  <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                     {series.name}
                  </h1>

                  {series.tagline ? (
                     <p className="mt-3 text-lg italic text-cyan-100/80">
                        {series.tagline}
                     </p>
                  ) : null}

                  <p className="mt-6 max-w-3xl text-sm leading-7 text-neutral-300 sm:text-base">
                     {series.overview || "No overview available for this series yet."}
                  </p>

                  <div className="mt-7 flex flex-wrap gap-2">
                     {series.genres?.map((genre) => (
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
                           label: "First Air Date",
                           value: formatDate(series.first_air_date),
                           icon: CalendarDays,
                        },
                        {
                           label: "Last Air Date",
                           value: formatDate(series.last_air_date),
                           icon: Radio,
                        },
                        {
                           label: "Episodes",
                           value: series.number_of_episodes || "Unknown",
                           icon: Clapperboard,
                        },
                        {
                           label: "Episode Runtime",
                           value: runtimeLabel(series.episode_run_time?.[0]),
                           icon: Sparkles,
                        },
                     ].map((item) => {
                        const Icon = item.icon;
                        return (
                           <div
                              key={item.label}
                              className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 shadow-lg shadow-black/20 backdrop-blur"
                           >
                              <Icon className="mb-3 h-5 w-5 text-cyan-300" />
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
                  <div className="mb-5 flex items-center justify-between gap-4">
                     <div>
                        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">
                           Series Info
                        </p>
                        <h2 className="mt-2 text-2xl font-bold text-white">
                           Production snapshot
                        </h2>
                     </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                     <div className="space-y-3 text-sm">
                        {[
                           ["Status", series.status],
                           ["Type", series.type],
                           ["Original Name", series.original_name],
                           ["Original Language", String(series.original_language || "N/A").toUpperCase()],
                           ["Created By", createdBy || "Unknown"],
                        ].map(([label, value]) => (
                           <div
                              key={label}
                              className="flex items-start justify-between gap-4 border-b border-white/8 pb-3"
                           >
                              <span className="text-neutral-500">{label}</span>
                              <span className="max-w-[60%] text-right text-neutral-200">
                                 {value || "Unknown"}
                              </span>
                           </div>
                        ))}
                     </div>

                     <div>
                        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-neutral-500">
                           Networks
                        </p>
                        <div className="flex flex-wrap gap-2">
                           {networks.length ? (
                              networks.map((network) => (
                                 <span
                                    key={network.id}
                                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-neutral-200"
                                 >
                                    {network.name}
                                 </span>
                              ))
                           ) : (
                              <span className="text-sm text-neutral-400">
                                 No network information available.
                              </span>
                           )}
                        </div>
                     </div>
                  </div>
               </section>

               <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/20">
                  <div className="mb-6">
                     <p className="text-sm uppercase tracking-[0.35em] text-amber-300">
                        Seasons
                     </p>
                     <h2 className="mt-2 text-2xl font-bold text-white">
                        Episode journey
                     </h2>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                     {seasons.length ? (
                        seasons.map((season) => (
                           <article
                              key={season.id}
                              className="rounded-2xl border border-white/10 bg-black/20 p-4"
                           >
                              <div className="mb-3 flex items-center justify-between gap-3">
                                 <h3 className="text-lg font-semibold text-white">
                                    {season.name}
                                 </h3>
                                 <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200">
                                    {season.episode_count} episodes
                                 </span>
                              </div>
                              <p className="mb-3 text-sm text-neutral-400">
                                 Air date: {formatDate(season.air_date)}
                              </p>
                              <p className="text-sm leading-6 text-neutral-300">
                                 {season.overview || "No season overview available yet."}
                              </p>
                           </article>
                        ))
                     ) : (
                        <p className="text-sm text-neutral-400">
                           No season information available.
                        </p>
                     )}
                  </div>
               </section>

               <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/20">
                  <div className="mb-6">
                     <p className="text-sm uppercase tracking-[0.35em] text-emerald-300">
                        Similar Picks
                     </p>
                     <h2 className="mt-2 text-2xl font-bold text-white">
                        More like this
                     </h2>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                     {similarSeries?.slice(0, 6).map((item) => (
                        <Link
                           key={item.id}
                           href={`/tv-series/${item.id}`}
                           className="group overflow-hidden rounded-2xl border border-white/10 bg-black/20 transition hover:-translate-y-1 hover:border-cyan-400/30"
                        >
                           {item.backdrop_path || item.poster_path ? (
                              <Image
                                 src={`${imageBase}w780${item.backdrop_path || item.poster_path}`}
                                 alt={item.name}
                                 width={780}
                                 height={440}
                                 className="h-40 w-full object-cover transition duration-500 group-hover:scale-105"
                              />
                           ) : (
                              <div className="flex h-40 items-center justify-center bg-slate-900 text-slate-500">
                                 No image
                              </div>
                           )}
                           <div className="p-4">
                              <h3 className="font-semibold text-white">{item.name}</h3>
                              <p className="mt-2 text-sm text-neutral-400">
                                 {formatDate(item.first_air_date)}
                              </p>
                           </div>
                        </Link>
                     ))}
                  </div>
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
                                 Open the official trailer on YouTube
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
                        No trailer videos available for this series yet.
                     </p>
                  )}
               </section>

               <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/20">
                  <div className="mb-6">
                     <p className="text-sm uppercase tracking-[0.35em] text-violet-300">
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
                                    src={`${imageBase}w185${person.profile_path}`}
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
