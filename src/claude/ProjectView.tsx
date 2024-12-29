// src/components/project/ProjectView.tsx
import React, { useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { cards } from '../../data/cards';
import { ProjectHeader } from './ProjectHeader';
import { ProjectContent } from './ProjectContent';
import { useProjectBackground } from '../../hooks/useProjectBackground';
import { useProjectTransition } from '../../hooks/useProjectTransition';
import { useProjectHeader } from '../../hooks/useProjectHeader';

interface LocationState {
  transitionId: string;
  sourceMetrics: {
    top: number;
    left: number;
    width: number;
    height: number;
    borderRadius: string;
  };
}

const ProjectView: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  
  const project = cards.find(
    (card) => 'projectData' in card && card.id.toString() === id
  );
  
  const state = location.state as LocationState;
  const { handleClose } = useProjectTransition();
  const { headerHeight, showHeaderTitle } = useProjectHeader(contentRef, headerRef);

  useEffect(() => {
    if (!project || !state?.transitionId) return;

    const sourceImage = document.getElementById(state.transitionId);
    if (!sourceImage) return;

    // Add blocks to the beginning of content if they don't exist
    if (!project.projectData.content.some((block) => block.type === 'heading')) {
      project.projectData.content.unshift({
        type: 'heading',
        content: project.title,
        layout: 'contained',
      });
    }

    if (!project.projectData.content.some((block) => block.type === 'image' && block.content === project.image)) {
      project.projectData.content.splice(1, 0, {
        type: 'image',
        content: project.image,
        layout: 'contained',
      });
    }

    // Create and animate transition clone
    const clone = sourceImage.cloneNode(true) as HTMLElement;
    Object.assign(clone.style, {
      position: 'fixed',
      zIndex: '100',
      transform: 'translateZ(0)',
      top: `${state.sourceMetrics.top}px`,
      left: `${state.sourceMetrics.left}px`,
      width: `${state.sourceMetrics.width}px`,
      height: `${state.sourceMetrics.height}px`,
      borderRadius: state.sourceMetrics.borderRadius,
      transformOrigin: 'top left',
      transition: 'none',
    });
    
    document.body.appendChild(clone);

    const targetWidth = Math.min(window.innerWidth * 0.8, 896);
    const targetHeight = (targetWidth * state.sourceMetrics.height) / state.sourceMetrics.width;
    const targetLeft = (window.innerWidth - targetWidth) / 2;
    const targetTop = headerHeight + 48;

    const tl = gsap.timeline();

    tl.to(clone, {
      top: targetTop,
      left: targetLeft,
      width: targetWidth,
      height: targetHeight,
      borderRadius: '0.5rem',
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: () => {
        clone.remove();
        if (contentRef.current) {
          contentRef.current.style.opacity = '1';
        }
      },
    }).to(backgroundRef.current, {
      opacity: 1,
      duration: 0.3,
      ease: 'power2.inOut',
    }, '-=0.2');

    if (contentRef.current) {
      tl.fromTo(
        contentRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 },
        '-=0.2'
      );
    }
  }, [project, state, headerHeight]);

  // Use background hook
  const theme = project?.projectData.theme;
  useProjectBackground({
    fromColor: theme?.gradient?.from || '#0D1115',
    toColor: theme?.gradient?.to || '#0D1115',
    contentRef,
    containerRef,
    backgroundRef,
  });

  if (!project || !('projectData' in project)) {
    return null;
  }

  const onClose = () => handleClose(state, {
    container: containerRef,
    content: contentRef,
    header: headerRef,
    background: backgroundRef,
  });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden z-50"
      style={{ color: theme?.textColor || '#CCDAE5' }}
    >
      <div
        ref={backgroundRef}
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ opacity: 0 }}
      />

      <div ref={headerRef} className="fixed top-0 left-0 right-0 z-20">
        <ProjectHeader
          title={project.title}
          onClose={onClose}
          showTitle={showHeaderTitle}
        />
      </div>

      <div
        ref={contentRef}
        className="relative h-full overflow-y-auto px-4 md:px-8 scrollbar-hide z-10"
        style={{ paddingTop: `${headerHeight + 32}px`, opacity: 0 }}
      >
        {project.projectData.content.map((block, index) => (
          <ProjectContent
            key={index}
            block={block}
            isFirstBlock={index === 0}
            projectData={project.projectData}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectView;