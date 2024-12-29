// src/hooks/useProjectBackground.ts
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface UseProjectBackgroundProps {
  fromColor: string;
  toColor: string;
  contentRef: React.RefObject<HTMLDivElement>;
  containerRef: React.RefObject<HTMLDivElement>;
  backgroundRef: React.RefObject<HTMLDivElement>;
}

export const useProjectBackground = ({
  fromColor,
  toColor,
  contentRef,
  containerRef,
  backgroundRef,
}: UseProjectBackgroundProps) => {
  // Store the last animation frame request
  const animationFrame = useRef<number>();
  
  useEffect(() => {
    if (!contentRef.current || !containerRef.current || !backgroundRef.current) return;
    
    const content = contentRef.current;
    const background = backgroundRef.current;

    // Set initial gradient
    background.style.setProperty('--gradient-stop', '50%');
    background.style.background = `linear-gradient(to bottom, ${fromColor} 0%, ${toColor} var(--gradient-stop), ${toColor} 100%)`;

    const updateGradient = () => {
      // Calculate how far we've scrolled as a percentage
      const scrollPercent = (content.scrollTop / (content.scrollHeight - content.clientHeight)) * 100;
      
      // As we scroll down, the gradient stop should move up, transitioning to the bottom color
      const gradientStop = Math.min(50, Math.max(0, 50 - (scrollPercent * 1.5)));
      
      // Update the gradient
      gsap.to(background, {
        duration: 0.2,
        '--gradient-stop': `${gradientStop}%`,
        overwrite: true
      });
    };

    const onScroll = () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      animationFrame.current = requestAnimationFrame(updateGradient);
    };

    content.addEventListener('scroll', onScroll);
    
    // Initial update
    updateGradient();
    
    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      content.removeEventListener('scroll', onScroll);
    };
  }, [fromColor, toColor, contentRef, containerRef, backgroundRef]);
};