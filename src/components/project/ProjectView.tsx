import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { cards } from '../../data/cards';
import { ProjectHeader } from './ProjectHeader';
import { ProjectContent } from './ProjectContent';
import { useProjectHeader } from '../../hooks/useProjectHeader';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';
import ReadingProgress from './ReadingProgress';
import { useBackgroundStore } from '../../store/backgroundStore';

const ProjectView: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const { showHeaderTitle } = useProjectHeader(contentRef, headerRef);
  const scrollToTop = useScrollToTop(contentRef);
  const { beginTransition } = useBackgroundStore();

  const project = cards.find(
    (card) => 'projectData' in card && card.id.toString() === id
  );

  useEffect(() => {
    if (!project || !contentRef.current || !headerRef.current) return;

    const { gradient } = project.projectData.theme || {};
    const fromColor = gradient?.from || '#0d1115';
    const toColor = gradient?.to || '#1a2632';

    // Start background transition
    beginTransition(true, fromColor, toColor);

    // Animate content and header
    gsap.set([contentRef.current, headerRef.current], { opacity: 0 });
    gsap.to([contentRef.current, headerRef.current], {
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
      delay: 0.3,
    });
  }, [project, beginTransition]);

  const onClose = () => {
    if (!project) return;

    const defaultFromColor = '#0d1115';
    const defaultToColor = '#1a2632';

    // Reverse transition
    beginTransition(false, defaultFromColor, defaultToColor);

    // Animate content and header out
    gsap.to([contentRef.current, headerRef.current], {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out',
      onComplete: () => navigate('/'),
    });
  };

  useSmoothScroll(contentRef, {
    baseSpeed: 0.5,
    maxSpeed: 450,
    momentumDuration: 1.5,
    momentumEase: 'power4.out',
    velocityThreshold: 100,
  });

  if (!project || !('projectData' in project)) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-500">Project not found</p>
      </div>
    );
  }

  const theme = project.projectData.theme;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden z-50"
      style={{ color: theme?.textColor || '#CCDAE5' }}
    >
      <ReadingProgress
        targetRef={contentRef}
        fromColor={theme?.gradient?.from || '#0D1115'}
        toColor={theme?.gradient?.to || '#1A2632'}
      />
      <div ref={headerRef} className="fixed top-0 left-0 right-0 z-20">
        <ProjectHeader
          title={project.title}
          onClose={onClose}
          onScrollToTop={scrollToTop}
          showTitle={showHeaderTitle}
        />
      </div>
      <div
        ref={contentRef}
        className="relative h-full overflow-y-auto px-9 md:px-9 scrollbar-hide z-10"
        style={{
          paddingTop: '80px',
          paddingBottom: '120px',
          opacity: 0,
        }}
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
