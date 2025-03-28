
import React from 'react';
import { cn } from '@/lib/utils';
import { useAnimationOnScroll } from '@/hooks/useAnimationOnScroll';
import DashboardCarousel from './DashboardCarousel';

interface DashboardCardProps {
  className?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ className }) => {
  const { ref, classes } = useAnimationOnScroll<HTMLDivElement>({
    transitionType: 'fade-in-right',
    delay: 3,
    threshold: 0.1,
  });

  return (
    <div 
      ref={ref}
      className={cn(
        classes,
        "relative",
        className
      )}
    >
      <div className="relative">
        <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-br from-primary/20 via-primary/30 to-primary/10 blur-xl opacity-70 animate-subtle-pulse"></div>
        <div className="relative glass-card rounded-3xl p-8 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary/40 via-primary to-primary/40"></div>
          
          <DashboardCarousel />
        </div>
      </div>
    </div>
  );
};

export default React.memo(DashboardCard);
