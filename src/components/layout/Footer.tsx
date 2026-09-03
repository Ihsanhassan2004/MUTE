import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 4000);
    }
  };

  return (
    <footer className="bg-[#050607] border-t border-[#14171A] text-[#8E9399] pt-20 pb-12 overflow-hidden relative">
      {/* Subtle background ambient ring */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-white/[0.02] to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-[#14171A]">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-6">
            <Link to="/" className="inline-block">
              <span className="font-display font-black text-3xl sm:text-4xl tracking-[0.3em] text-[#F3F3F0] hover:text-white transition-colors">
                MUTE
              </span>
            </Link>
            <p className="text-sm font-light text-[#8E9399] max-w-sm leading-relaxed">
              The 10-Minute System Shutdown.
              <br />
              Anti-Energy Drink crafted for intentional pause in a hyper-connected world.
            </p>
            <div className="font-mono text-[11px] tracking-widest text-[#6B7280]">
              250 ML / 0G SUGAR / 0MG CAFFEINE / BOTANICALS
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-8">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#F3F3F0] mb-5">
                Explore
              </p>
              <ul className="space-y-3 text-xs tracking-wider uppercase">
                <li>
                  <Link to="/shop" className="hover:text-[#F3F3F0] transition-colors">
                    Shop
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-[#F3F3F0] transition-colors">
                    About MUTE
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="hover:text-[#F3F3F0] transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-[#F3F3F0] transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#F3F3F0] mb-5">
                Legal & Social
              </p>
              <ul className="space-y-3 text-xs tracking-wider uppercase">
                <li>
                  <Link to="/privacy" className="hover:text-[#F3F3F0] transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-[#F3F3F0] transition-colors">
                    Terms
                  </Link>
                </li>
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#F3F3F0] transition-colors"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://tiktok.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#F3F3F0] transition-colors"
                  >
                    TikTok
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-4 space-y-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#F3F3F0]">
              Stay Quiet.
            </p>
            <p className="text-xs text-[#8E9399] font-light leading-relaxed">
              No spam. No hype. No weekly noise. Only rare dispatches when new batch reserves open.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative flex items-center">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="YOUR EMAIL"
                  className="w-full bg-[#0E1012] border border-[#2A2F36] focus:border-[#F3F3F0] px-4 py-3 text-xs text-[#F3F3F0] placeholder-[#4B525D] tracking-wider focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-2 px-3 py-1.5 bg-[#1C2025] hover:bg-[#F3F3F0] text-[#8E9399] hover:text-[#050607] transition-all flex items-center gap-1 text-[11px] font-mono tracking-widest uppercase"
                >
                  {subscribed ? (
                    <>
                      <span>Muted</span>
                      <Check size={12} className="text-emerald-500" />
                    </>
                  ) : (
                    <>
                      <span>Join</span>
                      <ArrowRight size={12} />
                    </>
                  )}
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-emerald-400 font-mono tracking-wide">
                  Welcome to the quiet circle.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono tracking-widest text-[#4B525D]">
          <div>© {new Date().getFullYear()} MUTE BEVERAGES INC. ALL RIGHTS RESERVED.</div>
          <div className="flex items-center gap-6">
            <span>THE 10-MINUTE SYSTEM SHUTDOWN</span>
            <span>•</span>
            <span>LESS NOISE. MORE STILLNESS.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
