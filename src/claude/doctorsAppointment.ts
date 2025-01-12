import { Project } from "../types";
import { 
  doctorAppIcon,
  painPoints,
  davidPersona,
  initialInterface,
  quickActions,
  bookingFlow,
  doctorProfiles,
  confirmationScreen,
} from "../../../assets/images/projects";

export const doctorsAppointment: Project = {
  name: "Doctors Appointment App Design",
  type: "UX Design",
  timeline: "January 2023",
  status: "Completed",
  liveUrl: "https://example.com/doctor-app",
  cardOverview: "Concept design for an accessible appointment app.",
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
      content: "Voice-Assisted Doctor's Appointment App",
      layout: "contained",
    },
    {
      type: "image",
      content: doctorAppIcon,
    },
    {
      type: "paragraph",
      content: "A responsive application integrating voice recognition technology with a visual interface for medical appointment scheduling. The system prioritizes accessibility through voice commands while maintaining comprehensive visual feedback for diverse user needs.",
      layout: "contained",
    },
    {
      type: "heading",
      content: "Understanding User Challenges",
      layout: "contained",
    },
    {
      type: "image",
      content: painPoints,
    },
    {
      type: "paragraph",
      content: "User research identified four critical limitations in current healthcare scheduling systems: inadequate voice interaction capabilities, inefficient preference management, limited language support, and privacy concerns in health information handling.",
      layout: "contained",
    },
    {
      type: "paragraph",
      content: "Analysis of existing systems revealed significant accessibility gaps, particularly in voice command integration and screen reader compatibility. These findings directed our development of voice-first interaction patterns.",
      layout: "contained",
    },
    {
      type: "heading",
      content: "Meeting Our Users",
      layout: "contained",
    },
    {
      type: "image",
      content: davidPersona,
    },
    {
      type: "paragraph",
      content: "The primary persona, David, represents users with visual impairments who require voice interaction for healthcare scheduling. His user journey highlighted specific technical requirements for voice recognition accuracy and screen reader integration.",
      layout: "contained",
    },
    {
      type: "heading",
      content: "Design Foundation",
      layout: "contained",
    },
    {
      type: "image",
      content: initialInterface,
    },
    {
      type: "paragraph",
      content: "The interface implements a voice-first design pattern through Bea, an AI assistant that processes natural language commands. The system maintains state awareness between voice and touch interactions, ensuring consistent feedback across both input methods.",
      layout: "contained",
    },
    {
      type: "paragraph",
      content: "Each interaction incorporates error prevention through confirmation steps and clear feedback mechanisms. The voice recognition system includes context-aware command processing to maintain accuracy during complex booking sequences.",
      layout: "contained",
    },
    {
      type: "heading",
      content: "Core Navigation",
      layout: "contained",
    },
    {
      type: "image",
      content: quickActions,
    },
    {
      type: "paragraph",
      content: "The quick-action dashboard implements a hierarchical navigation structure with six primary functions. Each action supports both voice commands and touch interaction, with ARIA labels and role attributes ensuring screen reader compatibility.",
      layout: "contained",
    },
    {
      type: "heading",
      content: "Booking Experience",
      layout: "contained",
    },
    {
      type: "image",
      content: bookingFlow,
    },
    {
      type: "paragraph",
      content: "The appointment workflow follows a linear progression with state management for incomplete bookings. Voice commands map to specific booking stages, allowing users to navigate forward or backward through the scheduling process while maintaining data persistence.",
      layout: "contained",
    },
    {
      type: "heading",
      content: "Finding the Right Doctor",
      layout: "contained",
    },
    {
      type: "image",
      content: doctorProfiles,
    },
    {
      type: "paragraph",
      content: "Doctor profiles implement a card-based UI pattern with standardized data structures for consistent information display. The interface sorts and filters options based on specialty, location, and availability while maintaining voice navigation capability.",
      layout: "contained",
    },
    {
      type: "paragraph",
      content: "The scheduling interface uses a responsive calendar component with voice-activated date selection and real-time availability checking. Each time slot interaction includes conflict detection and automated confirmation routing.",
      layout: "contained",
    },
    {
      type: "heading",
      content: "Final Implementation",
      layout: "contained",
    },
    {
      type: "image",
      content: confirmationScreen,
    },
    {
      type: "paragraph",
      content: "The confirmation system implements secure session management and appointment verification. Real-time updates reflect booking status changes, while push notifications handle appointment reminders and modification alerts.",
      layout: "contained",
    },
    {
      type: "heading",
      content: "Impact & Next Steps",
      layout: "contained",
    },
    {
      type: "paragraph",
      content: "The implementation demonstrates the viability of voice-assisted healthcare scheduling. Initial feedback highlights the effectiveness of combining voice commands with visual interfaces for improved accessibility.",
      layout: "contained",
    },
    {
      type: "paragraph",
      content: "Future development will focus on expanding language support, implementing healthcare provider integrations, and enhancing natural language processing capabilities.",
      layout: "contained",
    },
    {
      type: "spacer",
      content: "",
      layout: "contained",
    },
    {
      type: "paragraph",
      content: "Experience the booking process through the **[desktop](https://www.figma.com/proto/UFTebgyj9gTqed08OTPy2s/Voice-Assistant-for-Doctor's-Appointments?page-id=1%3A3&node-id=101-7297&p=f&viewport=428%2C408%2C0.08&t=tchE2LNb08Rw01nA-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=101%3A7297&show-proto-sidebar=1)** or **[mobile](https://www.figma.com/proto/UFTebgyj9gTqed08OTPy2s/Voice-Assistant-for-Doctor's-Appointments?page-id=1%3A3&node-id=61-11599&p=f&viewport=428%2C408%2C0.08&t=tchE2LNb08Rw01nA-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=61%3A11599&show-proto-sidebar=1)** Figma prototype.",
      layout: "contained",
      className: "font-bold text-start"
    }

  ],
};