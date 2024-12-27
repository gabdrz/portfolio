// src/hooks/useCardAnimations.ts
import { RefObject, useEffect } from 'react';
import { useSharedAnimation } from './animations/useSharedAnimation';
import gsap from 'gsap';

export const useCardAnimations = (containerRef: RefObject<HTMLDivElement>) => {
  const { animateCards } = useSharedAnimation();

  useEffect(() => {
    if (!containerRef.current) return;
    const cardElements = gsap.utils.toArray('.card-item');
    animateCards(cardElements, containerRef.current);
  }, [animateCards, containerRef]);
};