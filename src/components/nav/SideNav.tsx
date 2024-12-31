import React, { useRef, useEffect, useState, useCallback } from "react";
import { useTouchDevice } from "../../hooks/useTouchDevice";
import gsap from "gsap";

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
  const navRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const labelWidthsRef = useRef<number[]>([]);
  const touchStartRef = useRef<{ y: number; index: number } | null>(null);
  const animationsRef = useRef<gsap.core.Tween[]>([]);
  const isTouchDevice = useTouchDevice();

  // Cleanup function for GSAP animations
  const cleanupAnimations = useCallback(() => {
    animationsRef.current.forEach((anim) => anim.kill());
    animationsRef.current = [];
  }, []);

  // Store label widths on mount and resize
  useEffect(() => {
    const updateLabelWidths = () => {
      itemRefs.current.forEach((item, index) => {
        if (item) {
          const label = item.querySelector(".nav-label");
          if (label) {
            labelWidthsRef.current[index] =
              label.getBoundingClientRect().width + 32;
          }
        }
      });
    };

    updateLabelWidths();
    window.addEventListener("resize", updateLabelWidths);
    return () => window.removeEventListener("resize", updateLabelWidths);
  }, []);

  // Animate nav items based on active index and expanded state
  useEffect(() => {
    cleanupAnimations();

    // Background overlay animation
    if (backgroundRef.current) {
      animationsRef.current.push(
        gsap.to(backgroundRef.current, {
          opacity: isExpanded ? 1 : 0,
          duration: 0.2,
          ease: "power2.out",
        })
      );
    }

    itemRefs.current.forEach((item, index) => {
      if (!item) return;

      const label = item.querySelector(".nav-label");
      const dot = item.querySelector(".nav-dot");
      if (!label || !dot) return;

      const distance = Math.abs(index - activeIndex);
      const labelWidth = isExpanded ? labelWidthsRef.current[index] || 32 : 32;

      // Calculate opacities based on distance from active item
      const getOpacity = (distance: number) => {
        if (distance === 0) return 1;
        if (distance === 1) return 0.3;
        return 0.1;
      };

      // Store animations for cleanup
      animationsRef.current.push(
        gsap.to(item, {
          width: labelWidth,
          duration: 0.2,
          ease: "power2.out",
        }),

        gsap.to(label, {
          opacity: isExpanded ? getOpacity(distance) : 0,
          duration: 0.2,
          ease: "power2.out",
        }),

        gsap.to(dot, {
          scale: index === activeIndex ? 1.25 : 1,
          opacity: getOpacity(distance),
          duration: 0.2,
          ease: "power2.out",
        })
      );
    });

    return () => cleanupAnimations();
  }, [activeIndex, isExpanded, cleanupAnimations]);

  const scrollToCard = useCallback(
    (index: number) => {
      if (!containerRef.current) return;
      const cardHeight = window.innerHeight / 3;

      gsap.killTweensOf(containerRef.current);
      gsap.to(containerRef.current, {
        scrollTo: { y: cardHeight * index },
        duration: 0.3,
        ease: "power2.out",
      });
    },
    [containerRef]
  );

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
    const elementUnderTouch = document.elementFromPoint(
      touch.clientX,
      touch.clientY
    );
    const navItem = elementUnderTouch?.closest(".nav-item");

    if (!navItem) {
      setIsExpanded(false);
      touchStartRef.current = null;
      return;
    }

    const index = itemRefs.current.findIndex((ref) => ref === navItem);
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

  const handleMouseEnter = useCallback(
    (index: number) => {
      if (!isTouchDevice) {
        setIsExpanded(true);
        scrollToCard(index);
      }
    },
    [isTouchDevice, scrollToCard]
  );

  const handleMouseLeave = useCallback(() => {
    if (!isTouchDevice) {
      setIsExpanded(false);
    }
  }, [isTouchDevice]);

  return (
    <>
      {/* Background Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-40"
        style={{
          opacity: 0,
          backdropFilter: "blur(4px)",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
        }}
        ref={backgroundRef}
      />

      {/* Navigation */}
      <nav
        ref={navRef}
        className="fixed right-0 md:right-6 top-1/2 -translate-y-1/2 z-50 select-none touch-none"
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex flex-col items-end gap-0 md:gap-2">
          {cards.map((card, index) => (
            <div
              key={card.id}
              ref={(el) => (itemRefs.current[index] = el)}
              className="nav-item flex items-center justify-end h-8 cursor-pointer touch-none"
              style={{ width: "32px" }}
              onMouseEnter={() => !isTouchDevice && handleMouseEnter(index)}
              onMouseLeave={() => !isTouchDevice && handleMouseLeave()}
              onTouchStart={(e) => handleTouchStart(e, index)}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="nav-label mr-4 px-2 py-1 rounded text-base whitespace-nowrap text-[#CCDAE5] pointer-events-none"
                style={{ opacity: 0 }}
              >
                {card.title ||
                  (card.type === "links" ? "Links" : `Card ${index + 1}`)}
              </div>
              <div
                className="nav-dot w-2 h-2 md:w-3 md:h-3 rounded-full flex-shrink-0 mr-2 bg-[#CCDAE5] pointer-events-none"
                style={{ opacity: 0.5 }}
              />
            </div>
          ))}
        </div>
      </nav>
    </>
  );
};

export default SideNav;
