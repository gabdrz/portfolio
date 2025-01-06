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
  finalScreens,
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
      content: "Rocket League Sideswipe's dynamic gameplay and thrilling mechanics show strong potential in mobile gaming. However, complex navigation, disconnected features, and limited social tools create barriers to player retention. This UX refresh focuses on streamlining core interactions and enhancing social connectivity to match the game's exceptional gameplay quality.",
      layout: "contained",
    },

    {
      type: "heading",
      content: "Understanding the Problem Space",
      layout: "contained",
    },
    {
      type: "image",
      content: rlChallenges,
    },
    {
      type: "paragraph",
      content: "Reaching Champion II rank provided direct insight into the game's usability challenges. The interface requires multiple taps for basic actions, with critical features buried in nested menus. Training modules lack clear skill progression, while garage and loadout screens serve as static displays rather than interactive hubs.",
      layout: "contained",
    },
    {
      type: "paragraph",
      content: "UX analysis revealed deeper structural issues. The separation of Rocket Pass and Challenges forces unnecessary context switching, while hidden social features limit player interactions. The bottom navigation creates ergonomic challenges on mobile devices, compounded by unclear iconography and labeling.",
      layout: "contained",
    },

    {
      type: "heading",
      content: "Mapping User Flows",
      layout: "contained",
    },
    {
      type: "image",
      content: rlInitialFlow,
    },
    {
      type: "paragraph",
      content: "The initial user flow revealed significant inefficiencies in daily interactions. Players navigate through multiple screens to access inventory, while collections and garage customization exist in separate sections despite serving similar purposes. Social features remain isolated, requiring users to exit current screens to interact with friends or check online status.",
      layout: "contained",
    },

    {
      type: "heading",
      content: "Streamlined Navigation",
      layout: "contained",
    },
    {
      type: "image",
      content: rlRevisedFlow,
    },
    {
      type: "paragraph",
      content: "The redesigned flow eliminates redundant paths and consolidates related features. Rocket Pass and Challenges now work together in a unified progression system, while persistent social overlays enable quick access to friends and party features. Training modules provide direct access to specific skills, reducing the steps needed for focused practice.",
      layout: "contained",
    },

    {
      type: "heading",
      content: "Interface Refinement",
      layout: "contained",
    },
    {
      type: "image",
      content: rlMenuComparison,
    },
    {
      type: "paragraph",
      content: "The main menu overhaul introduces a vertical tab system optimized for mobile ergonomics. The darker theme improves visual hierarchy, while a persistent friends list enables seamless social interaction. Core features like game mode selection and player statistics now require fewer taps to access.",
      layout: "contained",
    },
    {
      type: "paragraph",
      content: "Navigation improvements extend beyond layout changes. The removal of redundant screens like separate collections and loadout views streamlines the customization process. Clear button labeling and intuitive iconography reduce cognitive load, while the hamburger menu provides organized access to auxiliary features.",
      layout: "contained",
    },

    {
      type: "heading",
      content: "Social Enhancement",
      layout: "contained",
    },
    {
      type: "image",
      content: rlFriendsList,
    },
    {
      type: "paragraph",
      content: "The revamped social interface prioritizes player connections and quick interactions. Direct invite buttons eliminate extra navigation steps, while the persistent friend list shows real-time player status. The streamlined design removes clutter by integrating party management directly into the main interface, encouraging more spontaneous multiplayer sessions.",
      layout: "contained",
    },

    {
      type: "heading",
      content: "Training & Customization",
      layout: "contained",
    },
    {
      type: "image",
      content: rlTrainingGarage,
    },
    {
      type: "paragraph",
      content: "Training receives a focused redesign to support targeted skill development. Players can now select specific techniques to practice, with clear progression tracking and immediate access to relevant drills. The garage interface combines car selection and customization into a single, interactive view that showcases player creativity while reducing navigation complexity.",
      layout: "contained",
    },

    {
      type: "heading",
      content: "Impact & Learning",
      layout: "contained",
    },
    {
      type: "image",
      content: finalScreens, // Final key screens showcase
    },
    {
      type: "paragraph",
      content: "The refreshed interface significantly reduces the steps needed for core actions while enhancing feature discovery and social engagement. Unified progression systems and streamlined customization tools create a more cohesive experience that supports both casual and competitive play styles.",
      layout: "contained",
    },
    {
      type: "paragraph",
      content: "This project highlighted the importance of balancing feature accessibility with interface simplicity in mobile gaming. Future iterations could explore deeper social integration through clan systems and expanded training analytics to further support player growth and community building.",
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
  ]
};
