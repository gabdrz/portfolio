// src/hooks/useProjectBackground.ts
import { useEffect, useRef } from 'react';

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
  const animationFrame = useRef<number>();
  
  useEffect(() => {
    if (!contentRef.current || !containerRef.current || !backgroundRef.current) return;
    
    const content = contentRef.current;
    const background = backgroundRef.current;

    // Set initial gradient stops
    background.style.setProperty('--gradient-top', '20%');
    background.style.setProperty('--gradient-bottom', '80%');
    
    const updateGradient = () => {
      const scrollHeight = content.scrollHeight || 0;
      const clientHeight = content.clientHeight || 0;
      const heightDiff = scrollHeight - clientHeight;
      
      // Calculate scroll percentage (0 to 100)
      const scrollPercent = heightDiff > 0 ? (content.scrollTop / heightDiff) * 100 : 0;
      
      // Calculate gradient positions
      // Top gradient disappears as we scroll down (0-20%)
      const topGradientEnd = Math.max(0, 20 - scrollPercent);
      
      // Bottom gradient appears as we approach the end (80-100%)
      const bottomGradientStart = Math.min(100, 80 + (scrollPercent - 80));

      // Update the background gradient
      background.style.background = `
        linear-gradient(
          to bottom,
          ${fromColor} 0%,
          ${toColor} ${topGradientEnd}%,
          ${toColor} ${bottomGradientStart}%,
          ${fromColor} 100%
        )
      `;
    };

    const onScroll = () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      animationFrame.current = requestAnimationFrame(updateGradient);
    };

    content.addEventListener('scroll', onScroll);
    
    // Initial update
    setTimeout(updateGradient, 50);
    
    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      content.removeEventListener('scroll', onScroll);
    };
  }, [fromColor, toColor, contentRef, containerRef, backgroundRef]);
};