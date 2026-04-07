"use client";

import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useTopRatedMovies } from "@/hooks/useMovie";
import MovieCard from './../MovieCard';

export default function TopRatingMovies() {
   const { movies, isLaoding, error } = useTopRatedMovies();
   const swiperRef = useRef(null);

   if (isLaoding)
      return <Loader2 className="animate-spin w-8 h-8 text-yellow-400" />;

   if (error)
      return <p className="text-red-500">Error: {error.message}</p>;

   return (
      <>
         {/* Header */}
         <div className="flex justify-between items-center mb-6 md:mx-0 px-2 mt-6">
            <h2 className="text-2xl text-white font-bold">Top Rating</h2>

            <div className="flex gap-2">
               <button
                  onClick={() => swiperRef.current?.slidePrev()}
                  className="p-1.5 bg-gray-200 cursor-pointer text-yellow-600 rounded-full hover:bg-yellow-400 hover:text-white"
               >
                  <ChevronLeft size={20} />
               </button>

               <button
                  onClick={() => swiperRef.current?.slideNext()}
                  className="p-1.5 bg-gray-200 cursor-pointer text-yellow-600 rounded-full hover:bg-yellow-400 hover:text-white"
               >
                  <ChevronRight size={20} />
               </button>
            </div>
         </div>

         {/* Swiper */}
         <div className="px-4 sm:px-0 mt-4">
            <Swiper
               onSwiper={(swiper) => (swiperRef.current = swiper)}
               spaceBetween={16}
               slidesPerView={1}
               breakpoints={{
                  640: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  1024: { slidesPerView: 5 },
               }}
            >
               {movies?.map((movie) => (
                  <SwiperSlide key={movie.id}>
                     <MovieCard movie={movie} />
                  </SwiperSlide>
               ))}
            </Swiper>
         </div>
      </>
   );
}