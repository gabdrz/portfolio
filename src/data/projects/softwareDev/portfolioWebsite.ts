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
      content: "Built with React and TypeScript, this portfolio features a custom-designed vertical card navigation system with fluid GSAP animations. The architecture includes responsive layouts with Tailwind CSS, and an advanced scroll behavior system that handles both touch and mouse interactions. Key features include a dynamic side navigation, gradient-based reading progress indicator, and animated project transitions – all implemented with a focus on performance and smooth interactions.",
      layout: "contained"
    }
  ],
};
