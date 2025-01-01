// src/components/Cards.tsx
import React, { useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useIsMobile } from '../hooks/useIsMobile';
import { useScrollBehavior } from '../hooks/useScrollBehavior';
import { useCardAnimations } from '../hooks/useCardAnimations';
import { useActiveCard } from '../hooks/useActiveCard';
import { useCardsLayout } from '../hooks/useCardsLayout';
import { CardContent } from './CardContent';
import { cards } from '../data/cards';
import SideNav from './nav/SideNav'; // Updated import

export const Cards: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const location = useLocation();
  const isProjectView = location.pathname.startsWith('/project/');
  
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

  return (
    <>
      <div 
        ref={containerRef} 
        className={containerClasses}
        style={containerStyle}
      >
        {/* Spacer for top snap point */}
        <div className="w-full h-1/3" />

        {/* Card items */}
        {cards.map(card => (
          <div
            key={card.id}
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