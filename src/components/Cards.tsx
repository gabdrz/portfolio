// src/components/Cards.tsx
import React, { useRef } from 'react';
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

export const Cards: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const location = useLocation();
  const isProjectView = location.pathname.startsWith('/project/');

  // Refs for animation targets
  const profileRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const headerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Initialize loading and animation sequence
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { loadingState, onBackgroundLoaded, isLoading } = useInitialLoad({
    profileRef,
    linksRef,
    headerRefs: headerRefs.current,
    projectRefs: projectRefs.current,
  });
  
  useScrollBehavior(containerRef, {
    mobileDragThreshold: 5, 
    tapThreshold: 3,        
    snapDuration: 0.25     
  });

  useCardAnimations(containerRef);
  const activeIndex = useActiveCard({ containerRef, cards, isMobile });
  
  const { containerStyle, containerClasses, cardItemClasses } = useCardsLayout({
    isMobile,
    isProjectView
  });

  // Ref assignment helpers
  const assignCardRef = (card: unknown, index: number) => {
    if (card.type === 'content' && !('projectData' in card)) {
      return profileRef; // Profile card
    } else if (card.type === 'links') {
      return linksRef; // Links card
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
      {/* Background with gradient */}
      <Background onAnimationComplete={onBackgroundLoaded} />

      {/* Main container */}
      <div 
        ref={containerRef} 
        className={containerClasses}
        style={{
          ...containerStyle,
          // Hide content until background is loaded
          opacity: loadingState.isBackgroundLoaded ? 1 : 0,
          visibility: loadingState.isBackgroundLoaded ? 'visible' : 'hidden',
          transition: 'opacity 0.3s ease'
        }}
      >
        {/* Spacer for top snap point */}
        <div className="w-full h-1/3" />

        {/* Card items */}
        {cards.map((card, index) => (
          <div
            key={card.id}
            ref={assignCardRef(card, index)}
            className={cardItemClasses}
          >
            <CardContent card={card} />
          </div>
        ))}

        {/* Spacer for bottom snap point */}
        <div className="w-full h-1/3" />
      </div>

      {/* Navigation */}
      <SideNav 
        cards={cards} 
        containerRef={containerRef}
        activeIndex={activeIndex}
      />

      {/* Router outlet for nested routes */}
      <Outlet />
    </>
  );
};