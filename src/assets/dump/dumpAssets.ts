import apartmentoVideo from "./apartmento.mp4";
import apartmentoPoster from "../poster/apartmento-poster.jpg";
import brief2Video from "./brief2.mp4";
import brief2Poster from "../poster/brief2-poster.jpg";
import danielVideo from "./daniel.mp4";
import danielPoster from "../poster/daniel-poster.jpg";
import trainVideo from "../personal/train.mp4";
import trainPoster from "../poster/train-poster.jpg";
import galleryUniverseVideo from "./gallery-universe.mp4";
import galleryUniversePoster from "../poster/gallery-universe-poster.jpg";
import istanbulVideo from "./istanbul.mp4";
import istanbulPoster from "../poster/istanbul-poster.jpg";
import contactVideo from "./contact.mp4";
import contactPoster from "../poster/contact-poster.jpg";

import titresimPdf from "./titresim.pdf";
import titresimCollage from "./collage.png";
import oldWebsiteVideo from "./old-website.mp4";
import oldWebsitePoster from "../poster/old-website-poster.jpg";
import studioVideo from "./studio.mp4";
import studioPoster from "../poster/studio-poster.jpg";
import websiteVideo from "./corner.mp4";
import websitePoster from "../poster/website-poster.jpg";
import workVideo from "./drawings.mp4";
import workPoster from "../poster/drawings-poster.jpg";

export type DumpAsset = {
  id: string;
  title: string;
  type: "image" | "video" | "pdf";
  src: string;
  coverSrc?: string;
  hoverSoundSrc?: string;
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
    coverSrc: danielPoster,
    websiteUrl: "https://danieljaegermusic.com/",
    description:
      "A freelance website for producer Daniel Jaeger, inspired by a DJ deck setup and built as a focused home for his music, production work, and booking contact.",
    tags: ["interfaces", "digital"],
    x: 245,
    y: 240,
    width: 385,
  },
  {
    id: "gallery-universe",
    title: "Gallery Universe",
    type: "video",
    src: galleryUniverseVideo,
    coverSrc: galleryUniversePoster,
    websiteUrl: "https://tamaraelf.xyz/writing/a03",
    description:
      "A package I built to explore a different way of browsing large collections. The idea, process, and implementation are documented in my writing.",
    tags: ["motion", "interfaces", "digital"],
    x: 880,
    y: 735,
    width: 332,
  },
  {
    id: "website",
    title: "tamaraelf.xyz",
    type: "video",
    src: websiteVideo,
    coverSrc: websitePoster,
    description:
      "My previous portfolio website had with cursor interaction with my favourite passage. Built and designed by me.",
    tags: ["interfaces", "digital"],
    x: 880,
    y: 150,
    width: 278,
  },
  {
    id: "istanbul",
    title: "Istanbul Photography Project",
    type: "video",
    src: istanbulVideo,
    coverSrc: istanbulPoster,
    description:
      "A landing page concept for a photography website, built around the colors and textures of Istanbul.",
    tags: ["motion", "digital"],
    x: 1230,
    y: 570,
    width: 258,
  },
  {
    id: "work",
    title: "Where My Drawings Lived",
    type: "video",
    src: workVideo,
    coverSrc: workPoster,
    description:
      "I built this website years ago as a home for my gouache paintings, watercolor pieces, and drawings. The site itself is long gone, but this video remains-a small archive of the work and the interface that held it together.",
    tags: ["interfaces", "digital", "paper"],
    x: 1260,
    y: 365,
    width: 288,
  },
  {
    id: "contact",
    title: "Contact Hover Interaction",
    type: "video",
    src: contactVideo,
    coverSrc: contactPoster,
    description: "Contact page hover interaction for my old website",
    tags: ["motion", "interfaces", "digital"],
    x: 245,
    y: 735,
    width: 332,
  },
  {
    id: "titresim",
    title: "Titresim",
    type: "pdf",
    src: titresimPdf,
    coverSrc: titresimCollage,
    alt: "Titresim mockup collage",
    pageCount: 19,
    description:
      "Titresim is what I'm choosing to call a graphic novel. It's 12 pages long, written and illustrated entirely by hand, and began life as a stack of ink-covered A4 sheets. I printed 20 copies for friends and family.",
    tags: ["paper", "digital"],
    x: 185,
    y: 625,
    width: 138,
  },
  {
    id: "brief2",
    title: "Brief Builder Motion",
    type: "video",
    src: brief2Video,
    coverSrc: brief2Poster,
    collectionId: "brief-builder",
    description:
      "A landing page experiment for an agency website, built around Three.js interactions.\nThe page used falling interactive elements as a playful way.",
    tags: ["motion", "interfaces", "digital"],
    x: 1255,
    y: 165,
    width: 172,
  },
  {
    id: "web",
    title: "Old Website Landing Page",
    type: "video",
    src: oldWebsiteVideo,
    coverSrc: oldWebsitePoster,
    description:
      "From my old website's landing page. I used p5.js to make the typography react to the mouse, a small interactive type experiment.",
    tags: ["motion", "interfaces", "digital"],
    x: 515,
    y: 735,
    width: 332,
  },
  {
    id: "train",
    title: "Ink to Motion",
    type: "video",
    src: trainVideo,
    coverSrc: trainPoster,
    description:
      "A hand-drawn poster that I later tried to bring to life in After Effects.",
    tags: ["motion", "paper"],
    x: 1070,
    y: 155,
    width: 278,
  },
  {
    id: "apartmento",
    title: "Apartmento",
    type: "video",
    src: apartmentoVideo,
    coverSrc: apartmentoPoster,
    description:
      "A landing page experiment for Apartmento, using GSAP to explore expressive motion and playful transitions.",
    tags: ["motion", "interfaces", "digital"],
    x: 590,
    y: 150,
    width: 278,
  },
  {
    id: "studio",
    title: "Studio Landing Page",
    type: "video",
    src: studioVideo,
    coverSrc: studioPoster,
    description:
      "A studio landing page experiment with animated collage typography, built around the contrast between analog instruments, digital production, and direct navigation.",
    tags: ["motion", "interfaces", "digital"],
    x: 590,
    y: 570,
    width: 278,
  },
];
