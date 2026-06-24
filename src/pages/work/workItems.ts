import type { WorkCardData } from "../../components/WorkCard/WorkCard";
import brikLogo from "../../assets/brik/brik-logo.jpg";
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
    tags: ["Coming Soon"],
    cursorColor: "#118cf2",
    cursorTextColor: "#ffffff",
  },
];
