import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  hoverEffect = true,
  ...props
}) => {
  return (
    <motion.div
      whileHover={
        hoverEffect
          ? {
              y: -3,
              transition: { duration: 0.22, ease: 'easeOut' },
            }
          : undefined
      }
      className={`
        relative overflow-hidden rounded-2xl bg-white
        border border-black/[0.07]
        shadow-[0_8px_30px_rgba(28,70,120,0.05)]
        transition-all duration-300
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
};
