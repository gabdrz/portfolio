import { Project } from "../types";
import { doctorAppIcon } from "../../../assets/images/projects";

export const doctorsAppointment: Project = {
  name: "Doctors Appointment App Design",
  type: "UX Design",
  timeline: "January 2023",
  status: "Completed",
  liveUrl: "https://example.com/doctor-app",
  cardOverview: "Voice-assisted medical appointment scheduling interface.",
  heroImage: doctorAppIcon,
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
      content: "This case study covers a responsive voice-assisted application developed to simplify the process of booking doctor's appointments. It integrates voice recognition technology within a user-friendly interface, accessible across multiple devices, including smartphones, tablets, and wearable technology.",
      layout: "contained",
    },
    {
      type: "heading",
      content: "The Problem",
      layout: "contained"
    },
    {
      type: "paragraph",
      content: "The process of scheduling doctor's appointments currently presents significant challenges due to its complexity, especially for users with accessibility needs. Traditional systems often lack streamlined interfaces and are not equipped with voice-assistance capabilities, leading to an inefficient and sometimes inaccessible booking experience.",
      layout: "contained"
    },
    {
      type: "heading",
      content: "Research Insights",
      layout: "contained"
    },
    {
      type: "paragraph",
      content: "User research revealed key pain points: voice interaction limitations in existing systems, difficulty in saving and applying user preferences, limited support for various languages and speech patterns, and concerns over the handling of sensitive health information.",
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
      content: "The application features a central dynamic screen displaying interactive elements and transcriptions, enhancing accessibility for a wide range of users. The design focuses on functional simplicity, allowing users to manage appointments and personal health information efficiently.",
      layout: "contained"
    },
    {
      type: "image",
      content: "/path/to/interface-elements.jpg",
      layout: "wide",
      className: "rounded-xl shadow-lg"
    },
    {
      type: "heading",
      content: "Accessibility Features",
      layout: "contained"
    },
    {
      type: "paragraph",
      content: "Real-time transcription of voice interactions enhances accessibility for users with hearing challenges. Language, font size, colors, and contrast settings are fully customizable, while call-to-action buttons are prominently displayed and sized generously for easy touch navigation.",
      layout: "contained"
    },
    {
      type: "image",
      content: "/path/to/accessibility-features.jpg",
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
      content: "The design's dynamic screens were particularly effective in engaging users. This adaptability allowed for a personalized and streamlined experience, as users interacted with the app through voice commands or traditional inputs. The AI's ability to present information contextually led to increased user satisfaction and engagement.",
      layout: "contained"
    }
  ],
};