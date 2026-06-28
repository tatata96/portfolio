import apartmentoVideo from "./apartmento.mp4";
import brief2Video from "./brief2.mp4";
import danielVideo from "./daniel.mp4";
import trainVideo from "../personal/train.mp4";
import galleryUniverseVideo from "./gallery-universe.mp4";
import istanbulVideo from "./istanbul.mp4";

import titresimPdf from "./titresim.pdf";
import titresimCover from "./titresim.png";
import oldWebsiteVideo from "./old-website.mp4";
import mouseInteractVideo from "./mouse-interact.mp4";
import websiteVideo from "./website.mp4";
import workVideo from "./drawings.mp4";

export type DumpAsset = {
  id: string;
  title: string;
  type: "image" | "video" | "pdf";
  src: string;
  coverSrc?: string;
  alt?: string;
  mediaWidth?: number;
  mediaHeight?: number;
  pageCount?: number;
  collectionId?: string;
  websiteUrl?: string;
  description: string;
  tags: string[];
  x: number;
  y: number;
  width: number;
  className?: string;
};

// All positions are in a 1440 × 900 reference frame
// x/y = center point of the asset
export const dumpAssets: DumpAsset[] = [
  {
    id: "daniel",
    title: "Daniel Jaeger Music",
    type: "video",
    src: danielVideo,
    websiteUrl: "https://danieljaegermusic.com/",
    description:
      "A freelance website for producer Daniel Jaeger, inspired by a DJ deck setup and built as a focused home for his music, production work, and booking contact.",
    tags: ["interfaces", "digital"],
    x: 245,
    y: 240,
    width: 385,
  },
  {
    id: "apartmento",
    title: "Apartmento",
    type: "video",
    src: apartmentoVideo,
    description:
      "A landing page experiment for Apartmento, using GSAP to explore expressive motion and playful transitions.",
    tags: ["motion", "interfaces", "digital"],
    x: 590,
    y: 150,
    width: 278,
  },
  {
    id: "brief2",
    title: "Brief Builder Motion",
    type: "video",
    src: brief2Video,
    collectionId: "brief-builder",
    description:
      "A landing page experiment for an agency website, built around Three.js interactions.\nThe page used falling interactive elements as a playful way to make the brief-building flow feel more physical.",
    tags: ["motion", "interfaces", "digital"],
    x: 1255,
    y: 165,
    width: 172,
  },
  {
    id: "work",
    title: "Where My Drawings Lived",
    type: "video",
    src: workVideo,
    description:
      "I built this website years ago as a home for my gouache paintings, watercolor pieces, and drawings. The site itself is long gone, but this video remains-a small archive of the work and the interface that held it together.",
    tags: ["interfaces", "digital", "paper"],
    x: 1260,
    y: 365,
    width: 288,
  },
  {
    id: "istanbul",
    title: "Istanbul Photography Project",
    type: "video",
    src: istanbulVideo,
    description:
      "A landing page concept for a photography website, built around the colors and textures of Istanbul.",
    tags: ["motion", "digital"],
    x: 1230,
    y: 570,
    width: 258,
  },
  {
    id: "train",
    title: "Ink to Motion",
    type: "video",
    src: trainVideo,
    description:
      "A hand-drawn poster that I later tried to bring to life in After Effects.",
    tags: ["motion", "paper"],
    x: 1070,
    y: 155,
    width: 278,
  },
  {
    id: "titresim",
    title: "Titresim",
    type: "pdf",
    src: titresimPdf,
    coverSrc: titresimCover,
    alt: "Titresim cover",
    pageCount: 19,
    description:
      "Titresim is what I'm choosing to call a graphic novel. It's 12 pages long, written and illustrated entirely by hand, and began life as a stack of ink-covered A4 sheets. I printed ten copies for friends and family.",
    tags: ["paper", "digital"],
    x: 185,
    y: 625,
    width: 138,
  },
  {
    id: "web",
    title: "Old Website Landing Page",
    type: "video",
    src: oldWebsiteVideo,
    description:
      "A recording of my old website's landing page. It used p5.js to make the typography react to the mouse, shifting the page from a static portfolio intro into a small interactive type experiment.",
    tags: ["motion", "interfaces", "digital"],
    x: 515,
    y: 735,
    width: 332,
  },
  {
    id: "website",
    title: "tamaraelf.xyz",
    type: "video",
    src: websiteVideo,
    websiteUrl: "https://tamaraelf.xyz",
    description:
      "My current portfolio website, still in progress. Built and designed by me.",
    tags: ["interfaces", "digital"],
    x: 880,
    y: 150,
    width: 278,
  },
  {
    id: "gallery-universe",
    title: "Gallery Universe",
    type: "video",
    src: galleryUniverseVideo,
    websiteUrl: "https://tamaraelf.xyz/writing/a03",
    description:
      "A package I built to explore a different way of browsing large collections. The idea, process, and implementation are documented in my writing.",
    tags: ["motion", "interfaces", "digital"],
    x: 880,
    y: 735,
    width: 332,
  },
  {
    id: "webb",
    title: "Web Landing Interaction",
    type: "video",
    src: mouseInteractVideo,
    description:
      "A landing page experiment built around interaction. The piece was a quick study in making the first screen feel more alive through motion and responsive interface behavior.",
    tags: ["motion", "interfaces", "digital"],
    x: 1255,
    y: 735,
    width: 225,
  },
];
