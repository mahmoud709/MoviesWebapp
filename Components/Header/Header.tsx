"use client"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from 'framer-motion';
import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [queryTerm, setQueryTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navLinks = [
    { href: '/', name: 'Home' },
    { href: '/movies', name: 'Movies' },
    { href: '/tv-series', name: 'Tv Series' },
  ];

  const fetchSuggestion = async (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      setIsSearchOpen(false);
      return;
    }
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    try {
      setIsLoading(true);
      const url = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${encodeURIComponent(query)}`;
      const res = await fetch(url, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        const filtered = data?.results?.filter(
          (item) => item.media_type === 'movie' || item.media_type === 'tv'
        ).slice(0, 8) || [];
        setSuggestions(filtered);
        setIsSearchOpen(true); // ✅ always open after fetch
      } else {
        setSuggestions([]);
      }
    } catch (err) {
      console.log('error ', err);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQueryTerm(value);
    // fetchSuggestion(value);
  };

  const handleClear = () => {
    setQueryTerm("");
    setSuggestions([]);
    setIsSearchOpen(false);
  };

  // ✅ Reusable suggestion dropdown component
  const SuggestionDropdown = () => (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          className="absolute top-full mt-1 w-full bg-[#18181b] border border-gray-500 rounded-lg z-50 overflow-hidden"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }} // ✅ was exit={{ opacity: 1, y: 0 }} — bug fixed
          transition={{ duration: .2 }}
        >
          {suggestions.length > 0 ? (
            suggestions.map((item) => (
              <Link key={item?.id} href={'/'} onClick={handleClear}>
                <div className="flex items-center gap-2 p-2 rounded-md hover:bg-[#252525]">
                  <Image
                    width={48}
                    height={32}
                    className="w-8 aspect-[2/3] object-cover rounded"
                    src={item?.poster_path
                      ? `https://image.tmdb.org/t/p/w500${item?.poster_path}`
                      : "/default_poster.jpg"}
                    alt=""
                  />
                  <div className="flex-1">
                    <h3 className="text-sm line-clamp-2 text-white">
                      {item?.title || item?.name || 'N/A'}
                    </h3>
                    <p className="text-xs text-gray-400">
                      {(item?.first_air_date || item?.release_date)?.split('-')[0] || 'N/A'}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-gray-400 text-sm p-2 text-center">No Results Found</div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Reusable search icon/spinner/clear button
  const SearchIcon = () => (
    <button
      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
      onClick={() => {
        if (isSearchOpen) {
          handleClear(); // X button clears results
        } else {
          fetchSuggestion(queryTerm); // ✅ fetch only on click
        }
      }}
    >
      {isLoading
        ? <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
        : isSearchOpen && suggestions.length > 0
          ? <X className="w-5 h-5 text-gray-500" />
          : <Search className="w-5 h-5 text-gray-500" />
      }
    </button>
  );


  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: .5 }}
      className="bg-transparent text-white w-full py-2 z-50 px-4 md:px-10 xl:px-36 absolute top-0 left-0"
    >
      <div className="flex md:flex-row md:items-center md:justify-between gap-4">

        {/* Logo + Hamburger Row */}
        <div className="flex justify-between items-center w-full md:w-auto">
          <Link href='/' className="flex flex-col items-center">
            <span className="text-yellow-400 lg:text-3xl md:text-xl text-2xl font-bold">Movies</span>
            <span className="text-xs lg:text-base text-white text-center">Movies and TV Series</span>
          </Link>
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-white/80 cursor-pointer"
            whileTap={{ scale: .9 }}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Desktop Search Bar */}
        <div className="relative w-full md:w-1/3 hidden md:mx-8 md:block">
          <input
            type="text"
            autoComplete="off"
            placeholder="Search for a movie, tv, show..."
            value={queryTerm}
            onChange={handleInputChange} // shared handler
            className="px-4 py-1.5 w-full lg:py-2 bg-white text-sm text-gray-500 focus:outline-0 border border-gray-500 rounded-xl placeholder:text-gray-500 pr-10"
          />
          <SearchIcon />
          <SuggestionDropdown /> {/* dropdown here for desktop */}
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex md:items-center md:space-x-6">
          {navLinks.map((el) => (
            <Link
              key={el.name}
              href={el.href}
              className={`text-xs sm:text-base font-medium relative text-white ${pathname === el.href ? 'text-white' : 'hover:text-white/80'}`}
            >
              {el.name}
              {pathname === el.href && (
                <motion.span
                  className="absolute bottom-0 right-0 left-0 bg-yellow-400 h-0.5"
                  layoutId="desktop-underline"
                  transition={{ duration: .3 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden backdrop-blur-sm bg-[rgba(24,24,27,.6)] z-50 absolute left-0 top-full w-full p-4 flex flex-col gap-4"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: .3 }}
            >
              {/* Mobile Search */}
              <div className="relative w-full">
                <input
                  type="text"
                  autoComplete="off"
                  value={queryTerm}
                  onChange={handleInputChange} // was missing fetchSuggestion call
                  placeholder="Search for a movie, tv, show..."
                  className="px-4 py-1.5 w-full bg-white text-sm text-gray-500 focus:outline-0 border border-gray-500 rounded-xl placeholder:text-gray-500 pr-10"
                />
                <SearchIcon />
                <SuggestionDropdown /> {/* dropdown here for mobile */}
              </div>

              {/* Mobile Nav Links */}
              <nav className="flex flex-col items-center gap-3">
                {navLinks.map((el) => (
                  <Link
                    key={el.name}
                    href={el.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-sm font-medium relative text-white ${pathname === el.href ? 'text-yellow-400' : 'hover:text-white/80'}`}
                  >
                    {el.name}
                    {pathname === el.href && (
                      <motion.span
                        className="absolute bottom-0 right-0 left-0 bg-yellow-400 h-0.5"
                        layoutId="mobile-underline"
                        transition={{ duration: .3 }}
                      />
                    )}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}