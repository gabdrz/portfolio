import { Project } from "../types";
import {
  freedomBoardIcon,
  workflow,
  consoleDashboard,
  dataArchitecture,
  templateGeneration,
  futureInterface,
} from "../../../assets/images/projects";

export const freedomBoard: Project = {
  name: "Automated Freedom Board",
  type: "Software Development",
  timeline: "Apr 2024 - Ongoing",
  status: "Paused",
  githubUrl: "https://github.com/example/freedom-board",
  cardOverview: "Streamlined message board system.",
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
      content: "The Automated Freedom Board started from observing RU Missed Connections, an Instagram profile where students share anonymous messages. The admin manually processed hundreds of messages daily by copying text, taking screenshots, cropping images, and posting in batches. This inefficient process led to the development of an automated solution.",
      layout: "contained",
    },
    {
      type: "heading",
      content: "Problem Analysis",
      layout: "contained",
    },
    {
      type: "image",
      content: workflow,
    },
    {
      type: "paragraph",
      content: "The manual process involved managing hundreds of messages daily through direct messages, requiring constant attention for formatting and posting. This created a bottleneck in message distribution and limited the platform's potential for scaling.",
      layout: "contained",
    },
    {
      type: "heading",
      content: "Technical Architecture",
      layout: "contained",
    },
    {
      type: "image",
      content: consoleDashboard,
    },
    {
      type: "paragraph",
      content: "Development began by integrating Google Forms with Google Sheets for data collection. The process required setting up API authentication through Google Cloud Console and implementing data extraction methods. This foundation enabled automated message collection and storage.",
      layout: "contained",
    },
    {
      type: "heading",
      content: "Data Processing",
      layout: "contained",
    },
    {
      type: "image",
      content: dataArchitecture,
    },
    {
      type: "paragraph",
      content: "The system processes data using pandas for DataFrame operations and numpy for array manipulation. Content moderation runs through a filtering system before messages enter the image generation pipeline. This ensures appropriate content reaches the platform.",
      layout: "contained",
    },
    {
      type: "heading",
      content: "Template System",
      layout: "contained",
    },
    {
      type: "image",
      content: templateGeneration,
    },
    {
      type: "paragraph",
      content: "Message visualization uses Photoshop automation through pywin32, enabling programmatic control of text layers and export settings. The system generates consistent visuals from a template, maintaining brand identity across all posts.",
      layout: "contained",
    },
    {
      type: "heading",
      content: "Distribution Pipeline",
      layout: "contained",
    },
    {
      type: "paragraph",
      content: "Instagram integration presented challenges due to API limitations. The solution implements Instagrapi for automated posting, handling both single images and albums. The system includes automatic cleanup of processed submissions to maintain efficiency.",
      layout: "contained",
    },
    {
      type: "paragraph",
      content: "While Instagram integration initially used Instagrapi for automated posting, recent issues have arisen due to the account used for API access being banned. Instagram flagged the account for suspicious activity, leading to notifications and disruptions in the distribution pipeline. This has rendered the API outdated for the project, necessitating exploration of alternative methods or platforms for seamless content delivery.",
      layout: "contained",
    },    
    {
      type: "heading",
      content: "Future Development",
      layout: "contained",
    },
    {
      type: "image",
      content: futureInterface,
    },
    {
      type: "paragraph",
      content: "The project's next phase focuses on developing a web interface for easier management, removing Photoshop dependency through a custom template system, and implementing cloud deployment. These improvements will make the system more accessible to other communities.",
      layout: "contained",
    },
    {
      type: "spacer",
      content: "",
      layout: "contained",
    },
    {
      type: "paragraph",
      content: "Explore the **[project on GitHub](https://github.com/gabdrz/Automated-Freedom-Board)**.",
      layout: "contained",
      className: "font-bold text-start"
    }
  ],
};