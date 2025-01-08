// src/components/CardContent.tsx
import React, { forwardRef } from "react";
import { Card } from "../types/cards";
import { LinksCard } from "./cards/LinksCard";
import { HeaderCard } from "./cards/HeaderCard";
import { ContentCard } from "./cards/ContentCard";
import { ProjectCard } from "./cards/ProjectCard";

interface CardContentProps {
  card: Card;
}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ card }, ref) => {
    const renderCard = () => {
      const commonProps = { ref };

      switch (card.type) {
        case "links":
          return <LinksCard card={card} {...commonProps} />;
        case "header":
          return <HeaderCard card={card} {...commonProps} />;
        case "content":
          if ("projectData" in card) {
            return <ProjectCard card={card} {...commonProps} />;
          }
          return <ContentCard card={card} {...commonProps} />;
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
          will-change-transform
          will-change-opacity
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
  }
);

// Add display name for React DevTools
CardContent.displayName = 'CardContent';

export default CardContent;