
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LogoContainer from './LogoContainer';
import IconRotator from './IconRotator';
import LogoText from './LogoText';

interface AnimatedLogoProps {
  size?: 'sm' | 'md' | 'lg';
  hovering?: boolean;
  className?: string;
  textColor?: string;
  iconColor?: string;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({
  size = 'md',
  hovering = false,
  className,
  textColor,
  iconColor,
}) => {
  // Fixed state initialization
  const [isAnimating, setIsAnimating] = useState(hovering);
  
  // Fix the infinite update loop by adding proper dependency array
  // and ensuring we don't set state unnecessarily
  useEffect(() => {
    if (hovering !== isAnimating) {
      setIsAnimating(hovering);
    }
  }, [hovering, isAnimating]); // Add proper dependency array
  
  // Determine size values
  const logoSizes = {
    sm: { container: 'h-8', text: 'text-lg', icon: 'w-6 h-6' },
    md: { container: 'h-10', text: 'text-xl', icon: 'w-8 h-8' },
    lg: { container: 'h-14', text: 'text-2xl', icon: 'w-10 h-10' },
  };
  
  const { container, text, icon } = logoSizes[size];

  return (
    <LogoContainer className={className} containerSize={container}>
      <div className="flex items-center gap-2">
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: isAnimating ? 360 : 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="relative"
        >
          <IconRotator className={icon} color={iconColor} />
        </motion.div>
        
        <LogoText className={text} color={textColor} />
      </div>
    </LogoContainer>
  );
};

export default React.memo(AnimatedLogo);
