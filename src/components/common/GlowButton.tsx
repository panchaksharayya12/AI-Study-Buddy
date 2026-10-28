import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { playClickSound } from '../../utils/sound';

interface GlowButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'meadow' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const GlowButton: React.FC<GlowButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  children,
  className = '',
  onClick,
  disabled,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && !isLoading) {
      playClickSound();
      onClick?.(e);
    }
  };

  const sizeClasses = {
    sm: 'px-4 py-1.5 text-xs rounded-full font-medium gap-1.5',
    md: 'px-6 py-2.5 text-sm rounded-full font-medium gap-2',
    lg: 'px-8 py-3.5 text-base rounded-full font-medium gap-2.5',
  };

  const variantClasses = {
    primary: `
      bg-[#000000] text-[#FFFFFF] shadow-sm
      hover:scale-[1.03] active:scale-[0.98]
    `,
    secondary: `
      bg-black/[0.05] text-[#000000] border border-black/10
      hover:bg-black/[0.08] hover:scale-[1.02] active:scale-[0.98]
    `,
    meadow: `
      bg-[#5B875C] text-white shadow-sm
      hover:bg-[#4E764F] hover:scale-[1.03] active:scale-[0.98]
    `,
    outline: `
      bg-transparent text-[#000000] border border-black/20
      hover:border-black hover:bg-black/[0.03]
    `,
    ghost: `
      bg-transparent text-[#6F6F6F] hover:text-[#000000]
      hover:bg-black/[0.04]
    `,
    danger: `
      bg-rose-50 text-rose-700 border border-rose-200
      hover:bg-rose-100
    `,
  };

  return (
    <motion.button
      whileTap={!disabled && !isLoading ? { scale: 0.98 } : undefined}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={`
        relative inline-flex items-center justify-center select-none font-sans
        transition-all duration-200 focus:outline-none focus-visible:ring-2
        focus-visible:ring-black focus-visible:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        icon && <span className="inline-flex shrink-0">{icon}</span>
      )}
      <span>{children}</span>
    </motion.button>
  );
};
