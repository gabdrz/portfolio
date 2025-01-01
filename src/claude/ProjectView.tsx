// src/components/project/ProjectView.tsx
import React, { useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { cards } from "../../data/cards";
import { ProjectHeader } from "./ProjectHeader";
import { ProjectContent } from "./ProjectContent";
import { useProjectBackground } from "../../hooks/useProjectBackground";
import { useSharedElement } from "../../hooks/useSharedElement";
import { useProjectHeader } from "../../hooks/useProjectHeader";

interface LocationState {
  flipState?: Flip.FlipState;
}

const ProjectView: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const { showHeaderTitle } = useProjectHeader(contentRef, headerRef);

  const project = cards.find(
    (card) => "projectData" in card && card.id.toString() === id
  );

  const { createFlipTransition, getSharedElements, transition } =
    useSharedElement();

  useEffect(() => {
    if (
      !project ||
      !contentRef.current ||
      !backgroundRef.current ||
      !headerRef.current
    )
      return;

    const targetImage = contentRef.current.querySelector("img");
    if (!targetImage) return;

    const tl = gsap.timeline();

    // Initial states
    gsap.set([contentRef.current, headerRef.current], { opacity: 0 });
    gsap.set(backgroundRef.current, { opacity: 0 });

    // Background fade-in
    tl.to(backgroundRef.current, {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
      overwrite: false,
    });

    // Flip transition if state exists
    if (state?.flipState) {
      tl.add(() => {
        createFlipTransition(targetImage as HTMLElement, state.flipState, {
          duration: 0.5,
          onComplete: () => {
            targetImage.style.opacity = "1";
          },
        });
      });
    }

    // Fade-in content and header
    tl.to(
      [contentRef.current, headerRef.current],
      {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      },
      "-=0.2"
    );
  }, [project, state, createFlipTransition]);

  const onClose = () => {
    const sourceId = `project-image-${project?.id}`;
    const targetImage = contentRef.current?.querySelector("img") as HTMLElement;

    if (targetImage) {
      const { fromElement, canTransition } = getSharedElements(
        sourceId,
        targetImage.id
      );

      if (canTransition && fromElement) {
        const tl = gsap.timeline({
          onComplete: () => navigate("/"),
        });

        // Fade-out content and header
        tl.to(
          [contentRef.current, headerRef.current],
          {
            opacity: 0,
            duration: 0.3,
            ease: "power2.out",
          },
          0
        );

        // Flip transition
        tl.add(() => {
          transition(targetImage, fromElement, {
            duration: 0.5,
            ease: "power2.inOut",
          });
        }, "-=0.2");

        // Fade-out background
        tl.to(
          backgroundRef.current,
          {
            opacity: 0,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.2"
        );

        return;
      }
    }

    // Fallback if no shared element
    gsap.to([contentRef.current, headerRef.current, backgroundRef.current], {
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => navigate("/"),
    });
  };

  const theme = project?.projectData.theme;

  useProjectBackground({
    fromColor: theme?.gradient?.from || "#0D1115",
    toColor: theme?.gradient?.to || "#0D1115",
    contentRef,
    containerRef,
    backgroundRef,
  });

  if (!project || !("projectData" in project)) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden z-50"
      style={{ color: theme?.textColor || "#CCDAE5" }}
    >
      <div
        ref={backgroundRef}
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundColor: theme?.gradient?.from || "#0D1115",
        }}
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
        className="relative h-full overflow-y-auto px-9 md:px-9 scrollbar-hide z-10"
        style={{ paddingTop: "80px", paddingBottom: "120px", opacity: 0 }}
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
