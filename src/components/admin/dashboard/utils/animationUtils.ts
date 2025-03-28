
import { Variants } from 'framer-motion';

// Container animation variants
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Menu item animation variants
export const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 }
  },
  hover: {
    scale: 1.03,
    boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.2)',
    transition: { duration: 0.3, ease: 'easeOut' }
  }
};

// Shimmer effect
export const shimmerVariants: Variants = {
  initial: { x: '-100%', opacity: 0 },
  animate: { 
    x: '200%', 
    opacity: 0.5,
    transition: { 
      repeat: Infinity, 
      repeatType: "mirror", 
      duration: 2,
      ease: "easeInOut"
    }
  }
};

// Pulse animation for new items
export const pulseVariants: Variants = {
  initial: { scale: 1, opacity: 0.7 },
  animate: { 
    scale: [1, 1.1, 1],
    opacity: [0.7, 1, 0.7],
    transition: { 
      repeat: Infinity,
      repeatType: "loop",
      duration: 2,
      ease: "easeInOut"
    }
  }
};

// Icon animation variants
export const iconAnimationVariants: Variants = {
  initial: { rotate: 0, scale: 1 },
  hover: { 
    rotate: [0, -10, 10, -5, 5, 0],
    scale: [1, 1.1, 1.05, 1.1, 1],
    transition: {
      duration: 0.8,
      ease: "easeInOut",
      times: [0, 0.2, 0.4, 0.6, 0.8, 1],
    }
  }
};
