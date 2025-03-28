
import React from 'react';
import { useAnimationOnScroll } from '@/hooks/useAnimationOnScroll';
import { cn } from '@/lib/utils';

interface MethodologyCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

const MethodologyCard: React.FC<MethodologyCardProps> = ({ title, description, icon, index }) => {
  const { ref, classes } = useAnimationOnScroll<HTMLDivElement>({
    transitionType: index % 2 === 0 ? 'fade-in-left' : 'fade-in-right',
    delay: ((index % 3) + 1) as 1 | 2 | 3,
    threshold: 0.1,
  });

  return (
    <div 
      ref={ref}
      className={cn(
        classes,
        "glass-card rounded-2xl p-6 flex gap-5 transition-all duration-300 hover:shadow-xl group"
      )}
    >
      <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-foreground/70 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default MethodologyCard;
