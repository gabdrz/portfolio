import React from 'react';
import { Block, ProjectData } from '../../types/cards';
import { ProjectHeading, ProjectParagraph, ProjectImage, ProjectGallery, ProjectQuote, ProjectSpacer } from './blocks';
import { ProjectTitleBlock } from './blocks/ProjectTitleBlock';

interface ProjectContentProps {
  block: Block;
  isFirstBlock: boolean;
  projectData?: ProjectData;
  onClose: () => void;
}

export const ProjectContent: React.FC<ProjectContentProps> = ({ 
  block, 
  isFirstBlock,
  projectData,
  onClose
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

  const components = {
    heading: ProjectHeading,
    paragraph: (props: unknown) => <ProjectParagraph {...props} onClose={onClose} />,
    image: ProjectImage,
    gallery: ProjectGallery,
    quote: ProjectQuote,
    spacer: ProjectSpacer
  };

  const Component = components[block.type];
  if (!Component) return null;

  return <Component {...block} />;
};