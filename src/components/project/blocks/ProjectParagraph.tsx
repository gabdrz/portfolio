// src/components/project/blocks/ProjectParagraph.tsx
import React from 'react';

interface ProjectParagraphProps {
  content: string;
  layout: string;
}

export const ProjectParagraph: React.FC<ProjectParagraphProps> = ({ content, layout }) => (
  <div className={`mb-8 ${layout === "contained" ? "max-w-2xl mx-auto" : "w-full"}`}>
    <p className="text-lg leading-relaxed opacity-90 text-justify">{content}</p>
  </div>
);