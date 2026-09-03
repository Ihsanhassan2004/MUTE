import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'text';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  iconPosition = 'right',
  loading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'relative inline-flex items-center justify-center font-medium transition-all duration-300 tracking-wider uppercase disabled:opacity-40 disabled:cursor-not-allowed group select-none text-xs';

  const sizeStyles = {
    sm: 'px-4 py-2.5 text-[11px] gap-2',
    md: 'px-6 py-3.5 text-xs gap-2.5',
    lg: 'px-8 py-4 text-xs gap-3',
  };

  const variantStyles = {
    primary:
      'bg-[#F3F3F0] text-[#050607] hover:bg-white hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] active:scale-[0.98]',
    secondary:
      'bg-[#181B1F] text-[#F3F3F0] border border-[#2A2F36] hover:border-[#F3F3F0]/40 hover:bg-[#20242A] active:scale-[0.98]',
    outline:
      'bg-transparent text-[#F3F3F0] border border-[#383D45] hover:border-[#F3F3F0] hover:bg-white/[0.04] active:scale-[0.98]',
    ghost:
      'bg-transparent text-[#8E9399] hover:text-[#F3F3F0] hover:bg-white/[0.03]',
    text:
      'bg-transparent text-[#F3F3F0] p-0 hover:text-white underline-offset-8 hover:underline tracking-widest',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <span className="transition-transform duration-300 group-hover:-translate-x-0.5">
              {icon}
            </span>
          )}
          <span>{children}</span>
          {icon && iconPosition === 'right' && (
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              {icon}
            </span>
          )}
        </>
      )}
    </button>
  );
};
