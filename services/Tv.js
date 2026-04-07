import { tmdbUrl } from "../lib/tmdb";

export const TvService = {
   getTrending: () => tmdbUrl('/trending/tv/day'),
   getPopular: () => tmdbUrl('/tv/popular'),
   getTopRated: () => tmdbUrl('/tv/top_rated'),
   getAiringToday: () => tmdbUrl('/tv/airing_today'),
   getDetails: (id) => tmdbUrl(`/tv/${id}`),
   getCredits: (id) => tmdbUrl(`/tv/${id}/credits`),
   getReviews: (id) => tmdbUrl(`/tv/${id}/reviews`),
   getVideos: (id) => tmdbUrl(`/tv/${id}/videos`),
   getSimilar: (id) => tmdbUrl(`/tv/${id}/similar`),
   getRecommendations: (id) => tmdbUrl(`/tv/${id}/recommendations`),
   getWatchProviders: (id) => tmdbUrl(`/tv/${id}/watch/providers`),
}
