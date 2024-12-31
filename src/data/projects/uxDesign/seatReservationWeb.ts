import { Project } from "../types";
import { seatWebIcon } from "../../../assets/images/projects";

export const seatReservationWeb: Project = {
  name: "Seat Reservation Website Design",
  type: "UX Design",
  timeline: "Apr 2024 - May 2024",
  status: "Completed",
  liveUrl: "https://example.com/seat-reservation",
  cardOverview: "Interactive web-based seat booking system.",
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
      content: "Seat Reservation Website Design",
      layout: "contained",
    },
    {
      type: "image",
      content: seatWebIcon,
    },
    {
      type: "paragraph",
      content:
        "Seat selection is often the most frustrating part of booking an event or travel. We created a real-time, interactive seat selection interface that makes choosing the perfect spot a breeze.",
      layout: "contained",
    },
    {
      type: "image",
      content: "/path/to/seat-map.jpg",
      layout: "full",
      className: "rounded-xl shadow-lg",
    },
    {
      type: "quote",
      content: "The best seat in the house should be easy to find.",
      backgroundColor: "#2C5282",
    },
  ],
};
