import React, { useRef, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useIsMobile } from '../hooks/useIsMobile';
import { useScrollBehavior } from '../hooks/useScrollBehavior';
import { useCardAnimations } from '../hooks/useCardAnimations';
import { useActiveCard } from '../hooks/useActiveCard';
import { useCardsLayout } from '../hooks/useCardsLayout';
import { useInitialLoad } from '../hooks/useInitialLoad';
import { CardContent } from './CardContent';
import { cards } from '../data/cards';
import SideNav from './nav/SideNav';
import Background from './Background';
import { useBackgroundStore } from '../store/backgroundStore';
import gsap from 'gsap';

export const Cards: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const location = useLocation();
  const isProjectView = location.pathname.startsWith('/project/');
  
  const { setProjectView } = useBackgroundStore();

  useEffect(() => {
    if (!cardsContainerRef.current) return;

    if (isProjectView) {
      gsap.to(cardsContainerRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => {
          if (cardsContainerRef.current) {
            cardsContainerRef.current.style.visibility = 'hidden';
          }
        }
      });
    } else {
      cardsContainerRef.current.style.visibility = 'visible';
      gsap.to(cardsContainerRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [isProjectView]);

  useEffect(() => {
    setProjectView(isProjectView);
  }, [isProjectView, setProjectView]);

  const profileRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const headerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { loadingState, onBackgroundLoaded } = useInitialLoad({
    profileRef,
    linksRef,
    headerRefs: headerRefs.current,
    projectRefs: projectRefs.current,
  });
  
  useScrollBehavior(containerRef);
  useCardAnimations(containerRef);
  const activeIndex = useActiveCard({ containerRef, cards, isMobile });
  
  const { containerStyle, containerClasses, cardItemClasses } = useCardsLayout({
    isMobile,
    isProjectView
  });

  const assignCardRef = (card: unknown, index: number) => {
    if (card.type === 'content' && !('projectData' in card)) {
      return profileRef;
    } else if (card.type === 'links') {
      return linksRef;
    } else if (card.type === 'header') {
      return (ref: HTMLDivElement | null) => {
        headerRefs.current[index] = ref;
      };
    } else if (card.type === 'content' && 'projectData' in card) {
      return (ref: HTMLDivElement | null) => {
        projectRefs.current[index] = ref;
      };
    }
    return null;
  };

  return (
    <>
      <Background 
        containerRef={containerRef}
        onAnimationComplete={onBackgroundLoaded}
      />

      <div ref={cardsContainerRef}>
        <div 
          ref={containerRef} 
          className={containerClasses}
          style={{
            ...containerStyle,
            opacity: loadingState.isBackgroundLoaded ? 1 : 0,
            visibility: loadingState.isBackgroundLoaded ? 'visible' : 'hidden',
            transition: 'opacity 0.3s ease'
          }}
        >
          <div className="w-full h-1/3" />
          
          {cards.map((card, index) => (
            <div
              key={card.id}
              ref={assignCardRef(card, index)}
              className={cardItemClasses}
            >
              <CardContent card={card} />
            </div>
          ))}

          <div className="w-full h-1/3" />
        </div>

        <SideNav 
          cards={cards} 
          containerRef={containerRef}
          activeIndex={activeIndex}
        />
      </div>

      <Outlet />
    </>
  );
};