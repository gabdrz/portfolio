// src/components/cards/HeaderCard.tsx
import React from "react";
import { HeaderCard as HeaderCardType } from "../../types/cards";

interface HeaderCardProps {
  card: HeaderCardType;
}

const HeaderCard: React.FC<HeaderCardProps> = ({ card }) => {
  return (
    <div className="flex w-full h-full items-center justify-center select-none touch-none">
      <h2 className="text-sm md:text-base font-medium text-[#CCDAE5]">{card.title}</h2>
    </div>
  );
};

export { HeaderCard };
