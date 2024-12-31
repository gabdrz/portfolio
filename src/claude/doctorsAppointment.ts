import { Project } from "../types";
import { doctorAppIcon } from "../../../assets/images/projects";

export const doctorsAppointment: Project = {
  name: "Doctors Appointment App Design",
  type: "UX Design",
  timeline: "Mar 2024 - Apr 2024",
  status: "Completed",
  liveUrl: "https://example.com/doctor-app",
  cardOverview: "Streamlined medical appointment scheduling interface.",
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
      content: "Doctors Appointment App Design",
      layout: "contained",
    },
    {
      type: "image",
      content: doctorAppIcon,
    },
    {
      type: "paragraph",
      content:
        "The healthcare industry has long struggled with efficient appointment scheduling. We set out to create a mobile application that would make booking and managing medical appointments as simple as ordering food delivery.",
      layout: "contained",
    },
    {
      type: "image",
      content: "/path/to/app-screens.jpg",
      layout: "wide",
      className: "rounded-xl shadow-lg",
    },
    {
      type: "heading",
      content: "User Research Insights",
      layout: "contained",
    },
  ],
};
