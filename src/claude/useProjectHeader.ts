// src/hooks/useProjectHeader.ts
import { useState, useEffect } from 'react';

export const useProjectHeader = (
  contentRef: React.RefObject<HTMLDivElement>,
  headerRef: React.RefObject<HTMLDivElement>
) => {
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const [showHeaderTitle, setShowHeaderTitle] = useState(false);

  useEffect(() => {
    if (!headerRef.current) return;

    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.getBoundingClientRect().height);
      }
    };

    const content = contentRef.current;

    const handleScroll = () => {
      if (!content) return;
      const titleBlock = content.querySelector('[data-block="title"]');
      if (titleBlock) {
        const titleBottom = titleBlock.getBoundingClientRect().bottom;
        setShowHeaderTitle(titleBottom < headerHeight);
      }
    };

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    
    if (content) {
      content.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
      if (content) {
        content.removeEventListener('scroll', handleScroll);
      }
    };
  }, [headerHeight, headerRef, contentRef]);

  return { headerHeight, showHeaderTitle };
};