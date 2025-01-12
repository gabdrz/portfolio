import React from 'react';

interface ProjectParagraphProps {
  content: string;
  layout: string;
  className?: string;
  onClose: () => void;
}

export const ProjectParagraph: React.FC<ProjectParagraphProps> = ({
  content,
  layout,
  className,
  onClose
}) => {
  const parseMarkdown = (text: string) => {
    const parts = text.split(/(\*\*\[.*?\]\(.*?\)\*\*)/);

    return parts.map((part, index) => {
      if (part.startsWith('**[') && part.endsWith(')**')) {
        const linkMatch = part.match(/\*\*\[(.*?)\]\((.*?)\)\*\*/);

        if (linkMatch) {
          const [, linkText, url] = linkMatch;
          
          // Handle back-to-cardview special case
          if (url === 'back-to-cardview') {
            return (
              <button
                key={index}
                onClick={onClose}
                className="font-bold text-blue-400 hover:text-blue-300 transition-colors"
              >
                {linkText}
              </button>
            );
          }

          // Handle external links
          return (
            <a
              key={index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-blue-400 hover:text-blue-300 transition-colors"
            >
              {linkText}
            </a>
          );
        }
      }

      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className={`mb-8 ${layout === "contained" ? "max-w-2xl mx-auto" : "w-full"}`}>
      <p className={`text-lg leading-relaxed opacity-90 ${className || 'text-justify'}`}>
        {parseMarkdown(content)}
      </p>
    </div>
  );
};