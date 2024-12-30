// src/hooks/useProjectTransition.ts
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(Flip);

export const useProjectTransition = () => {
  const navigate = useNavigate();

  const handleClose = useCallback((
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

    // Get the first image in the content
    const sourceImage = content.current.querySelector('img');
    if (!sourceImage) {
      // Fallback animation if no image is found
      gsap.to([content.current, header.current, background.current], {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out',
        onComplete: () => navigate('/')
      });
      return;
    }

    // Record the Flip state before navigation
    const state = Flip.getState(sourceImage);

    // Create a timeline for the exit animation
    const tl = gsap.timeline({
      onComplete: () => navigate('/')
    });

    // Fade out content and header
    tl.to([content.current, header.current], {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out'
    });

    // Animate the background with a slight delay
    tl.to(background.current, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out'
    }, '-=0.2');

    // Animate the image back to its original position
    tl.add(() => {
      Flip.from(state, {
        duration: 0.5,
        ease: 'power2.inOut',
        absolute: true
      });
    }, '-=0.3');
    
  }, [navigate]);

  return { handleClose };
};