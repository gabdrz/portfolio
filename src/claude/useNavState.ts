import { useState, useRef } from 'react';
import gsap from 'gsap';

interface UseNavStateProps {
  containerRef: React.RefObject<HTMLDivElement>;
  activeIndex: number;
  onAnimationComplete?: () => void;
}

export const useNavState = ({ 
  containerRef, 
  activeIndex,
  onAnimationComplete 
}: UseNavStateProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToCard = (index: number, duration: number = 0.3) => {
    if (!containerRef.current) return;
    
    const cardHeight = window.innerHeight / 3;
    gsap.to(containerRef.current, {
      scrollTo: { y: cardHeight * index },
      duration,
      ease: "power3.out",
      overwrite: true,
      onComplete: onAnimationComplete
    });
  };

  const handleExpand = (expanded: boolean) => {
    setIsExpanded(expanded);
  };

  const handleItemHover = (index: number) => {
    if (index !== activeIndex) {
      scrollToCard(index);
    }
  };

  const handleItemClick = (index: number) => {
    scrollToCard(index, 0.6);

    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }

    clickTimeoutRef.current = setTimeout(() => {
      handleExpand(false);
      clickTimeoutRef.current = null;
    }, 150);
  };

  return {
    isExpanded,
    handleExpand,
    handleItemHover,
    handleItemClick
  };
};