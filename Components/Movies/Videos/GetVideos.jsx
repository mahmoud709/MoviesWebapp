import { Loader2 } from "lucide-react";
import { useMovieVideos } from "@/hooks/useMovie";

export default function GetVideos({id}) {
   const { videos, isLoading, error } = useMovieVideos(id);

   return (
      <div className="container mx-auto py-8">
         <h2 className="text-lg font-semibold mb-4 text-white">
            Trailer Movies
         </h2>

         {isLoading ? (
            <div className="flex items-center justify-center min-h-75">
               <Loader2 className="w-8 h-8 text-yellow-400 animate-spin" />
            </div>
         ) : error ? (
            <p className="text-red-400 text-center">Error loading videos</p>
         ) : videos.length === 0 ? (
            <div className="flex items-center justify-center min-h-50 text-neutral-400">
               No videos available
            </div>
         ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
               {videos.slice(0, 4).map((video) => (
                  <iframe
                     key={video.id}
                     src={`https://www.youtube.com/embed/${video.key}`}
                     className="w-full h-60 rounded-xl"
                     allowFullScreen
                  />
               ))}
            </div>
         )}
      </div>
   );
}