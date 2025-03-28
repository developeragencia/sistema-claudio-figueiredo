
import { useState, useEffect, useRef, RefObject } from 'react';

interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  onIntersect?: (entries: IntersectionObserverEntry[]) => void;
}

export function useIntersectionObserver<T extends Element>(
  options: IntersectionObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  }
): { ref: RefObject<T>; isVisible: boolean; observer: IntersectionObserver | null } {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);

  useEffect(() => {
    const onIntersect = options.onIntersect || (([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        // Once it's visible, we don't need to observe it anymore
        if (ref.current && observer) observer.unobserve(ref.current);
      }
    });

    // Create observer
    const newObserver = new IntersectionObserver(onIntersect, {
      root: options.root || null,
      rootMargin: options.rootMargin || '0px',
      threshold: options.threshold || 0.1
    });
    
    setObserver(newObserver);

    const currentRef = ref.current;
    if (currentRef) {
      newObserver.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        newObserver.unobserve(currentRef);
      }
      newObserver.disconnect();
    };
  }, [options.root, options.rootMargin, options.threshold, options.onIntersect]);

  return { ref, isVisible, observer };
}
