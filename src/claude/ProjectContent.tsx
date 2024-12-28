// src/components/project/ProjectContent.tsx
import React from 'react';
import { Block, ProjectData } from '../../types/cards';
import * as ProjectBlocks from './blocks';
import { ProjectTitleBlock } from './blocks/ProjectTitleBlock';

interface ProjectContentProps {
  block: Block;
  isFirstBlock: boolean;
  projectData?: ProjectData;
}

export const ProjectContent: React.FC<ProjectContentProps> = ({ 
  block, 
  isFirstBlock,
  projectData
}) => {
  if (!projectData) return null;

  // Handle title block
  if (isFirstBlock && block.type === 'heading') {
    return (
      <div className="max-w-2xl mx-auto mb-8">
        <ProjectTitleBlock content={block.content} projectData={projectData} />
      </div>
    );
  }

  // Special handling for hero image
  if (block.type === 'image' && block.content === projectData.heroImage) {
    return (
      <div className="max-w-2xl mx-auto mb-8">
        <img 
          src={block.content} 
          alt=""
          className="w-full h-auto rounded-lg shadow-xl"
        />
      </div>
    );
  }

  const components = {
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