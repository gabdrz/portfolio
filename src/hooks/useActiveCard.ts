// src/hooks/useActiveCard.ts
import { useState, useEffect, RefObject } from 'react';
import { Card } from '../types/cards';
import throttle from 'lodash/throttle';

interface UseActiveCardProps {
  containerRef: RefObject<HTMLDivElement>;
  cards: Card[];
  isMobile: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useActiveCard = ({ containerRef, cards, isMobile }: UseActiveCardProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateActiveIndex = () => {
      const container = containerRef.current;
      if (!container) return;

      const cardHeight = window.innerHeight / 3;
      const scrollPosition = container.scrollTop;
      
      const newIndex = Math.round(scrollPosition / cardHeight);
      const clampedIndex = Math.max(0, Math.min(cards.length - 1, newIndex));
      
      setActiveIndex(clampedIndex);
    };

    // Throttle scroll updates for better performance
    const throttledUpdate = throttle(updateActiveIndex, 50);

    // Handle both scroll and touch events
    const handleScroll = () => throttledUpdate();

    const container = containerRef.current;
    container.addEventListener('scroll', handleScroll, { passive: true });

    // Initial update
    updateActiveIndex();

    return () => {
      throttledUpdate.cancel();
      container.removeEventListener('scroll', handleScroll);
    };
  }, [containerRef, cards.length]);

  return activeIndex;
};