// New file: src/hooks/useHoverAnimation.ts
import { useEffect } from 'react';
import gsap from 'gsap';

// src/hooks/useHoverAnimation.ts
interface AnimationProps {
    [key: string]: {
      value: number | string;
      reset: number | string;
    };
  }
  
  export const useHoverAnimation = (
    ref: React.RefObject<HTMLElement>,
    props: AnimationProps
  ) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseEnter = () => {
      gsap.to(element, {
        ...props,
        duration: 0.2,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        ...props.reset,
        duration: 0.2,
        ease: 'power2.out'
      });
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref, props]);
};