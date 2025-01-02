// src/hooks/useProjectBackground.ts
import { useEffect, useRef } from 'react';

interface UseProjectBackgroundProps {
  fromColor: string;
  toColor: string;
  contentRef: React.RefObject<HTMLDivElement>;
  containerRef: React.RefObject<HTMLDivElement>;
  backgroundRef: React.RefObject<HTMLDivElement>;
}

export const useProjectBackground = ({
  fromColor,
  toColor,
  contentRef,
  containerRef,
  backgroundRef,
}: UseProjectBackgroundProps) => {
  const animationFrame = useRef<number>();

  useEffect(() => {
    if (!contentRef.current || !containerRef.current || !backgroundRef.current) return;

    const content = contentRef.current;
    const background = backgroundRef.current;

    // Initial background (fully "fromColor")
    background.style.background = `
      linear-gradient(
        to bottom,
        ${fromColor} 0%,
        ${fromColor} 100%
      )
    `;

    const updateGradient = () => {
      const scrollHeight = content.scrollHeight || 0;
      const clientHeight = content.clientHeight || 0;
      const maxScroll = scrollHeight - clientHeight;
      const scrollTop = content.scrollTop;

      // scrollRatio: how far we've scrolled (0 at top, 1 at bottom)
      const scrollRatio = maxScroll > 0 ? scrollTop / maxScroll : 0;

      // Reverse the ratio so the gradient travels “up” as you scroll down
      const reversedRatio = 1 - scrollRatio;

      /**
       * Choose a “midpoint” and define a larger blend region for a smoother, more modern feel.
       * Example: offset of ~20% for a broad blend band.
       */
      const midpoint = reversedRatio * 100;
      const offset = 20; // Increase for a bigger, smoother blend

      const topStop = Math.max(0, midpoint - offset);
      const bottomStop = Math.min(100, midpoint + offset);

      // Set a smooth gradient from fromColor → toColor with wide transitions
      background.style.background = `
        linear-gradient(
          to bottom,
          ${fromColor} 0%,
          ${fromColor} ${topStop}%,
          ${toColor} ${bottomStop}%,
          ${toColor} 100%
        )
      `;
    };

    const onScroll = () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      animationFrame.current = requestAnimationFrame(updateGradient);
    };

    content.addEventListener('scroll', onScroll);

    // Run an initial update
    setTimeout(updateGradient, 50);

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      content.removeEventListener('scroll', onScroll);
    };
  }, [fromColor, toColor, contentRef, containerRef, backgroundRef]);
};
