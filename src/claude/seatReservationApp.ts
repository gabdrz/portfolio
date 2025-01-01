import { Project } from "../types";
import { workInProgressIcon } from "../../../assets/images/projects";

export const seatReservationApp: Project = {
  name: "Seat Reservation App Design",
  type: "UX Design",
  timeline: "Apr 2024 - May 2024",
  status: "Completed",
  liveUrl: "https://example.com/seat-reservation-app",
  cardOverview: "Mobile seat booking experience.",
  theme: {
    gradient: {
      from: "#1A1425",
      to: "#312A3F",
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
