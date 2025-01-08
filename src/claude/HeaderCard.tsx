// src/components/cards/HeaderCard.tsx
import React, { forwardRef } from "react";
import { HeaderCard as HeaderCardType } from "../../types/cards";

interface HeaderCardProps {
  card: HeaderCardType;
}

export const HeaderCard = forwardRef<HTMLDivElement, HeaderCardProps>(
  ({ card }, ref) => {
    return (
      <div 
        ref={ref}
        className="flex w-full h-full items-center justify-center select-none touch-none will-change-transform"
      >
        <h2 className="text-sm md:text-base font-medium text-[#CCDAE5]">
          {card.title}
        </h2>
      </div>
    );
  }
);

HeaderCard.displayName = 'HeaderCard';