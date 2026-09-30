import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';

  const handleAboutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isHome) {
      const el = document.getElementById('what-is-mute');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById('what-is-mute');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${isScrolled || !isHome
        ? 'bg-[#050607]/90 backdrop-blur-md border-b border-[#1A1E23] py-4 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
        : 'bg-transparent py-6'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          className="group flex items-center gap-3 focus:outline-none"
          aria-label="MUTE Home"
        >
          <img
            src="/mute-logo.svg"
            alt="MUTE Logo"
            className="h-7 w-7 sm:h-8 sm:w-8 border border-[#20242A] group-hover:border-[#383E47] transition-all duration-300 shadow-md object-contain"
          />
          <span className="font-display font-black text-xl sm:text-2xl tracking-[0.25em] text-[#F3F3F0] transition-colors group-hover:text-white uppercase">
            MUTE
          </span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#8E9399] group-hover:bg-[#F3F3F0] transition-colors" />
        </Link>

        {/* Navigation Items */}
        <nav className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleAboutClick}
            className="font-mono text-[11px] sm:text-xs tracking-[0.2em] uppercase px-4 py-2 border transition-all duration-300 text-[#8E9399] border-[#20242A] bg-[#0A0C0E]/70 hover:text-[#F3F3F0] hover:border-[#383E47] hover:bg-[#14171A] cursor-pointer focus:outline-none"
          >
            ABOUT MUTE
          </button>
        </nav>
      </div>
    </header>
  );
};
