"use client";
import useSWR from "swr";
import { TvService } from "../services/Tv";
import { fetcher } from "../lib/fetcher";

const options = { revalidateOnFocus: false, dedupingInterval: 60_000 };

export default function useTvSeries() {
   const { data, isLoading, error } = useSWR(TvService.getTrending(), fetcher, options);
   return { series: data?.results ?? [], isLoading, error };
}
export function usePopularTvSeries() {
   const { data, error, isLoading } = useSWR(TvService.getPopular(), fetcher, options)
   return { series: data?.results ?? [], isLoading, error }
}
export function useTopRatedTvSeries() {
   const { data, error, isLoading } = useSWR(TvService.getTopRated(), fetcher, options)
   return { series: data?.results ?? [], isLoading, error }
}
export function useAiringTodayTvSeries() {
   const { data, error, isLoading } = useSWR(TvService.getAiringToday(), fetcher, options)
   return { series: data?.results ?? [], isLoading, error }
}
export function useTvSeriesDetails(id) {
   const { data, error, isLoading } = useSWR(id ? TvService.getDetails(id) : null, fetcher, options)
   return { series: data, isLoading, error }
}
export function useTvSeriesVideos(id) {
   const { data, error, isLoading } = useSWR(id ? TvService.getVideos(id) : null, fetcher, options)
   return { videos: data?.results ?? [], isLoading, error }
}
export function useTvSeriesCredits(id) {
   const { data, error, isLoading } = useSWR(id ? TvService.getCredits(id) : null, fetcher, options)
   return { credits: data, isLoading, error }
}
export function useTvSeriesReviews(id) {
   const { data, error, isLoading } = useSWR(id ? TvService.getReviews(id) : null, fetcher, options)
   return { reviews: data?.results ?? [], isLoading, error }
}
export function useSimilarTvSeries(id) {
   const { data, error, isLoading } = useSWR(id ? TvService.getSimilar(id) : null, fetcher, options)
   return { series: data?.results ?? [], isLoading, error }
}
export function useRecommendedTvSeries(id) {
   const { data, error, isLoading } = useSWR(id ? TvService.getRecommendations(id) : null, fetcher, options)
   return { series: data?.results ?? [], isLoading, error }
}
export function useTvSeriesWatchProviders(id) {
   const { data, error, isLoading } = useSWR(id ? TvService.getWatchProviders(id) : null, fetcher, options)
   return { providers: data?.results ?? {}, isLoading, error }
}
export function useTvSeriesSeasons(id) {
   const { data, error, isLoading } = useSWR(id ? TvService.getDetails(id) : null, fetcher, options)
   return { seasons: data?.seasons ?? [], isLoading, error }
}
