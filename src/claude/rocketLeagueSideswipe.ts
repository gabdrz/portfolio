import { Project } from "../types";
import { rocketLeagueIcon } from "../../../assets/images/projects";

export const rocketLeagueSideswipe: Project = {
  name: "RL Sideswipe UX Refresh",
  type: "UX Design",
  timeline: "Jan 2024 - Mar 2024",
  status: "Completed",
  liveUrl: "https://example.com/rocket-league",
  cardOverview: "Enhanced interface and feature expansion.",
  heroImage: rocketLeagueIcon,
  theme: {
    gradient: {
      from: "#0A1B37",
      to: "#1E3A47",
    },
    textColor: "#ffffff",
  },
  content: [
    {
      type: "heading",
      content: "RL Sideswipe UX Refresh",
      layout: "contained",
    },
    {
      type: "image",
      content: rocketLeagueIcon,
    },
    {
      type: "paragraph",
      content:
        "With its dynamic gameplay and thrilling mechanics, Rocket League Sideswipe had the potential to dominate mobile gaming. However, a lack of streamlined navigation, cohesive features, and engaging interfaces hindered its growth. My UX refresh aimed to tackle these challenges, balancing functionality and aesthetics to enhance player engagement.",
      layout: "contained",
    },
    {
      type: "heading",
      content: "Background and Objectives",
      layout: "contained",
    },
    {
      type: "paragraph",
      content:
        "Drawing from my experience as a player and UX designer, I identified key challenges hindering the game/'s usability. These included navigation inefficiencies, limited social interactions, and a lack of interactivity in key features like the garage and loadout. My objectives were to streamline user flows, enhance functionality, and improve the overall information architecture.",
      layout: "contained",
    },
    {
      type: "image",
      content: "challenges-summary.png", // Replace with your final annotated screenshot of challenges
      layout: "full-width",
    },
    {
      type: "heading",
      content: "The Initial State: Challenges Identified",
      layout: "contained",
    },
    {
      type: "paragraph",
      content:
        "The original user flow had redundancies and inefficiencies. Features like inventory access required multiple taps, social features were buried, and the overall layout lacked cohesion. These issues made the experience less intuitive for players.",
      layout: "contained",
    },
    {
      type: "image",
      content: "initial-user-flow.png", // Replace with your flowchart of the initial user flow
      layout: "full-width",
    },
    {
      type: "heading",
      content: "Streamlining User Flows",
      layout: "contained",
    },
    {
      type: "paragraph",
      content:
        "Revised user flows eliminated unnecessary steps and grouped related features. For example, Rocket Pass and Challenges were combined to create a cohesive experience, and social overlays were made persistent for easier access.",
      layout: "contained",
    },
    {
      type: "image",
      content: "revised-user-flow.png", // Replace with your flowchart of the revised user flow
      layout: "full-width",
    },
    {
      type: "heading",
      content: "A Cohesive and Intuitive Main Menu",
      layout: "contained",
    },
    {
      type: "paragraph",
      content:
        "The main menu was redesigned for simplicity and efficiency. Persistent friend overlays were added, redundant buttons were removed, and a darker theme with better button placement improved accessibility.",
      layout: "contained",
    },
    {
      type: "image",
      content: "main-menu-before.png", // Replace with a screenshot of the original main menu
      layout: "half-width",
    },
    {
      type: "image",
      content: "main-menu-after.png", // Replace with a screenshot of the redesigned main menu
      layout: "half-width",
    },
    {
      type: "heading",
      content: "Fostering Community Engagement",
      layout: "contained",
    },
    {
      type: "paragraph",
      content:
        "Social features were overhauled to encourage player interaction. Friend invites were streamlined, and online friends became persistently visible, making it easier to connect and play.",
      layout: "contained",
    },
    {
      type: "image",
      content: "friends-list-before.png", // Replace with a screenshot of the original friends list
      layout: "half-width",
    },
    {
      type: "image",
      content: "friends-list-after.png", // Replace with a screenshot of the revised friends list
      layout: "half-width",
    },
    {
      type: "heading",
      content: "Empowering Players Through Training and Customization",
      layout: "contained",
    },
    {
      type: "paragraph",
      content:
        "Training modules were redesigned to focus on specific skills, while the garage and loadout screens became more interactive and visually engaging.",
      layout: "contained",
    },
    {
      type: "image",
      content: "training-tutorial.png", // Replace with a screenshot of the redesigned training selection screen
      layout: "half-width",
    },
    {
      type: "image",
      content: "garage-revamp.png", // Replace with a screenshot of the revamped garage
      layout: "half-width",
    },
    {
      type: "heading",
      content: "Results and Impact",
      layout: "contained",
    },
    {
      type: "paragraph",
      content:
        "The refresh resulted in a more intuitive and engaging user experience. Players could navigate features with fewer taps, social interactions were seamless, and the aesthetic enhancements added to the game's overall appeal.",
      layout: "contained",
    },
    {
      type: "image",
      content: "results-feedback.png", // Replace with mock user feedback visualization or results summary
      layout: "full-width",
    },
    {
      type: "heading",
      content: "Reflection and Takeaways",
      layout: "contained",
    },
    {
      type: "paragraph",
      content:
        "This project taught me the importance of balancing functionality with visual appeal and considering diverse player needs. It reinforced my belief that great UX can transform even the most dynamic experiences.",
      layout: "contained",
    },
    {
      type: "spacer",
      content: "",
      layout: "contained",
    },
  ],
};
