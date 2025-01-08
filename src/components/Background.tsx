import React, { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';

interface BackgroundProps {
  onAnimationComplete?: () => void;
}

const Background = ({ onAnimationComplete }: BackgroundProps) => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const hasPlayedRef = useRef(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  
  // Stabilize the animation complete callback
  const handleAnimationComplete = useCallback(() => {
    onAnimationComplete?.();
  }, [onAnimationComplete]);

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
      // Only kill the timeline if the component is truly being unmounted
      // We can check this by seeing if the refs are still valid
      if (!backgroundRef.current && !gradientRef.current) {
        timelineRef.current?.kill();
        timelineRef.current = null;
      }
    };
  }, []); // Empty dependency array since we manage everything with refs

  return (
    <>
      {/* Base background color */}
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