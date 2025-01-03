import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ProjectCard as ProjectCardType } from "../../types/cards";

interface ProjectCardProps {
  card: ProjectCardType;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ card }) => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(`/project/${card.id}`);
  }, [card.id, navigate]);

  return (
    <div
      className="flex w-full items-start gap-4 md:px-8 cursor-pointer select-none touch-none"
      onClick={handleClick}
    >
      <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0 rounded-lg overflow-hidden">
        <img
          src={card.image}
          alt={card.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col">
        <p className="text-sm md:text-base font-bold text-[#CCDAE5] mb-2">
          {card.title}
        </p>
        <p className="text-sm md:text-base text-[#CCDAE5] opacity-75 mb-2">
          {card.projectData.status}
        </p>
        <p className="text-sm md:text-base text-[#CCDAE5] max-w-2xl">
          {card.subtitle}
        </p>
      </div>
    </div>
  );
};

export { ProjectCard };