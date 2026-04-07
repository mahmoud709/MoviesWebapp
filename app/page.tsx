import HeroSection from "@/Components/Hero/HeroSection";
import Movies from './../Components/Movies/Movies';

export default function Home() {
  return (
    <>
      <div className="min-h-screen text-white bg-black">
        <HeroSection />
      </div>
      <div className="container mx-auto">
        <Movies />
      </div>
    </>
  );
}
