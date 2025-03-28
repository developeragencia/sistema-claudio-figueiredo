
import { useIntersectionObserver } from './useIntersectionObserver';
import { cn } from '@/lib/utils';

interface UseAnimationProps {
  baseClasses?: string;
  visibleClasses?: string;
  transitionType?: 'fade-in' | 'fade-in-left' | 'fade-in-right' | 'fade-in-bottom';
  delay?: 0 | 1 | 2 | 3 | 4 | 5;
  threshold?: number;
  rootMargin?: string;
}

export function useAnimationOnScroll<T extends HTMLElement>({
  baseClasses = '',
  visibleClasses = 'visible',
  transitionType = 'fade-in',
  delay = 0,
  threshold = 0.1,
  rootMargin = '0px',
}: UseAnimationProps = {}) {
  const [ref, isVisible] = useIntersectionObserver<T>({
    threshold,
    rootMargin,
  });

  const animationBaseClass = {
    'fade-in': 'animated-element',
    'fade-in-left': 'animated-element-left',
    'fade-in-right': 'animated-element-right',
    'fade-in-bottom': 'animated-element',
  }[transitionType];

  const delayClass = delay ? `staggered-delay-${delay}` : '';

  const classes = cn(
    baseClasses,
    animationBaseClass,
    delayClass,
    isVisible ? visibleClasses : ''
  );

  return { ref, classes };
}
