import type { WorkCardData } from "../../components/WorkCard/WorkCard";
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
  },
];
