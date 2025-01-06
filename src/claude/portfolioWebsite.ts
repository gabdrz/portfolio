import { Project } from "../types";
import { workInProgressIcon } from "../../../assets/images/projects";

export const portfolioWebsite: Project = {
  name: "Portfolio Website Redesign",
  type: "Software Development",
  timeline: "Jan 2024 - Feb 2024",
  status: "Completed",
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
      content: "Developed using React 18 and TypeScript, this portfolio implements a custom virtualized card-scroll system optimized for both desktop and mobile devices. The architecture leverages GSAP for hardware-accelerated animations, employs custom hooks for scroll physics, and utilizes Tailwind CSS for responsive layouts. Notable technical features include debounced scroll handlers, momentum-based animations, touch event normalization, and dynamic gradient transitions managed through WebGL shaders. The codebase follows a modular component structure with strict type safety and performance optimizations like React.memo and useCallback for critical render paths.",
      layout: "contained"
    }
  ],
};
