// src/hooks/useProjectHeader.ts
import { useState, useEffect, RefObject } from 'react';

interface UseProjectHeaderResult {
  showHeaderTitle: boolean;
}

export const useProjectHeader = (
  contentRef: RefObject<HTMLDivElement>,
  headerRef: RefObject<HTMLDivElement>,
  threshold: number = 100
): UseProjectHeaderResult => {
  const [showHeaderTitle, setShowHeaderTitle] = useState(false);

  useEffect(() => {
    if (!contentRef.current || !headerRef.current) return;

    const content = contentRef.current;

    const handleScroll = () => {
      if (!content) return;

      const titleBlock = content.querySelector('[data-block="title"]');
      if (!titleBlock) return;

      const titleRect = titleBlock.getBoundingClientRect();
      const shouldShowHeader = titleRect.bottom < threshold;

      // Directly update state without debouncing
      setShowHeaderTitle(shouldShowHeader);
    };

    // Use passive scroll listener for better performance
    content.addEventListener('scroll', handleScroll, { passive: true });

    // Initial check
    handleScroll();

    return () => {
      content.removeEventListener('scroll', handleScroll);
    };
  }, [contentRef, headerRef, threshold]);

  return { showHeaderTitle };
};