// src/hooks/useSideNav.ts
import { useRef, useCallback } from 'react';
import { useIsMobile } from './useIsMobile';
import { useNavAnimation } from './useNavAnimation';
import type { Card } from '../types/cards';

interface UseSideNavProps {
  containerRef: React.RefObject<HTMLDivElement>;
  cards: Card[];
  activeIndex: number;
}

export const useSideNav = ({ containerRef, activeIndex }: UseSideNavProps) => {
  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isMobile = useIsMobile();

  const { animateToCard, animateNavExpansion } = useNavAnimation({ 
    containerRef, 
    itemRefs, 
    activeIndex 
  });

  const handleMouseEnter = useCallback((index: number) => {
    if (isMobile) return;
    animateToCard(index);
    animateNavExpansion(true);
  }, [isMobile, animateToCard, animateNavExpansion]);

  const handleMouseLeave = useCallback(() => {
    if (isMobile) return;
    animateNavExpansion(false);
  }, [isMobile, animateNavExpansion]);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (!isMobile) return;
    const index = findClosestDotIndex(e.touches[0].clientY, itemRefs.current);
    if (index !== -1) {
      animateToCard(index);
      animateNavExpansion(true);
    }
  }, [isMobile, animateToCard, animateNavExpansion]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isMobile) return;
    const index = findClosestDotIndex(e.touches[0].clientY, itemRefs.current);
    if (index !== -1) {
      animateToCard(index);
    }
  }, [isMobile, animateToCard]);

  const handleTouchEnd = useCallback(() => {
    if (!isMobile) return;
    animateNavExpansion(false);
  }, [isMobile, animateNavExpansion]);

  return {
    navRef,
    itemRefs,
    handleMouseEnter,
    handleMouseLeave,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  };
};

// src/hooks/useNavItem.ts
import { useRef, useCallback } from 'react';

interface UseNavItemProps {
  onTouchStart: (e: TouchEvent) => void;
  onTouchMove: (e: TouchEvent) => void;
  onTouchEnd: () => void;
}

export const useNavItem = ({ onTouchStart, onTouchMove, onTouchEnd }: UseNavItemProps) => {
  const labelRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    onTouchStart(e.nativeEvent);
  }, [onTouchStart]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    onTouchMove(e.nativeEvent);
  }, [onTouchMove]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    onTouchEnd();
  }, [onTouchEnd]);

  return {
    labelRef,
    dotRef,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  };
};

// src/hooks/useNavAnimation.ts
import { useCallback } from 'react';
import gsap from 'gsap';

interface UseNavAnimationProps {
  containerRef: React.RefObject<HTMLDivElement>;
  itemRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  activeIndex: number;
}

export const useNavAnimation = ({ 
  containerRef, 
  itemRefs,
  activeIndex 
}: UseNavAnimationProps) => {
  const animateToCard = useCallback((index: number) => {
    if (!containerRef.current) return;
    const cardHeight = window.innerHeight / 3;
    
    gsap.to(containerRef.current, {
      scrollTo: { y: cardHeight * index },
      duration: 0.3,
      ease: "power2.out",
      overwrite: true
    });
  }, [containerRef]);

  const animateNavExpansion = useCallback((expanded: boolean) => {
    if (!itemRefs.current.length) return;
    itemRefs.current.forEach((item, index) => {
      if (!item) return;
      const label = item.querySelector('div:first-child');
      if (!label) return;

      const distance = Math.abs(index - activeIndex);
      const delay = expanded ? distance * 0.02 : 0;
      const labelWidth = expanded ? label.getBoundingClientRect().width + 32 : 32;

      gsap.to(item, {
        width: labelWidth,
        duration: expanded ? 0.3 : 0.2,
        delay,
        ease: "power2.inOut",
        overwrite: true
      });

      gsap.to(label, {
        opacity: expanded ? Math.max(0.3, 1 - (distance * 0.35)) : 0,
        duration: expanded ? 0.3 : 0.2,
        delay,
        ease: expanded ? "power2.out" : "power2.inOut",
        overwrite: true
      });
    });
  }, [itemRefs, activeIndex]);

  return {
    animateToCard,
    animateNavExpansion
  };
};

// src/utils/navUtils.ts
export const findClosestDotIndex = (clientY: number, itemRefs: (HTMLDivElement | null)[]) => {
  const dotElements = itemRefs
    .map(item => item?.querySelector('.rounded-full'))
    .filter((dot): dot is Element => dot !== null);

  const dotRects = dotElements.map(dot => dot.getBoundingClientRect());
  
  return dotRects.reduce((closest, rect, index) => {
    const distance = Math.abs(clientY - (rect.top + rect.height / 2));
    if (distance < closest.distance) {
      return { index, distance };
    }
    return closest;
  }, { index: -1, distance: Infinity }).index;
};