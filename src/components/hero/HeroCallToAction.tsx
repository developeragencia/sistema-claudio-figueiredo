
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import { Link  } from "@/hooks/use-router";
import { ArrowRight } from 'lucide-react';
import { useAnimationOnScroll } from '@/hooks/useAnimationOnScroll';

interface HeroCallToActionProps {
  className?: string;
}

const HeroCallToAction: React.FC<HeroCallToActionProps> = ({ className }) => {
  const { ref, classes } = useAnimationOnScroll<HTMLDivElement>({
    transitionType: 'fade-in',
    delay: 2,
    threshold: 0.1,
  });

  return (
    <div 
      ref={ref}
      className={cn(
        classes,
        "flex flex-col sm:flex-row gap-4 pt-4 items-center",
        className
      )}
    >
      <Button size="lg" asChild className="relative overflow-hidden group">
        <Link to="/login">
          Acessar Sistemas
          <span className="absolute right-4 group-hover:translate-x-1 transition-transform">
            <ArrowRight size={18} />
          </span>
        </Link>
      </Button>
    </div>
  );
};

export default React.memo(HeroCallToAction);
