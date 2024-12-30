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
  console.log('Background Hook Props:', { fromColor, toColor });

  // Store the last animation frame request
  const animationFrame = useRef<number>();
  
  useEffect(() => {
    if (!contentRef.current || !containerRef.current || !backgroundRef.current) return;
    
    console.log('Background Refs:', { 
      content: !!contentRef.current, 
      container: !!containerRef.current, 
      background: !!backgroundRef.current 
    });

    const content = contentRef.current;
    const background = backgroundRef.current;

    // Set initial gradient
    background.style.setProperty('--gradient-stop', '50%');
    background.style.background = `linear-gradient(to bottom, ${fromColor} 0%, ${toColor} var(--gradient-stop), ${toColor} 100%)`;
    
    console.log('Initial Background Style:', {
      gradientStop: background.style.getPropertyValue('--gradient-stop'),
      background: background.style.background
    });

    const updateGradient = () => {
      // Add safety checks for dimensions
      const scrollHeight = content.scrollHeight || 0;
      const clientHeight = content.clientHeight || 0;
      const heightDiff = scrollHeight - clientHeight;
      
      // Avoid division by zero and ensure valid calculations
      const scrollPercent = heightDiff > 0 ? (content.scrollTop / heightDiff) * 100 : 0;
      
      // As we scroll down, the gradient stop should move up, transitioning to the bottom color
      const gradientStop = Math.min(50, Math.max(0, 50 - (scrollPercent * 1.5)));
      
      console.log('Gradient Update:', {
        scrollHeight,
        clientHeight,
        heightDiff,
        scrollPercent,
        gradientStop,
        background: background.style.background
      });

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
    
    // Initial update with a small delay to ensure content is rendered
    setTimeout(updateGradient, 50);
    
    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      content.removeEventListener('scroll', onScroll);
    };
  }, [fromColor, toColor, contentRef, containerRef, backgroundRef]);
};