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
      content: "This page is currently being developed. Check back soon for a detailed breakdown of the project, including research findings, design process, and final outcomes.",
      layout: "contained"
    }
  ],
};
