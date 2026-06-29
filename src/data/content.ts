import galleryUniverseVideo from '../assets/dump/gallery-universe.mp4';
import exploringInterfacesContent from '../writings/exploring-interfaces-beyond-the-flat-screen.md?raw';

export type ContentItem =
  | {
      type: 'article';
      id: string;
      title: string;
      date: string;
      content: string;
      image?: string;
      video?: string;
      color?: string;
    }
  | {
      type: 'project';
      id: string;
      title: string;
      year: string;
      medium: string;
      description: string;
      images?: string[];
      links?: { href: string; label: string }[];
      image?: string;
      color?: string;
    };

const articles: ContentItem[] = [
  {
    type: 'article',
    id: 'a03',
    title: 'Exploring New Age Interfaces',
    date: '2025',
    content: exploringInterfacesContent,
    video: galleryUniverseVideo,
  },
];

export const contentById: Record<string, ContentItem> = Object.fromEntries(
  articles.map((item) => [item.id, item])
);
