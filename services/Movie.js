import { tmdbUrl } from "../lib/tmdb";

export const MovieService = {
   getTrendingMovies: () => tmdbUrl('/trending/movie/day'),
   getPopular: () => tmdbUrl('/movie/popular'),
   getTopRated: () => tmdbUrl('/movie/top_rated'),
   getUpcoming: () => tmdbUrl('/movie/upcoming'),
   getDetails: (id) => tmdbUrl(`/movie/${id}`),
   getCredits: (id) => tmdbUrl(`/movie/${id}/credits`),
   getVideos: (id) => tmdbUrl(`/movie/${id}/videos`),
   getSimilar: (id) => tmdbUrl(`/movie/${id}/similar`),
}