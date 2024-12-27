// src/hooks/useCardAnimations.ts
import { RefObject, useEffect } from 'react';
import { useSharedAnimation } from './animations/useSharedAnimation';
import gsap from 'gsap';

export const useCardAnimations = (containerRef: RefObject<HTMLDivElement>) => {
  const { animateCards } = useSharedAnimation();

  useEffect(() => {
    if (!containerRef.current) return;

    // Kill any existing animations first
    const cardElements = containerRef.current.querySelectorAll('.card-item');
    cardElements.forEach(element => {
      gsap.killTweensOf(element);
    });

    // Start new animations
    animateCards(cardElements, containerRef.current);

    return () => {
      // Cleanup animations on unmount
      cardElements.forEach(element => {
        gsap.killTweensOf(element);
      });
    };
  }, [animateCards, containerRef]);
};