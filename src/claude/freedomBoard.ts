import { Project } from "../types";
import { workInProgressIcon } from "../../../assets/images/projects";

export const freedomBoard: Project = {
  name: "Automated Freedom Board",
  type: "Software Development",
  timeline: "Apr 2024 - Ongoing",
  status: "In Progress",
  githubUrl: "https://github.com/example/freedom-board",
  cardOverview: "Automated message board to Instagram pipeline.",
  theme: {
    gradient: {
      from: "#102A43",
      to: "#223E4A",
    },
    textColor: "#ffffff",
  },
  content: [
    {
      type: "heading",
      content: "Work In Progress",
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
