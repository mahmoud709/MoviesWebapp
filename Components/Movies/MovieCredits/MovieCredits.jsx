
import { useMovieCredits } from './../../../hooks/useMovie';

export default function MovieCredits({ id }) {
   const { credits, isLoading, error } = useMovieCredits(id);
   return ( 
      <div className="container mx-auto py-8">
         <h2 className="text-lg font-semibold mb-4 text-white">
            Movie Credits
         </h2>
         {isLoading ? (
            <p className="text-yellow-400 text-center">Loading credits...</p>
         ) : error ? (
            <p className="text-red-400 text-center">Failed to load credits</p>
         ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 ">
               {credits?.cast?.slice(0, 10).map((cast) => (
                  <div key={cast.cast_id} className="bg-gray-800 p-4 rounded group">
                     <p className="text-sm font-semibold text-white group-hover:text-yellow-400">{cast.name}</p>
                     <p className="text-xs text-neutral-400">{cast.character}</p>
                  </div>
               ))}
            </div>
         )}
      </div>
   );
}