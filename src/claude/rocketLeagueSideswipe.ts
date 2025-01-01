import { Project } from "../types";
import { rocketLeagueIcon } from "../../../assets/images/projects";

import {
  rocketLeagueIcon,
  rlChallenges,
  rlInitialFlow,
  rlRevisedFlow,
  rlMenuComparison,
  rlFriendsList,
  rlTrainingGarage,
} from "../../../assets/images/projects";

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
      type: "image",
      content: rlChallenges,
      layout: "full-width",
    },
    {
      type: "paragraph",
      content:
        "Drawing from my experience as a player and UX designer, I identified key challenges hindering the game/'s usability. These included navigation inefficiencies, limited social interactions, and a lack of interactivity in key features like the garage and loadout. My objectives were to streamline user flows, enhance functionality, and improve the overall information architecture.",
      layout: "contained",
    },
    {
      type: "heading",
      content: "The Initial State: Challenges Identified",
      layout: "contained",
    },
    {
      type: "image",
      content: rlInitialFlow,
      layout: "full-width",
    },
    {
      type: "paragraph",
      content:
        "The original user flow had redundancies and inefficiencies. Features like inventory access required multiple taps, social features were buried, and the overall layout lacked cohesion. These issues made the experience less intuitive for players.",
      layout: "contained",
    },
    {
      type: "heading",
      content: "Streamlining User Flows",
      layout: "contained",
    },
    {
      type: "image",
      content: rlRevisedFlow,
      layout: "full-width",
    },
    {
      type: "paragraph",
      content:
        "Revised user flows eliminated unnecessary steps and grouped related features. For example, Rocket Pass and Challenges were combined to create a cohesive experience, and social overlays were made persistent for easier access.",
      layout: "contained",
    },
    {
      type: "heading",
      content: "A Cohesive and Intuitive Main Menu",
      layout: "contained",
    },
    {
      type: "image",
      content: rlMenuComparison,
      layout: "half-width",
    },
    {
      type: "paragraph",
      content:
        "The main menu was redesigned for simplicity and efficiency. Persistent friend overlays were added, redundant buttons were removed, and a darker theme with better button placement improved accessibility.",
      layout: "contained",
    },
    {
      type: "heading",
      content: "Fostering Community Engagement",
      layout: "contained",
    },
    {
      type: "image",
      content: rlFriendsList,
      layout: "half-width",
    },
    {
      type: "paragraph",
      content:
        "Social features were overhauled to encourage player interaction. Friend invites were streamlined, and online friends became persistently visible, making it easier to connect and play.",
      layout: "contained",
    },
    {
      type: "heading",
      content: "Empowering Players Through Training and Customization",
      layout: "contained",
    },
    {
        type: "image",
        content: rlTrainingGarage,
        layout: "half-width",
      },
    {
      type: "paragraph",
      content:
        "Training modules were redesigned to focus on specific skills, while the garage and loadout screens became more interactive and visually engaging.",
      layout: "contained",
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
    {
      type: "paragraph",
      content: "Want to see how it would work? **[View the high-fidelity prototype on Figma](https://www.figma.com/proto/6GM8lKFnH1U7eKUbvMucs6/Rocket-League-Sideswipe-UI-Refresh?node-id=98-1255&p=f&t=J1DssHG42tmO9X7R-1&scaling=scale-down-width&content-scaling=fixed&page-id=2%3A56&starting-point-node-id=98%3A1255)**",
      layout: "contained",
      className: "text-start"
    }
  ],
};
