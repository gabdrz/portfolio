// src/hooks/useSharedElement.ts
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(Flip);

interface UseSharedElementProps {
  elementId: string;
  isExpanded: boolean;
  onComplete?: () => void;
}

export const useSharedElement = ({ elementId, isExpanded, onComplete }: UseSharedElementProps) => {
  const flipStateRef = useRef<ReturnType<typeof Flip.getState> | null>(null);

  useEffect(() => {
    const element = document.getElementById(elementId);
    if (!element) return;

    // Capture initial state
    flipStateRef.current = Flip.getState(element, { props: "className" });

    // Toggle expanded class for proper sizing
    element.classList.toggle('project-hero', isExpanded);
    element.classList.toggle('card-thumbnail', !isExpanded);

    // Animate from the previous state to the new state
    Flip.from(flipStateRef.current, {
      duration: 0.6,
      ease: "power2.inOut",
      absolute: true,
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });
  }, [elementId, isExpanded, onComplete]);
};