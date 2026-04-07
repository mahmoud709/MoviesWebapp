import { tmdbUrl } from "../lib/tmdb";

export const MovieService = {
   getTrendingMovies: () => tmdbUrl('/trending/movie/day'),
   getPopular: () => tmdbUrl('/movie/popular'),
   getTopRated: () => tmdbUrl('/movie/top_rated'),
   getUpcoming: () => tmdbUrl('/movie/upcoming'),
   getMoviesByGenre: (id) => tmdbUrl(`/discover/movie?with_genres=${id}`),
   getDetails: (id) => tmdbUrl(`/movie/${id}`),
   getCredits: (id) => tmdbUrl(`/movie/${id}/credits`),
   getReviews: (id) => tmdbUrl(`/movie/${id}/reviews`),
   getVideos: (id) => tmdbUrl(`/movie/${id}/videos`),
   getSimilar: (id) => tmdbUrl(`/movie/${id}/similar`),
   getRecommendations: (id) => tmdbUrl(`/movie/${id}/recommendations`),
   getWatchProviders: (id) => tmdbUrl(`/movie/${id}/watch/providers`),
   getGenres: () => tmdbUrl('/genre/movie/list')
}
