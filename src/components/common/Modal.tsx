import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'md',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const maxStyles = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#050607]/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={`relative w-full ${maxStyles[maxWidth]} bg-[#0E1012] border border-[#2A2F36] shadow-2xl p-6 sm:p-8 z-10`}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                {subtitle && (
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[#8E9399] mb-1">
                    {subtitle}
                  </p>
                )}
                {title && (
                  <h3 className="text-base sm:text-lg font-medium tracking-wide uppercase text-[#F3F3F0]">
                    {title}
                  </h3>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="text-[#8E9399] hover:text-[#F3F3F0] p-1 transition-colors"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div>{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
