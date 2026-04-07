import { tmdbUrl } from "../lib/tmdb";

export const TvService = {
   getTrending: () => tmdbUrl('/trending/tv/day'),
   getPopular: () => tmdbUrl('/tv/popular'),
   getTopRated: () => tmdbUrl('/tv/top_rated'),
   getAiringToday: () => tmdbUrl('/tv/airing_today'),
   getDetails: (id) => tmdbUrl(`/tv/${id}`),
   getCredits: (id) => tmdbUrl(`/tv/${id}/credits`),
   getVideos: (id) => tmdbUrl(`/tv/${id}/videos`),
   getSimilar: (id) => tmdbUrl(`/tv/${id}/similar`),
}