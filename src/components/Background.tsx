import React, { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';

interface BackgroundProps {
  onAnimationComplete?: () => void;
  fromColor?: string;
  toColor?: string;
  containerRef?: React.RefObject<HTMLDivElement>;
}

const Background = ({ 
  onAnimationComplete,
  fromColor = '#0d1115',
  toColor = '#1a2632',
  containerRef
}: BackgroundProps) => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const hasPlayedRef = useRef(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const animationFrameRef = useRef<number>();
  
  // Stabilize the animation complete callback
  const handleAnimationComplete = useCallback(() => {
    onAnimationComplete?.();
  }, [onAnimationComplete]);

  // Initial load animation
  useEffect(() => {
    const background = backgroundRef.current;
    const gradient = gradientRef.current;
    
    if (!background || !gradient || hasPlayedRef.current) return;

    // Create timeline if it doesn't exist
    if (!timelineRef.current) {
      timelineRef.current = gsap.timeline({
        onComplete: handleAnimationComplete,
        paused: true
      });

      // Set initial states
      gsap.set([background, gradient], {
        opacity: 0
      });

      // Build animation sequence
      timelineRef.current
        .to(background, {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out"
        })
        .to(gradient, {
          opacity: 1,
          duration: 0.8,
          ease: "power2.inOut"
        }, "-=0.3");
    }

    // Play the animation only once
    if (!hasPlayedRef.current) {
      timelineRef.current.play();
      hasPlayedRef.current = true;
    }

    return () => {
      if (!backgroundRef.current && !gradientRef.current) {
        timelineRef.current?.kill();
        timelineRef.current = null;
      }
    };
  }, [handleAnimationComplete]);

  // Scroll-based background animation
  useEffect(() => {
    if (!containerRef?.current || !backgroundRef.current) return;

    const content = containerRef.current;
    const background = backgroundRef.current;

    const updateGradient = () => {
      const scrollHeight = content.scrollHeight;
      const clientHeight = content.clientHeight;
      const maxScroll = scrollHeight - clientHeight;
      const scrollTop = content.scrollTop;
      const scrollRatio = maxScroll > 0 ? scrollTop / maxScroll : 0;
      
      // Calculate gradient stops based on scroll position
      const midpoint = (1 - scrollRatio) * 100;
      const offset = 20; // Larger offset for smoother blend
      const topStop = Math.max(0, midpoint - offset);
      const bottomStop = Math.min(100, midpoint + offset);

      background.style.background = `
        linear-gradient(
          to bottom,
          ${fromColor} 0%,
          ${fromColor} ${topStop}%,
          ${toColor} ${bottomStop}%,
          ${toColor} 100%
        )
      `;
    };

    const handleScroll = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = requestAnimationFrame(updateGradient);
    };

    content.addEventListener('scroll', handleScroll);
    
    // Initial gradient setup
    updateGradient();

    return () => {
      content.removeEventListener('scroll', handleScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [containerRef, fromColor, toColor]);

  return (
    <>
      {/* Base background with gradient */}
      <div 
        ref={backgroundRef}
        className="fixed inset-0 bg-[#0d1115] z-[-2]" 
      />
      
      {/* Gradient overlay */}
      <div 
        ref={gradientRef}
        className="fixed inset-0 z-[-1]"
        style={{
          background: `
            radial-gradient(
              circle at top left,
              rgba(29, 78, 216, 0.15),
              transparent 80%
            ),
            radial-gradient(
              circle at bottom right,
              rgba(56, 189, 248, 0.15),
              transparent 80%
            )
          `
        }}
      />
    </>
  );
};

export default Background;