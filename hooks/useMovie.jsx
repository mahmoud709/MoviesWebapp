"use client"
import useSWR from "swr"
import { MovieService } from "../services/Movie"
import { fetcher } from "../lib/fetcher"

const options = { revalidateOnFocus: false, dedupingInterval: 60_000 };

export default function useTrendingMovies() {
   const { data, isLaoding, error } = useSWR(MovieService.getTrendingMovies(), fetcher, options);
   return { movies: data?.results ?? [], isLaoding, error };
}

export function usePopularMovies() {
   const { data, error, isLoading } = useSWR(MovieService.getPopular(), fetcher, options)
   return { movies: data?.results ?? [], isLoading, error }
}

export function useTopRatedMovies() {
   const { data, error, isLoading } = useSWR(MovieService.getTopRated(), fetcher, options)
   return { movies: data?.results ?? [], isLoading, error }
}

export function useUpcomingMovies() {
   const { data, error, isLoading } = useSWR(MovieService.getUpcoming(), fetcher, options)
   return { movies: data?.results ?? [], isLoading, error }
}

export function useMovieDetails(id) {
   const { data, error, isLoading } = useSWR(id ? MovieService.getDetails(id) : null, fetcher, options)
   return { movie: data, isLoading, error }
}
export function useMovieVideos(id) {
   const { data, error, isLoading } = useSWR(id ? MovieService.getVideos(id) : null, fetcher, options)
   return { videos: data?.results ?? [], isLoading, error }
}
export function useMovieCredits(id) {
   const { data, error, isLoading } = useSWR(id ? MovieService.getCredits(id) : null, fetcher, options)
   return { credits: data, isLoading, error }
}
export function useMovieReviews(id) {
   const { data, error, isLoading } = useSWR(id ? MovieService.getReviews(id) : null, fetcher, options)
   return { reviews: data?.results ?? [], isLoading, error }
}
export function useSimilarMovies(id) {
   const { data, error, isLoading } = useSWR(id ? MovieService.getSimilar(id) : null, fetcher, options)
   return { movies: data?.results ?? [], isLoading, error }
}
export function useRecommendedMovies(id) {
   const { data, error, isLoading } = useSWR(id ? MovieService.getRecommendations(id) : null, fetcher, options)
   return { movies: data?.results ?? [], isLoading, error }
}
export function useMovieWatchProviders(id) {
   const { data, error, isLoading } = useSWR(id ? MovieService.getWatchProviders(id) : null, fetcher, options)
   return { providers: data?.results ?? {}, isLoading, error }
}
export function useGenres() {
   const { data, error, isLoading } = useSWR(MovieService.getGenres(), fetcher, options)
   return { genres: data?.genres ?? [], isLoading, error }
}

export function useMoviesByGenre(id) {
   const { data, error, isLoading } = useSWR(
      id ? MovieService.getMoviesByGenre(id) : null,
      fetcher,
      options
   )

   return { movies: data?.results ?? [], isLoading, error }
}
