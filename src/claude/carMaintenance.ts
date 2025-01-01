import { Project } from "../types";
import { workInProgressIcon } from "../../../assets/images/projects";

export const carMaintenance: Project = {
    name: 'Car Maintenance App',
    type: 'Software Development',
    timeline: 'Feb 2024 - Apr 2024',
    status: 'Completed',
    githubUrl: 'https://github.com/example/car-maintenance',
    liveUrl: 'https://example.com/car-maintenance',
    cardOverview: "Smart tracking and maintenance alerts.",
    theme: {
      gradient: {
        from: '#1F2D3A',
        to: '#37404D'
      },
      textColor: '#ffffff'
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
