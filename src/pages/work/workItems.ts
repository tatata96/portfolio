import type {WorkCardData} from "../../components/WorkCard/WorkCard";
import brikLogo from "../../assets/brik/brik-logo.jpg";
import algorandLogo from "../../assets/algo/algo-logo.webp";
import projectImage from "../../assets/photify/photify-3d-yellow-bg-logo.jpeg";

export const workItems: WorkCardData[] = [
  {
    slug: "photify",
    title: "Photify",
    description:
      "An AI-powered event photo discovery platform that helps attendees find photos of themselves using facial recognition instead of manually searching through large event galleries.",
    role: "Product Design, Frontend, Backend",
    time: "2026",
    image: projectImage,
    tags: ["Mobile App", "AI", "Facial Recognition", "React Native", "Django"],
    cursorColor: "#f7d96b",
    cursorTextColor: "#2a2312",
  },
  {
    slug: "brik",
    title: "Brik",
    description:
      "An AI-powered workforce learning platform that helps frontline teams build skills through short, engaging lessons, progress tracking, and gamification mechanics.",
    role: "Mobile Development, Product Development",
    time: "2024–2025",
    image: brikLogo,
    tags: [
      "React Native",
      "Expo",
      "Mobile App",
      "EdTech",
      "AI",
      "Gamification",
      "Product Development",
    ],
    cursorColor: "#118cf2",
    cursorTextColor: "#ffffff",
  },
  {
    slug: "algorand",
    title: "Algorand",
    description:
      "Frontend development across the Algorand ecosystem — governance platforms, developer tools, analytics dashboards, and wallet integrations for a global blockchain audience.",
    role: "Frontend Development",
    time: "2020–2024",
    image: algorandLogo,
    tags: [
      "Blockchain",
      "Web3",
      "Frontend Development",
      "React",
      "TypeScript",
      "Governance",
      "Developer Tools",
      "Wallet Integration",
    ],
    cursorColor: "rgb(185, 239, 238)",
    cursorTextColor: "#111111",
  },
];
