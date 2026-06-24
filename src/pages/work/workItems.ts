import type {WorkCardData} from "../../components/WorkCard/WorkCard";
import brikLogo from "../../assets/brik/brik-logo.jpg";
import algorandLogo from "../../assets/algo/algo-logo.webp";
import personalExplorationsImage from "../../assets/personal/t.png";
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
    description: "Project details coming soon.",
    role: "Details coming soon",
    time: "TBD",
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
    description: "Project details coming soon.",
    role: "Details coming soon",
    time: "TBD",
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
  {
    slug: "personal-explorations",
    title: "Personal Explorations",
    description:
      "A collection of self-directed visual, interaction, and product experiments.",
    role: "Creative Direction, Visual Design, Prototyping",
    time: "Ongoing",
    image: personalExplorationsImage,
    tags: ["Visual Design", "Interaction", "Creative Coding", "Prototyping"],
    cursorColor: "#ff00ff",
    cursorTextColor: "#111111",
  },
];
