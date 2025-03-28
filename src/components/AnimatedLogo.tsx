
import React from 'react';
import LogoContainer from './animated-logo/LogoContainer';
import LogoText from './animated-logo/LogoText';
import IconRotator from './animated-logo/IconRotator';

export interface AnimatedLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  showText?: boolean;
  className?: string;
  hovering?: boolean; // Add the missing hovering prop
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({
  size = 'md',
  color,
  showText = true,
  className,
  hovering = false // Set a default value
}) => {
  const sizeMap = {
    sm: {
      container: 'h-8',
      iconClass: 'h-6 w-6',
      textClass: 'text-sm'
    },
    md: {
      container: 'h-10',
      iconClass: 'h-7 w-7',
      textClass: 'text-base'
    },
    lg: {
      container: 'h-12',
      iconClass: 'h-8 w-8',
      textClass: 'text-lg'
    },
    xl: {
      container: 'h-16',
      iconClass: 'h-10 w-10',
      textClass: 'text-xl'
    }
  };
  
  const { container, iconClass, textClass } = sizeMap[size];
  
  return (
    <div className={`flex items-center space-x-2 ${className || ''}`}>
      <LogoContainer containerSize={container}>
        <IconRotator className={iconClass} color={color} rotating={hovering} />
      </LogoContainer>
      
      {showText && <LogoText className={textClass} color={color} />}
    </div>
  );
};

export default AnimatedLogo;
