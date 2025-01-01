import { Project } from "../types";
import { workInProgressIcon } from "../../../assets/images/projects";

export const doctorsAppointment: Project = {
  name: "Doctors Appointment App Design",
  type: "UX Design",
  timeline: "January 2023",
  status: "Completed",
  liveUrl: "https://example.com/doctor-app",
  cardOverview: "Voice-assisted medical appointment scheduling interface.",
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
      content: "This page is currently being developed. Check back soon for a detailed breakdown of the project, including research findings, design process, and final outcomes.",
      layout: "contained"
    }
  ],
};