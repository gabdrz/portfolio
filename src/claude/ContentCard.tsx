// src/components/cards/ContentCard.tsx
import React from "react";
import { ContentCard as ContentCardType } from "../../types/cards";

interface ContentCardProps {
  card: ContentCardType;
}

const ContentCard: React.FC<ContentCardProps> = ({ card }) => {
  const renderFormattedText = (text: string) => {
    return text
      .split("**")
      .map((part, index) =>
        index % 2 === 0 ? part : <strong key={index}>{part}</strong>
      );
  };

  return (
    <div className="flex w-full items-center gap-4 md:px-8">
      <div className="w-32 h-32 md:w-36 md:h-36 flex-shrink-0 rounded-lg overflow-hidden">
        <img
          src={card.image}
          alt={card.title}
          className="-translate-y-[60px] w-[230%] h-[230%] md:-translate-y-[70px] object-cover"
        />
      </div>
      <div className="flex flex-col">
        <h2 className="text-3xl md:text-4xl font-bold text-[#CCDAE5] mb-2">
          {renderFormattedText(card.title)}
        </h2>
        <p className="text-sm md:text-base text-[#CCDAE5] max-w-2xl text-justify">
          {renderFormattedText(card.subtitle)}
        </p>
      </div>
    </div>
  );
};

export { ContentCard };
