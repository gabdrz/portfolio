import { Project } from "../types";
import { seatWebIcon } from "../../../assets/images/projects";

export const seatReservationWeb: Project = {
  name: "Seat Reservation Website Design",
  type: "UX Design",
  timeline: "November 2023 to December 2023",
  status: "Completed",
  liveUrl: "https://example.com/seat-reservation",
  cardOverview: "Web-based seat booking interface.",
  image: seatWebIcon,
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
      content: "Movie Theater Seat Reservation Web",
      layout: "contained",
    },
    {
      type: "image",
      content: seatWebIcon,
    },
    {
      type: "paragraph",
      content: "The design presented is an intuitive, user-centered seat reservation application tailored for cinema enthusiasts. With a focus on responsive and adaptive design principles, this application offers a streamlined process for selecting and booking movie seats across various devices and platforms.",
      layout: "contained",
    },
    {
      type: "heading",
      content: "The Problem",
      layout: "contained"
    },
    {
      type: "paragraph",
      content: "The existing seat reservation process for movie theaters was riddled with unnecessary steps and confusing interfaces, causing patrons to experience undue frustration and longer booking times.",
      layout: "contained"
    },
    {
      type: "heading",
      content: "User Research Findings",
      layout: "contained"
    },
    {
      type: "paragraph",
      content: "Our research identified key pain points: complex navigation requiring redesign for intuitive booking, limited seat information needing 3D preview integration, inflexible scheduling that needed seat-first options, and overwhelming interface options requiring simplification.",
      layout: "contained"
    },
    {
      type: "image",
      content: "/path/to/research-findings.jpg",
      layout: "wide",
      className: "rounded-xl shadow-lg"
    },
    {
      type: "heading",
      content: "Design Solution",
      layout: "contained"
    },
    {
      type: "paragraph",
      content: "The solution prioritizes intuitive navigation with direct access to movie times, and a hassle-free booking system that adjusts to individual preferences and accessibility needs. Our design features intuitive 'Details' and 'Tickets' buttons directly on movie highlights, streamlining user interaction.",
      layout: "contained"
    },
    {
      type: "image",
      content: "/path/to/design-solution.jpg",
      layout: "wide",
      className: "rounded-xl shadow-lg"
    },
    {
      type: "heading",
      content: "Impact",
      layout: "contained"
    },
    {
      type: "paragraph",
      content: "The design innovations resonated well with users, providing a more streamlined and enjoyable interface. Feedback indicated that users found the system straightforward, allowing them to reserve seats with ease, while the 3D seat view significantly enhanced their pre-visit planning experience.",
      layout: "contained"
    }
  ],
};