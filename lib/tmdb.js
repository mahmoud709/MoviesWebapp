
const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
export const tmdbUrl = (path) => `${BASE_URL}${path}?api_key=${API_KEY}`;