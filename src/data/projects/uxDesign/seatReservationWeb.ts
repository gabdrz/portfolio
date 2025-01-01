import { Project } from "../types";
import { workInProgressIcon } from "../../../assets/images/projects";

export const seatReservationWeb: Project = {
  name: "Seat Reservation Website Design",
  type: "UX Design",
  timeline: "November 2023 to December 2023",
  status: "Completed",
  liveUrl: "https://example.com/seat-reservation",
  cardOverview: "Web-based seat booking interface.",
  image: workInProgressIcon,
  theme: {
    gradient: {
      from: "#0D1E2A",
      to: "#273F4D",
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