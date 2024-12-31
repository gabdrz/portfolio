import { Project } from "../types";
import { freedomBoardIcon } from "../../../assets/images/projects";

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
      content: "Automated Freedom Board",
      layout: "contained",
    },
    {
      type: "image",
      content: freedomBoardIcon,
    },
    {
      type: "paragraph",
      content:
        "The Freedom Board project automates the process of curating and publishing content from message boards to Instagram, while maintaining brand consistency and engagement.",
      layout: "contained",
    },
  ],
};
