import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

interface PageTransitionProps {
  children: React.ReactNode;
  viewKey: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children, viewKey }) => {
  const { reducedMotion } = useTheme();

  if (reducedMotion) {
    return <div className="w-full">{children}</div>;
  }

  return (
    <motion.div
      key={viewKey}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};
