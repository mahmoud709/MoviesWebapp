"use client";
import { ImageBaseUrl } from '@/lib/tmdb';
import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function MovieCard({ movie }) {
   return (
      <div key={movie.id} className="group cursor-pointer mb-4">
         <Link href={`/movie/${movie.id}`}>
            {/* Poster */}
            <div className="relative rounded-xl overflow-hidden mb-3 shadow-lg group-hover:scale-[1.02] transition">
               <Image
                  src={`${ImageBaseUrl}${movie.poster_path}`}
                  alt={movie.title}
                  width={300}
                  height={450}
                  className="w-full h-full object-cover"
               />

               {/* Rating */}
               <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded text-white text-xs flex items-center gap-1">
                  <Star size={10} className="fill-yellow-400 text-yellow-400" />
                  {movie.vote_average?.toFixed(1)}
               </div>

               {/* Overlay */}
               <div className="absolute inset-0  p-3 bg-linear-to-t from-black/50 to-transparent">
               </div>
            </div>

            {/* Info */}
            <h3 className="font-bold text-sm truncate mb-1 text-white">
               {movie.title}
            </h3>
            <div className="flex justify-between text-xs text-slate-400">
               <span>{movie.release_date?.split('-')[0]}</span>
               <span>{movie.vote_count} votes</span>
            </div>
         </Link>
      </div>
   )
}