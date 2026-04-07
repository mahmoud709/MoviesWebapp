import HeroSection from "@/Components/Hero/HeroSection";
import Movies from './../Components/Movies/Movies';
import PopularMovies from './../Components/Movies/Popular/PopularMovies';
import TopRatingMovies from './../Components/Movies/TopRating/TopRating';
import UpcommingMovies from './../Components/Movies/Upcoming/UpcomingMovies';

export default function Home() {
  return (
    <>
      <div className="min-h-screen text-white bg-black">
        <HeroSection />
      </div>
      <div className="container mx-auto">
        <Movies />
        <PopularMovies />
        <TopRatingMovies />
        <UpcommingMovies />
      </div>
    </>
  );
}
