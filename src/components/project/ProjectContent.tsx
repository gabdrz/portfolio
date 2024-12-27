// src/components/project/ProjectContent.tsx
import React from 'react';
import { Block } from '../../types/cards';
import * as ProjectBlocks from './blocks';
import { ProjectTitleBlock } from './blocks/ProjectTitleBlock';

interface ProjectContentProps {
  block: Block;
  isFirstBlock: boolean;
}

export const ProjectContent: React.FC<ProjectContentProps> = ({ 
  block, 
  isFirstBlock 
}) => {
  if (isFirstBlock && block.type !== 'title') return null;

  const components = {
    title: ProjectTitleBlock,
    heading: ProjectBlocks.ProjectHeading,
    paragraph: ProjectBlocks.ProjectParagraph,
    image: ProjectBlocks.ProjectImage,
    gallery: ProjectBlocks.ProjectGallery,
    quote: ProjectBlocks.ProjectQuote,
    spacer: ProjectBlocks.ProjectSpacer
  };

  const Component = components[block.type];
  if (!Component) return null;

  return <Component {...block} />;
};