import { Project } from "../types";
import { workInProgressIcon } from "../../../assets/images/projects";

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
      content: workInProgressIcon,
    },
    {
      type: "paragraph",
      content: "The portfolio website is built with React and TypeScript, implementing a vertical card-scrolling interface. The core architecture consists of a Cards component managing multiple card types (ContentCard, HeaderCard, LinksCard, ProjectCard) within a scrollable container. A Zustand-based background store (backgroundStore.ts) controls gradient transitions based on scroll position and active cards. Navigation uses both React Router and a custom side navigation system (SideNav) displaying scroll position indicators. The project view system renders content through the ProjectView component, breaking down content into typed blocks (headings, paragraphs, images, galleries) based on structured project data. Animation handling is managed through GSAP, with custom hooks controlling scroll physics (useScrollBehavior), card transitions (useCardAnimations), loading sequences (useInitialLoad), and project header behavior (useProjectHeader). The application implements responsive design through Tailwind CSS, with distinct mobile and desktop layouts. Touch interaction is handled through custom event handlers for both card scrolling and navigation. File operations utilize a window.fs.readFile API for managing various file types (images, PDFs, documents). The type system is built in TypeScript with comprehensive definitions for cards, projects, and UI components. External libraries integrate additional functionality: recharts for data visualization, lucide-react for iconography, with support for SVG, markdown, and HTML content rendering. The application structure follows a modular pattern, separating components, hooks, utilities, and state management. Build processes use Vite, while styling combines Tailwind CSS with GSAP-powered animations. Performance optimizations include debounced scroll handlers, hardware-accelerated animations, and lifecycle management. Error handling and loading states are implemented throughout the component hierarchy. The file structure organizes code into distinct directories: components for UI elements, hooks for shared behaviors, store for state management, types for TypeScript definitions, and utils for shared functions. Each project content type (UX Design, Software Development) maintains separate data files with consistent type structures, allowing for standardized rendering across different project categories.",
      layout: "contained"
    },
    {
      type: "spacer",
      content: "",
      layout: "contained",
    },
    {
      type: "paragraph",
      content: "Want to see more? **[Go back to Card View here](back-to-cardview)**.",
      layout: "contained",
      className: "font-bold text-start"
    }
  ],
};
