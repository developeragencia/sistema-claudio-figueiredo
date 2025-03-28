
import React from 'react';
import { cn } from '@/lib/utils';
import { useAnimationOnScroll } from '@/hooks/useAnimationOnScroll';

interface HeroHeadingProps {
  className?: string;
}

const HeroHeading: React.FC<HeroHeadingProps> = ({ className }) => {
  const { ref, classes } = useAnimationOnScroll<HTMLDivElement>({
    transitionType: 'fade-in',
    threshold: 0.1,
  });

  return (
    <div ref={ref} className={cn(classes, className)}>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">
        Recuperação de Créditos <span className="text-primary">IRRF/PJ</span> de Forma Inteligente
      </h1>
    </div>
  );
};

export default React.memo(HeroHeading);
