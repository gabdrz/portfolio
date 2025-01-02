import { Project } from "../types";
import { workInProgressIcon } from "../../assets/images/projects";

export const workInProgress: Project = {
  name: "More Projects Soon",
  type: "Lorem Ipsum",
  timeline: "January 2023",
  status: "Work in progress",
  liveUrl: "https://example.com/doctor-app",
  cardOverview: "",
  heroImage: workInProgressIcon,
  theme: {
    gradient: {
      from: "#10393E",
      to: "#1F474A",
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
      content: "This page is currently being developed. Check back soon for a detailed breakdown of the projects, including research findings, design process, and final outcomes.",
      layout: "contained"
    },
    {
        type: "paragraph",
        content: "In the meantime,  **[Checkout my bento.me portfolio here.](https://bento.me/gabriel-zafra)**",
        layout: "contained",
        className: "text-start"
      }
  ],
};