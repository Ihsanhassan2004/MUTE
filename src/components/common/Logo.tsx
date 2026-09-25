import React from 'react';

interface LogoProps {
  variant?: 'badge' | 'text' | 'image' | 'horizontal';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showDot?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'badge',
  className = '',
  size = 'md',
  showDot = false,
}) => {
  const sizeMap = {
    sm: 'h-6',
    md: 'h-8 sm:h-9',
    lg: 'h-10 sm:h-12',
    xl: 'h-14 sm:h-16',
  };

  if (variant === 'image') {
    return (
      <img
        src="/mute-logo.svg"
        alt="MUTE Logo"
        className={`${sizeMap[size]} w-auto object-contain transition-transform duration-300 ${className}`}
      />
    );
  }

  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center gap-2.5 ${className}`}>
        <div className="relative flex items-center justify-center bg-black border border-[#20242A] px-3.5 py-1.5 shadow-[0_2px_10px_rgba(0,0,0,0.8)] transition-all duration-300 group-hover:border-[#383E47] group-hover:shadow-[0_0_15px_rgba(255,255,255,0.06)]">
          <span className="font-display font-black text-sm sm:text-base tracking-[0.28em] text-[#FFFFFF] uppercase select-none">
            MUTE
          </span>
        </div>
        {showDot && (
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#8E9399] group-hover:bg-[#F3F3F0] transition-colors" />
        )}
      </div>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div className={`inline-flex items-center gap-2 ${className}`}>
        <span className="font-display font-black text-xl sm:text-2xl tracking-[0.25em] text-[#FFFFFF] uppercase transition-colors group-hover:text-white">
          MUTE
        </span>
        {showDot && (
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#8E9399] group-hover:bg-[#F3F3F0] transition-colors" />
        )}
      </div>
    );
  }

  return (
    <span className={`font-display font-black tracking-[0.25em] text-[#FFFFFF] uppercase ${className}`}>
      MUTE
    </span>
  );
};
