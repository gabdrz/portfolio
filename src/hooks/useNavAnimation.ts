import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface UseNavAnimationsProps {
  itemRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  activeIndex: number;
}

export const useNavAnimations = ({
  itemRefs,
  activeIndex
}: UseNavAnimationsProps) => {
  const labelWidthsRef = useRef<number[]>([]);
  const previousActiveRef = useRef(activeIndex);

  // Initialize and store label widths
  useEffect(() => {
    itemRefs.current.forEach((item, index) => {
      if (item) {
        const label = item.querySelector('div:first-of-type');
        if (label) {
          const width = label.getBoundingClientRect().width;
          labelWidthsRef.current[index] = width + 32;
        }
      }
    });
  }, [itemRefs]);

  // Track active index changes
  useEffect(() => {
    previousActiveRef.current = activeIndex;
  }, [activeIndex]);

  const animateItems = (expanded: boolean) => {
    const staggerDelay = 0.03;
    const duration = expanded ? 0.4 : 0.15;

    // Clear any existing animations first
    itemRefs.current.forEach(item => {
      if (item) {
        gsap.killTweensOf(item.children);
      }
    });

    itemRefs.current.forEach((item, index) => {
      if (!item) return;

      const label = item.querySelector('div:first-of-type');
      const dot = item.querySelector('div:last-of-type');
      if (!label || !dot) return;

      const distance = Math.abs(index - activeIndex);
      const expandedWidth = labelWidthsRef.current[index] + 8;

      // Ensure the active item's label is most visible
      const labelOpacity = expanded ? 
        (index === activeIndex ? 1 : Math.max(0.3, 1 - (distance * 0.15))) : 0;

      gsap.to(item, {
        width: expanded ? expandedWidth : 32,
        duration: duration * 0.8,
        ease: "power2.inOut",
        delay: expanded ? distance * staggerDelay : 0
      });

      gsap.to(label, {
        opacity: labelOpacity,
        duration,
        ease: expanded ? "power2.out" : "power2.inOut",
        delay: expanded ? distance * staggerDelay : 0
      });

      gsap.to(dot, {
        scale: index === activeIndex ? 1.25 : 1,
        opacity: index === activeIndex ? 1 : 0.5,
        duration,
        ease: "back.out(2)",
        delay: expanded ? distance * staggerDelay : 0
      });
    });
  };

  return { animateItems };
};