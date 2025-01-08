import { useEffect, useRef } from 'react';
import { useBackgroundStore } from '../store/backgroundStore';

interface UseProjectBackgroundProps {
  fromColor: string;
  toColor: string;
  contentRef: React.RefObject<HTMLDivElement>;
  containerRef: React.RefObject<HTMLDivElement>;
}

export const useProjectBackground = ({
  fromColor,
  toColor,
  contentRef,
  containerRef
}: UseProjectBackgroundProps) => {
  const animationFrame = useRef<number>();
  const { setColors } = useBackgroundStore();

  useEffect(() => {
    if (!contentRef.current || !containerRef.current) return;

    const content = contentRef.current;
    setColors(fromColor, toColor);

    const updateGradient = () => {
      const scrollHeight = content.scrollHeight;
      const clientHeight = content.clientHeight;
      const maxScroll = scrollHeight - clientHeight;
      const scrollTop = content.scrollTop;
      const scrollRatio = maxScroll > 0 ? scrollTop / maxScroll : 0;
      
      if (scrollRatio > 0) {
        setColors(fromColor, toColor);
      }
    };

    const onScroll = () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      animationFrame.current = requestAnimationFrame(updateGradient);
    };

    content.addEventListener('scroll', onScroll);
    updateGradient();

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      content.removeEventListener('scroll', onScroll);
    };
  }, [fromColor, toColor, contentRef, containerRef, setColors]);
};