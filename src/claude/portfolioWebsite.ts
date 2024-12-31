import { Project } from "../types";
import { portfolioIcon } from "../../../assets/images/projects";

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
      content: "Portfolio Website Redesign",
      layout: "contained",
    },
    {
      type: "image",
      content: portfolioIcon,
    },
    {
      type: "paragraph",
      content:
        "When approaching my portfolio redesign, I wanted to create something that wasn't just a showcase of my work, but an experience that demonstrates my approach to design and development.",
      layout: "contained",
    },
    {
      type: "image",
      content: "/path/to/performance-metrics.jpg",
      layout: "wide",
      className: "rounded-xl shadow-lg",
    },
    {
      type: "paragraph",
      content:
        "Using React and GSAP, I built a custom scrolling system that provides smooth animations while maintaining responsive performance across all devices.",
      layout: "contained",
    },
  ],
};
