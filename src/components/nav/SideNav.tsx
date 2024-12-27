import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useIsMobile } from '../../hooks/useIsMobile';
import gsap from 'gsap';

interface SideNavProps {
  cards: Array<{
    id: number;
    type: string;
    title?: string;
  }>;
  containerRef: React.RefObject<HTMLDivElement>;
  activeIndex: number;
}

const SideNav = ({ cards, containerRef, activeIndex }: SideNavProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();
  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const labelWidthsRef = useRef<number[]>([]);
  const touchStartRef = useRef<{ y: number; index: number } | null>(null);
  const animationsRef = useRef<gsap.core.Tween[]>([]);

  // Cleanup function for GSAP animations
  const cleanupAnimations = useCallback(() => {
    animationsRef.current.forEach(anim => anim.kill());
    animationsRef.current = [];
  }, []);

  // Store label widths on mount and resize
  useEffect(() => {
    const updateLabelWidths = () => {
      itemRefs.current.forEach((item, index) => {
        if (item) {
          const label = item.querySelector('.nav-label');
          if (label) {
            labelWidthsRef.current[index] = label.getBoundingClientRect().width + 32;
          }
        }
      });
    };

    updateLabelWidths();
    window.addEventListener('resize', updateLabelWidths);
    return () => window.removeEventListener('resize', updateLabelWidths);
  }, []);

  // Animate nav items based on active index and expanded state
  useEffect(() => {
    cleanupAnimations();
    
    itemRefs.current.forEach((item, index) => {
      if (!item) return;

      const label = item.querySelector('.nav-label');
      const dot = item.querySelector('.nav-dot');
      if (!label || !dot) return;

      const distance = Math.abs(index - activeIndex);
      const delay = isExpanded ? distance * 0.02 : 0;
      const labelWidth = isExpanded ? labelWidthsRef.current[index] || 32 : 32;

      // Store animations for cleanup
      animationsRef.current.push(
        gsap.to(item, {
          width: labelWidth,
          duration: 0.2,
          delay,
          ease: "power2.out"
        }),

        gsap.to(label, {
          opacity: isExpanded ? Math.max(0.3, 1 - (distance * 0.15)) : 0,
          duration: 0.2,
          delay,
          ease: "power2.out"
        }),

        gsap.to(dot, {
          scale: index === activeIndex ? 1.25 : 1,
          opacity: index === activeIndex ? 1 : 0.5,
          duration: 0.2,
          ease: "power2.out"
        })
      );
    });

    return () => cleanupAnimations();
  }, [activeIndex, isExpanded, cleanupAnimations]);

  const scrollToCard = useCallback((index: number) => {
    if (!containerRef.current) return;
    const cardHeight = window.innerHeight / 3;
    
    gsap.killTweensOf(containerRef.current);
    gsap.to(containerRef.current, {
      scrollTo: { y: cardHeight * index },
      duration: 0.3,
      ease: "power2.out"
    });
  }, [containerRef]);

  const handleTouchStart = (e: React.TouchEvent, index: number) => {
    e.stopPropagation();
    const touch = e.touches[0];
    touchStartRef.current = { y: touch.clientY, index };
    setIsExpanded(true);
    scrollToCard(index);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.stopPropagation();
    if (!touchStartRef.current) return;
    
    const touch = e.touches[0];
    const elementUnderTouch = document.elementFromPoint(touch.clientX, touch.clientY);
    const navItem = elementUnderTouch?.closest('.nav-item');
    
    if (!navItem) {
      // If touch moves outside nav, close it
      setIsExpanded(false);
      touchStartRef.current = null;
      return;
    }

    const index = itemRefs.current.findIndex(ref => ref === navItem);
    if (index !== -1 && index !== touchStartRef.current.index) {
      touchStartRef.current.index = index;
      scrollToCard(index);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.stopPropagation();
    setIsExpanded(false);
    touchStartRef.current = null;
  };

  const handleMouseEnter = useCallback((index: number) => {
    if (!isMobile) {
      setIsExpanded(true);
      scrollToCard(index);
    }
  }, [isMobile, scrollToCard]);

  const handleMouseLeave = useCallback(() => {
    if (!isMobile) {
      setIsExpanded(false);
    }
  }, [isMobile]);

  return (
    <nav 
      ref={navRef}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 select-none touch-none"
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex flex-col items-end gap-2">
        {cards.map((card, index) => (
          <div
            key={card.id}
            ref={el => itemRefs.current[index] = el}
            className="nav-item flex items-center justify-end h-8 cursor-pointer touch-none"
            style={{ width: '32px' }}
            onMouseEnter={() => handleMouseEnter(index)}
            onTouchStart={e => handleTouchStart(e, index)}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="nav-label mr-4 px-2 py-1 rounded text-sm whitespace-nowrap text-[#CCDAE5] pointer-events-none"
              style={{ opacity: 0 }}
            >
              {card.title || (card.type === 'links' ? 'Links' : `Card ${index + 1}`)}
            </div>
            <div 
              className="nav-dot w-2 h-2 md:w-3 md:h-3 rounded-full flex-shrink-0 mr-2 bg-[#CCDAE5] pointer-events-none"
              style={{ opacity: 0.5 }}
            />
          </div>
        ))}
      </div>
    </nav>
  );
};

export default SideNav;