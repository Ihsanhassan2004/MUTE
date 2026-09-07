import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled || !isHome
          ? 'bg-[#050607]/90 backdrop-blur-md border-b border-[#1A1E23] py-4 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          className="group flex items-center gap-2 focus:outline-none"
          aria-label="MUTE Home"
        >
          <span className="font-display font-black text-xl sm:text-2xl tracking-[0.25em] text-[#F3F3F0] transition-colors group-hover:text-white uppercase">
            MUTE
          </span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#8E9399] group-hover:bg-[#F3F3F0] transition-colors" />
        </Link>
      </div>
    </header>
  );
};
