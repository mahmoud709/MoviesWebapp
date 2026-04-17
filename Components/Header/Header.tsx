"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Film, Menu, Search, Tv, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { tmdbUrl, ImageBaseUrl } from "../../lib/tmdb";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [queryTerm, setQueryTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const navLinks = [
    { href: "/", name: "Home", match: "/" },
    { href: "/#trending-movies", name: "Trending", match: "/t" },
    { href: "/#popular-movies", name: "Popular", match: "/h" },
    { href: "/top-rated", name: "Top Rated", match: "/op-rated" },
    { href: "/up-coming-movies", name: "Upcoming", match: "/up-coming-movies" },
    { href: "/tv-series", name: "Series", match: "/tv-series" },
  ];



  const handleClear = () => {
    setQueryTerm("");
    setResults([]);
  };

  const isLinkActive = (match: string) => {
    return pathname === match;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(queryTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [queryTerm]);

  useEffect(() => {
    if (!debouncedTerm) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    const fetchResults = async () => {
      setIsSearching(true);
      try {
        const url = tmdbUrl(`/search/multi?query=${encodeURIComponent(debouncedTerm)}&include_adult=false`);
        const res = await fetch(url);
        const data = await res.json();
        const validResults = data.results?.filter((item: any) => item.media_type === "movie" || item.media_type === "tv").slice(0, 8) || [];
        setResults(validResults);
      } catch (error) {
        console.error(error);
      } finally {
        setIsSearching(false);
      }
    };
    
    fetchResults();
  }, [debouncedTerm]);

  const handleResultClick = (item: any) => {
    setQueryTerm("");
    setResults([]);
    setIsMenuOpen(false);
    if (item.media_type === "movie") {
      router.push(`/movie/${item.id}`);
    } else if (item.media_type === "tv") {
      router.push(`/tv-series/${item.id}`);
    }
  };

  const renderSearchResults = () => {
    if (!queryTerm) return null;
    
    return (
      <AnimatePresence>
        {queryTerm && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute left-0 right-0 top-[110%] z-50 max-h-[70vh] w-full overflow-y-auto rounded-2xl border border-white/10 bg-[rgba(10,10,12,0.95)] p-2 shadow-2xl backdrop-blur-xl"
          >
            {isSearching ? (
              <div className="p-4 text-center text-sm text-white/50">Searching...</div>
            ) : results.length > 0 ? (
              <div className="flex flex-col gap-1">
                {results.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleResultClick(item)}
                    className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition hover:bg-white/10"
                  >
                    {item.poster_path ? (
                      <img
                        src={`${ImageBaseUrl}${item.poster_path}`}
                        alt={item.title || item.name}
                        className="h-14 w-10 flex-shrink-0 object-cover rounded-md"
                      />
                    ) : (
                      <div className="flex h-14 w-10 flex-shrink-0 items-center justify-center rounded-md bg-white/10 text-white/50">
                        <Film className="h-4 w-4" />
                      </div>
                    )}
                    <div className="flex flex-col overflow-hidden">
                      <span className="truncate text-sm font-medium text-white">
                        {item.title || item.name}
                      </span>
                      <span className="text-xs text-white/50 capitalize flex items-center gap-1">
                        {item.media_type === "movie" ? <Film className="h-3 w-3" /> : <Tv className="h-3 w-3" />}
                        {item.media_type} • {item.release_date ? item.release_date.split('-')[0] : (item.first_air_date ? item.first_air_date.split('-')[0] : 'N/A')}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-sm text-white/50">No results found</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 w-full px-4 py-3 text-white md:px-8 xl:px-16"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/45 px-4 py-3 shadow-2xl shadow-black/30 backdrop-blur-xl md:px-6">

        {/* Logo + Hamburger Row */}
        <div className="flex w-full items-center justify-between md:w-auto">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-yellow-400 via-amber-500 to-orange-500 text-black shadow-lg shadow-amber-500/25">
              <Film className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <span className="block text-xl font-black tracking-tight text-yellow-300 md:text-2xl">
                Movies Hub
              </span>
            </div>
          </Link>
          <motion.button
            onClick={() => setIsMenuOpen((value) => !value)}
            className="cursor-pointer rounded-xl border border-white/10 bg-white/5 p-2 text-white hover:bg-white/10 md:hidden"
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>

        {/* Desktop Search Bar */}
        <div className="relative hidden w-full max-w-sm md:mx-6 md:block">
          <input
            type="text"
            autoComplete="off"
            placeholder="Search movies and series..."
            value={queryTerm}
            onChange={(e) => setQueryTerm(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/8 py-2.5 pl-11 pr-10 text-sm text-white placeholder:text-white/45 focus:outline-none"
          />
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/45" />
          {queryTerm ? (
            <button
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-white/45 transition hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
          {renderSearchResults()}
        </div>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-2 md:flex">
          {navLinks.map((el) => (
            <Link
              key={el.name}
              href={el.href}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition ${isLinkActive(el.match)
                ? "bg-yellow-400 text-black"
                : "text-white/80 hover:bg-white/8 hover:text-white"
                }`}
            >
              {el.name}
            </Link>
          ))}
          {/* <Link
            href="/tv-series"
            className="ml-2 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:bg-cyan-400/20"
          >
            <Tv className="h-4 w-4" />
            Series Page
          </Link> */}
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="absolute left-4 right-4 top-[calc(100%+0.75rem)] z-50 flex flex-col gap-4 rounded-2xl border border-white/10 bg-[rgba(10,10,12,0.92)] p-4 shadow-2xl shadow-black/40 backdrop-blur-xl md:hidden"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Mobile Search */}
              <div className="relative w-full">
                <input
                  type="text"
                  autoComplete="off"
                  value={queryTerm}
                  onChange={(e) => setQueryTerm(e.target.value)}
                  placeholder="Search movies and series..."
                  className="w-full rounded-2xl border border-white/10 bg-white/8 py-2.5 pl-11 pr-10 text-sm text-white placeholder:text-white/45 focus:outline-none"
                />
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/45" />
                {queryTerm ? (
                  <button
                    onClick={handleClear}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-white/45 transition hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                ) : null}
                {renderSearchResults()}
              </div>

              {/* Mobile Nav Links */}
              <nav className="flex flex-col gap-2">
                {navLinks.map((el) => (
                  <Link
                    key={el.name}
                    href={el.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${isLinkActive(el.match)
                      ? "bg-yellow-400 text-black"
                      : "bg-white/5 text-white hover:bg-white/10"
                      }`}
                  >
                    {el.name}
                  </Link>
                ))}
                <Link
                  href="/tv-series"
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-3 text-sm font-medium text-cyan-200"
                >
                  <Tv className="h-4 w-4" />
                  Open Series Page
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
