// src/components/cards/LinksCard.tsx
import React from "react";
import { LinksCard as LinksCardType } from "../../types/cards";

interface LinksCardProps {
  card: LinksCardType;
}

const LinksCard: React.FC<LinksCardProps> = ({ card }) => {
  const { layout, links } = card;

  return (
    <div className="flex w-full h-full items-center justify-center p-8">
      <div
        className={`
        flex
        ${layout === "vertical" ? "flex-col space-y-6" : "flex-row space-x-10 md:space-x-12"}
        items-center justify-center w-full
      `}
      >
        <a
          href={`mailto:${links.email}`}
          className="text-sm md:text-base text-[#CCDAE5] hover:text-blue-600 transition-colors"
        >
          Email
        </a>
        <a
          href={links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm md:text-base text-[#CCDAE5] hover:text-blue-600 transition-colors"
        >
          GitHub
        </a>
        <a
          href={links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm md:text-base text-[#CCDAE5] hover:text-blue-600 transition-colors"
        >
          LinkedIn
        </a>
        <a
          href={links.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm md:text-base text-[#CCDAE5] hover:text-blue-600 transition-colors"
        >
          Resume
        </a>
      </div>
    </div>
  );
};

export { LinksCard };
