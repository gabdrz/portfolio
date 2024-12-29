// src/hooks/useProjectTransition.ts
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

interface TransitionState {
  transitionId: string;
  sourceMetrics: {
    top: number;
    left: number;
    width: number;
    height: number;
    borderRadius: string;
  };
}

export const useProjectTransition = () => {
  const navigate = useNavigate();

  const handleClose = useCallback((
    state: TransitionState | undefined,
    refs: {
      container: React.RefObject<HTMLDivElement>;
      content: React.RefObject<HTMLDivElement>;
      header: React.RefObject<HTMLDivElement>;
      background: React.RefObject<HTMLDivElement>;
    }
  ) => {
    const { container, content, header, background } = refs;
    if (!container.current || !content.current || !header.current) {
      navigate('/');
      return;
    }

    const targetId = state?.transitionId;
    const targetElement = targetId ? document.getElementById(targetId) : null;
    const sourceImage = content.current.querySelector('img') as HTMLElement;

    if (targetElement && sourceImage) {
      const sourceRect = sourceImage.getBoundingClientRect();
      const targetRect = targetElement.getBoundingClientRect();

      // Create transition clone
      const clone = sourceImage.cloneNode(true) as HTMLElement;
      clone.style.position = 'fixed';
      clone.style.zIndex = '100';
      clone.style.transform = 'translateZ(0)';
      clone.style.top = `${sourceRect.top}px`;
      clone.style.left = `${sourceRect.left}px`;
      clone.style.width = `${sourceRect.width}px`;
      clone.style.height = `${sourceRect.height}px`;
      clone.style.borderRadius = '0.5rem';
      clone.style.transformOrigin = 'top left';
      clone.style.transition = 'none';
      document.body.appendChild(clone);

      // Hide original image
      sourceImage.style.opacity = '0';

      // Create timeline for smooth exit
      const tl = gsap.timeline({
        onComplete: () => {
          navigate('/');
          clone.remove();
        },
      });

      // Fade out content and background together
      tl.to([content.current, header.current, background.current], {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out',
      }).to(
        clone,
        {
          top: targetRect.top,
          left: targetRect.left,
          width: targetRect.width,
          height: targetRect.height,
          borderRadius: state?.sourceMetrics?.borderRadius || '0px',
          duration: 0.5,
          ease: 'power2.inOut',
        },
        '-=0.2'
      );
    } else {
      // Fallback animation
      gsap.to([content.current, header.current, background.current], {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: 'power2.out',
        onComplete: () => navigate('/'),
      });
    }
  }, [navigate]);

  return { handleClose };
};