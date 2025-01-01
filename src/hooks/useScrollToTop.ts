// src/hooks/useScrollToTop.ts
import { useCallback } from 'react';
import gsap from 'gsap';

export const useScrollToTop = (containerRef: React.RefObject<HTMLDivElement>) => {
  const scrollToTop = useCallback(() => {
    if (!containerRef.current) return;
    
    gsap.to(containerRef.current, {
      scrollTo: { y: 0 },
      duration: 0.6,
      ease: "power2.out",
    });
  }, [containerRef]);

  return scrollToTop;
};