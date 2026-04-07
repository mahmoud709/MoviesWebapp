"use client";

import { useSimilarMovies } from "@/hooks/useMovie";
import { Loader2 } from "lucide-react";
import MovieCard from './../MovieCard';
export default function SimilarMovies({ id }) {
   const { movies, isLoading, error } = useSimilarMovies(id);

   return (
      <div className="container mx-auto py-8">
         <h2 className="text-lg font-semibold mb-4 text-white">
            Similar Movies
         </h2>

         {isLoading ? (
            <div className="flex items-center justify-center min-h-50">
               <Loader2 className="w-8 h-8 text-yellow-400 animate-spin" />
            </div>
         ) : error ? (
            <p className="text-red-400 text-center">
               Failed to load similar movies
            </p>
         ) : movies.length === 0 ? (
            <div className="flex items-center justify-center min-h-50 text-neutral-400">
               No similar movies found 🎬
            </div>
         ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
               {movies.slice(0, 5).map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
               ))}
            </div>
         )}
      </div>
   );
}