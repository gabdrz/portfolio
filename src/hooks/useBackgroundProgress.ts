// src/hooks/useBackgroundProgress.ts
import { useEffect, useCallback } from 'react';
import { useBackgroundStore } from '../store/backgroundStore';
import gsap from 'gsap';

interface UseBackgroundProgressProps {
  containerRef: React.RefObject<HTMLDivElement>;
  activeCardIndex: number;
  totalCards: number;
  isProjectView: boolean;
}

export const useBackgroundProgress = ({
  containerRef,
  activeCardIndex,
  totalCards,
  isProjectView,
}: UseBackgroundProgressProps) => {
  const { updateBackgroundGradient } = useBackgroundStore();

  const updateFromCardView = useCallback(() => {
    // Convert active card index to a progress value (0 to 1)
    const progress = totalCards > 1 ? activeCardIndex / (totalCards - 1) : 0;
    updateBackgroundGradient(progress);
  }, [activeCardIndex, totalCards, updateBackgroundGradient]);

  const updateFromProjectView = useCallback(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;
    const maxScroll = scrollHeight - clientHeight;
    
    const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;
    updateBackgroundGradient(progress);
  }, [containerRef, updateBackgroundGradient]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initial update
    if (isProjectView) {
      updateFromProjectView();
    } else {
      updateFromCardView();
    }

    // Only add scroll listener in project view
    if (isProjectView) {
      const container = containerRef.current;
      
      const handleScroll = () => {
        gsap.to({}, {
          duration: 0.1,  // Short duration for smooth updates
          onUpdate: updateFromProjectView
        });
      };

      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [
    containerRef,
    isProjectView,
    updateFromProjectView,
    updateFromCardView
  ]);

  // Update when active card changes in card view
  useEffect(() => {
    if (!isProjectView) {
      gsap.to({}, {
        duration: 0.3,  // Longer duration for smoother card transitions
        onUpdate: updateFromCardView,
        ease: "power2.out"
      });
    }
  }, [activeCardIndex, isProjectView, updateFromCardView]);
};