// src/components/project/blocks/ProjectQuote.tsx
import React from 'react';

interface ProjectQuoteProps {
  content: string;
}

export const ProjectQuote: React.FC<ProjectQuoteProps> = ({ content }) => (
  <div className="max-w-2xl mx-auto mb-8">
    <p className="text-lg leading-relaxed opacity-90 italic text-center">"{content}"</p>
  </div>
);