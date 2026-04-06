const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/original";

async function getTrendingMovies() {
   const api_key = process.env.NEXT_PUBLIC_TMDB_API_KEY;

   const res = await fetch(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${api_key}`,
      { cache: "no-store" }
   );

   if (!res.ok) return [];

   const data = await res.json();
   return data?.results ? data.results.slice(0, 3) : [];
}

export default async function HeroSection() {
   const movies = await getTrendingMovies();
   const movie = movies[0];

   const bgImage = movie?.backdrop_path
      ? `${TMDB_IMAGE_BASE}${movie.backdrop_path}`
      : "";

   const year = movie?.release_date.split('-')[0];
   
   return (
      <div
         className="relative h-screen flex items-center text-white"
         style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
         }}
      >
         <div className="absolute inset-0 bg-linear-to-r from-black via-black/70 to-transparent"></div>

         {/* bottom fade */}
         <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent"></div>

         {/* content */}
         <div className="relative z-10 container mx-auto px-6">
            <div className="max-w-2xl space-y-5">

               <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                  {movie.title}
               </h1>

               <div className="flex items-center gap-3 text-sm text-gray-300">
                  <span className="border px-2 py-0.5 text-xs">PG-13</span>
                  <span>{year}</span>
                  <span>⭐ {movie.vote_average.toFixed(1)}</span>
                  <span className="hidden sm:inline">• Trending</span>
               </div>

               <p className="text-gray-300 text-sm md:text-base line-clamp-3">
                  {movie.overview}
               </p>

               <div className="flex gap-4 pt-3">
                  <button className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded-md font-semibold hover:bg-gray-200 transition">
                     ▶ Play
                  </button>

                  <button className="flex items-center gap-2 bg-white/20 backdrop-blur px-6 py-2 rounded-md hover:bg-white/30 transition">
                     More Info
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}