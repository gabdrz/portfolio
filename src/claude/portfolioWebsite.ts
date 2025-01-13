import { Project } from "../types";
import { portfolioIcon, development } from "../../../assets/images/projects";

export const portfolioWebsite: Project = {
  name: "Portfolio Website Redesign",
  type: "Software Development",
  timeline: "Jan 2024 - Feb 2024",
  status: "Active",
  githubUrl: "https://github.com/example/portfolio",
  liveUrl: "https://example.com/portfolio",
  cardOverview: "First professional web presence.",
  theme: {
    gradient: {
      from: "#111827",
      to: "#2D3748",
    },
    textColor: "#ffffff",
  },
  content: [
    {
      type: "heading",
      content: "Portfolio Website",
      layout: "contained",
    },
    {
      type: "image",
      content: portfolioIcon,
    },
    {
      type: "paragraph",
      content:
        "The portfolio website is built with React, TypeScript and Vite, implementing a vertical card-scrolling interface. The architecture consists of an App component routing between two primary views: Cards and ProjectView. The Cards component manages a scrollable container of four card types (ContentCard, HeaderCard, LinksCard, ProjectCard), each serving distinct content purposes. State management uses Zustand through backgroundStore.ts, controlling gradient transitions based on scroll position and active cards. The Background component handles color transitions and animations through GSAP, with separate states for card view and project view. Navigation uses React Router for project routing and a custom SideNav system displaying scroll indicators. Project content rendering occurs through ProjectView, which breaks down content into typed blocks (Block interface) including headings, paragraphs, images, galleries, quotes, and spacers. The component structure is organized into cards/, nav/, and project/ subdirectories, with project/blocks/ containing individual block type components. Animation control uses GSAP throughout the application, managed through custom hooks: useScrollBehavior handles scroll physics with momentum and snap points, useCardAnimations manages card transitions, useInitialLoad controls loading sequences, and useProjectHeader handles header behavior. Additional hooks manage viewport calculations (useViewportHeight), device detection (useTouchDevice), and smooth scrolling (useSmoothScroll). The application implements separate mobile and desktop layouts through Tailwind CSS, with responsive breakpoints at 768px. Touch and mouse interaction use dedicated event handlers in eventHandlers.ts, managing scroll behavior, drag interactions, and momentum scrolling. File operations utilize window.fs.readFile for loading assets. TypeScript interfaces define clear contracts for cards, projects, and UI components in types/. External library integration includes recharts for charts, lucide-react for icons, with configurations for rendering SVG, markdown, and HTML content. Asset management occurs in assets/, containing project images and documents. Data structure in data/ separates projects into UX Design and Software Development categories, each with typed project definitions. The hooks/ directory contains 16 specialized hooks managing animations, scroll behavior, touch interactions, and component lifecycles. Utils/ provides shared functions for event handling, image processing, scroll calculations, and navigation helpers. Error handling implements React error boundaries with fallback UI states. The build process uses Vite with TypeScript, while styling combines Tailwind CSS utilities with GSAP animations. All animations use GSAP's timeline feature for orchestration, with hardware acceleration enabled through transform properties. Project content is structured through a Block type system, allowing standardized rendering across different project types while maintaining type safety.",
      layout: "contained",
    },
    {
      type: "heading",
      content: "Development Workflow",
      layout: "contained",
    },
    {
      type: "image",
      content: development,
      layout: "contained",
    },
    {
      type: "paragraph",
      content:
        "Development follows a structured workflow centered around problem decomposition and iterative solutions. A custom Python script manages project documentation by generating a comprehensive file structure tree and organizing readable files for AI-assisted development. This approach enables systematic analysis of the codebase and efficient problem-solving through a ticket-based system. Each development task is tracked through history, current, and pending states, allowing for focused progression through complex features while maintaining clear documentation of implementation decisions. Additionally, the project leverages GitHub for version control, collaborative development, and deployment to GitHub Pages, ensuring seamless updates and a consistent live environment. This methodical approach has proven particularly effective for managing the portfolio's numerous interconnected components, from the scrolling system to the state management architecture.",
      layout: "contained",
    },    
    {
      type: "spacer",
      content: "",
      layout: "contained",
    },
    {
      type: "paragraph",
      content:
        "View the **[source code on GitHub](https://github.com/gabdrz/portfolio/tree/feature/deployment-prep)**.",
      layout: "contained",
      className: "font-bold text-start",
    },
  ],
};
