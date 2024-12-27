// src/components/CardContent.tsx
import React from 'react';
import { Card } from '../types/cards';
import { LinksCard } from './cards/LinksCard';
import { HeaderCard } from './cards/HeaderCard';
import { ContentCard } from './cards/ContentCard';
import { ProjectCard } from './cards/ProjectCard';

interface ImageMetrics {
  top: number;
  left: number;
  width: number;
  height: number;
  borderRadius: number;
}

interface CardContentProps {
  card: Card;
  onTransitionStart?: (metrics: ImageMetrics, imageUrl: string) => void;
}

export const CardContent = ({ card, onTransitionStart }: CardContentProps) => {
  const renderCard = () => {
    switch (card.type) {
      case 'links':
        return <LinksCard card={card} />;
      case 'header':
        return <HeaderCard card={card} />;
      case 'content':
        if ('projectData' in card) {
          return <ProjectCard card={card} onTransitionStart={onTransitionStart} />;
        }
        return <ContentCard card={card} />;
      default:
        return null;
    }
  };

  return (
    <div 
      className={`
        relative
        w-full
        h-full
        flex 
        items-center 
        justify-center 
        px-1
        md:px-8
        lg:px-16
      `}
    >
      <div 
        className={`
          md:w-[503px]
          w-[365px]
          h-[70%]
          max-w-screen-sm
          mx-auto
          flex
          items-center
          justify-center
          overflow-hidden
        `}
      >
        {renderCard()}
      </div>
    </div>
  );
};