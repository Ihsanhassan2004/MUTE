import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, User, Volume2, VolumeX, Menu } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useSound } from '../../context/SoundContext';
import { MobileMenu } from './MobileMenu';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { totalQuantity, openCartDrawer } = useCart();
  const { user } = useAuth();
  const { isPlaying, toggleSound } = useSound();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';

  return (
    <>
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

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-10">
            <Link
              to="/shop"
              className={`text-xs uppercase tracking-[0.2em] transition-colors font-medium hover:text-[#F3F3F0] ${
                location.pathname === '/shop' ? 'text-[#F3F3F0] border-b border-[#F3F3F0] pb-0.5' : 'text-[#8E9399]'
              }`}
            >
              Shop
            </Link>
            <Link
              to="/about"
              className={`text-xs uppercase tracking-[0.2em] transition-colors font-medium hover:text-[#F3F3F0] ${
                location.pathname === '/about' ? 'text-[#F3F3F0] border-b border-[#F3F3F0] pb-0.5' : 'text-[#8E9399]'
              }`}
            >
              Why MUTE
            </Link>
            <Link
              to="/faq"
              className={`text-xs uppercase tracking-[0.2em] transition-colors font-medium hover:text-[#F3F3F0] ${
                location.pathname === '/faq' ? 'text-[#F3F3F0] border-b border-[#F3F3F0] pb-0.5' : 'text-[#8E9399]'
              }`}
            >
              System FAQ
            </Link>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-5 sm:space-x-7">
            {/* Ambient Detox Sound Toggle */}
            <button
              type="button"
              onClick={toggleSound}
              className="text-[#8E9399] hover:text-[#F3F3F0] transition-colors relative p-1.5 focus:outline-none"
              title={isPlaying ? 'Mute ambient sound' : 'Unmute calm ambient sound'}
              aria-label={isPlaying ? 'Mute ambient sound' : 'Unmute calm ambient sound'}
            >
              {isPlaying ? (
                <div className="relative flex items-center justify-center">
                  <Volume2 size={17} className="text-[#F3F3F0]" />
                  <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                </div>
              ) : (
                <VolumeX size={17} />
              )}
            </button>

            {/* Account Link */}
            <Link
              to={user ? '/account' : '/login'}
              className="text-[#8E9399] hover:text-[#F3F3F0] transition-colors p-1.5 focus:outline-none flex items-center gap-2"
              aria-label={user ? 'User Account' : 'Sign In'}
            >
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'Account'}
                  className="w-5 h-5 rounded-full object-cover border border-[#2A2F36]"
                />
              ) : (
                <User size={17} />
              )}
              {user && (
                <span className="hidden lg:inline text-[11px] font-mono text-[#8E9399] tracking-wider uppercase truncate max-w-[80px]">
                  {user.displayName?.split(' ')[0] || 'Member'}
                </span>
              )}
            </Link>

            {/* Cart Icon & Badge */}
            <button
              type="button"
              onClick={openCartDrawer}
              className="relative text-[#8E9399] hover:text-[#F3F3F0] transition-colors p-1.5 focus:outline-none flex items-center gap-2 group"
              aria-label={`Open shopping cart with ${totalQuantity} items`}
            >
              <ShoppingBag size={17} className="group-hover:scale-105 transition-transform" />
              {totalQuantity > 0 && (
                <span className="font-mono text-[10px] bg-[#F3F3F0] text-[#050607] font-semibold w-4 h-4 rounded-full flex items-center justify-center -ml-1">
                  {totalQuantity}
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-[#8E9399] hover:text-[#F3F3F0] p-1.5 focus:outline-none"
              aria-label="Open navigation menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};
