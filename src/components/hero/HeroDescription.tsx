
import React from 'react';
import { cn } from '@/lib/utils';
import { useAnimationOnScroll } from '@/hooks/useAnimationOnScroll';

interface HeroDescriptionProps {
  className?: string;
}

const HeroDescription: React.FC<HeroDescriptionProps> = ({ className }) => {
  const { ref, classes } = useAnimationOnScroll<HTMLDivElement>({
    transitionType: 'fade-in',
    delay: 1,
    threshold: 0.1,
  });

  return (
    <div 
      ref={ref}
      className={cn(
        classes,
        "text-lg md:text-xl text-foreground/70",
        className
      )}
    >
      <p>
        Sistema automatizado para apuração e recuperação de créditos tributários, garantindo conformidade e otimizando sua gestão fiscal.
      </p>
    </div>
  );
};

export default React.memo(HeroDescription);
