import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, ShoppingBag, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { totalQuantity, openCartDrawer } = useCart();

  useEffect(() => {
    onClose();
  }, [location.pathname]);

  const scrollToWhatIsMute = () => {
    onClose();
    const el = document.getElementById('what-is-mute');
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      window.location.href = '/#what-is-mute';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-[#050607]/95 backdrop-blur-xl flex flex-col justify-between p-6 sm:p-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#1A1E23] pb-6">
            <Link to="/" onClick={onClose} className="flex items-center gap-3">
              <img
                src="/mute-logo.svg"
                alt="MUTE Logo"
                className="h-7 w-7 border border-[#20242A] shadow-md object-contain"
              />
              <span className="font-display font-black text-xl tracking-[0.25em] text-[#F3F3F0]">
                MUTE
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#8E9399]" />
            </Link>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={onClose}
                className="text-[#8E9399] hover:text-[#F3F3F0] p-2 transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="py-8 flex-1 flex flex-col justify-center space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05, duration: 0.35 }}
            >
              <button
                type="button"
                onClick={scrollToWhatIsMute}
                className="group w-full text-left block py-2 border-b border-[#14171A] hover:border-[#2A2F36] transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-mono text-[10px] text-[#8E9399] tracking-widest uppercase mb-1">
                      01
                    </p>
                    <h3 className="text-2xl font-light tracking-[0.1em] text-[#F3F3F0] group-hover:text-white transition-colors">
                      What is MUTE
                    </h3>
                  </div>
                  <ArrowRight size={18} className="text-[#8E9399] group-hover:text-[#F3F3F0] group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-xs text-[#8E9399] mt-1 font-light">The Anti-Energy Philosophy</p>
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.35 }}
            >
              <Link
                to="/contact"
                onClick={onClose}
                className="group block py-2 border-b border-[#14171A] hover:border-[#2A2F36] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-mono text-[10px] text-[#8E9399] tracking-widest uppercase mb-1">
                      02
                    </p>
                    <h3 className="text-2xl font-light tracking-[0.1em] text-[#F3F3F0] group-hover:text-white transition-colors">
                      Contact Concierge
                    </h3>
                  </div>
                  <ArrowRight size={18} className="text-[#8E9399] group-hover:text-[#F3F3F0] group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-xs text-[#8E9399] mt-1 font-light">24-Hour Calm Support</p>
              </Link>
            </motion.div>
          </div>

          {/* Footer Actions */}
          <div className="border-t border-[#1A1E23] pt-6 flex items-center justify-between">
            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/account"
                  onClick={onClose}
                  className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#F3F3F0]"
                >
                  <User size={16} />
                  <span>My Account</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    onClose();
                  }}
                  className="text-xs text-[#8E9399] hover:text-white uppercase tracking-wider ml-4"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={onClose}
                className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#F3F3F0] hover:text-white"
              >
                <User size={16} />
                <span>Sign In / Join</span>
              </Link>
            )}

            <button
              type="button"
              onClick={() => {
                onClose();
                openCartDrawer();
              }}
              className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#F3F3F0] bg-[#14171A] px-4 py-2 border border-[#2A2F36]"
            >
              <ShoppingBag size={14} />
              <span>Cart ({totalQuantity})</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
