import brikLogo from "../../assets/brik/brik-logo.jpg";
import brikScreen1 from "../../assets/brik/brik_screen_1.png";
import brikScreen2 from "../../assets/brik/brik_screen_2.png";
import brikScreen3 from "../../assets/brik/brik_screen_3.png";
import brikScreen4 from "../../assets/brik/brik_screen_4.png";
import brikScreen5 from "../../assets/brik/brik_screen_5.png";
import algorandLogo from "../../assets/algo/algo-logo.webp";
import algorandConnect from "../../assets/algo/connect.webp";
import algorandDeveloperPortal from "../../assets/algo/dev.webp";
import algorandDeveloperPortalDocs from "../../assets/algo/dev2.webp";
import algorandGovernance from "../../assets/algo/gov.png";
import algorandMetrics from "../../assets/algo/metrics.webp";
import algorandMetricsDetail from "../../assets/algo/metrics1.webp";
import personalExplorationsImage from "../../assets/personal/t.png";
import photifyCamera from "../../assets/photify/camera.png";
import photifySolution from "../../assets/photify/photify-solution.png";
import photifyScreen1 from "../../assets/photify/photify_screen_1.jpeg";
import photifyScreen2 from "../../assets/photify/photify_screen_2.jpeg";
import photifyScreen3 from "../../assets/photify/photify_screen_3.jpeg";
import photifyScreen4 from "../../assets/photify/photify_screen_4.jpeg";
import photifyScreen5 from "../../assets/photify/photify_screen_5.jpeg";

export type CaseStudySection = {
  id: string;
  title: string;
  heading: string;
  body: string;
  variant?: "overview" | "walkthrough" | "role" | "reflection";
  images?: {
    src: string;
    alt: string;
    size?: "default" | "compact";
  }[];
  subsections?: RoleSection[];
};

export type SnapshotItem = {
  label: string;
  value?: string;
  bullets?: string[];
  tags?: string[];
};

export type SolutionStep = {
  number: string;
  label: string;
  screenTitle: string;
  screenBody: string;
  image: string;
};

export type RoleSection = {
  title: string;
  paragraphs: string[];
  bullets: string[];
  callout?: string;
  insight?: {
    title: string;
    body: string;
  };
};

export type ReflectionCard = {
  title: string;
  body: string;
};

export type CaseStudyAccent = {
  color: string;
  soft: string;
  text: string;
  rgb: string;
  collageBackground: string;
  shadow: string;
};

export type CaseStudy = {
  accent: CaseStudyAccent;
  snapshot: {
    left: SnapshotItem[];
    right: SnapshotItem[];
  };
  sections: CaseStudySection[];
  solutionOverview?: {
    image: string;
    imageAlt: string;
    captionKicker: string;
    captionTitle: string;
  };
  floatingVisual?: {
    image: string;
    imageAlt: string;
    revealSectionId: string;
  };
  walkthrough?: {
    intro: string;
    ariaLabel: string;
    steps: SolutionStep[];
  };
  roleSections?: RoleSection[];
  reflectionCards?: ReflectionCard[];
};

const photifyCaseStudy: CaseStudy = {
  accent: {
    color: "#f7d96b",
    soft: "#fff3bf",
    text: "#7a5c00",
    rgb: "247, 217, 107",
    collageBackground: "#f8edc6",
    shadow: "122, 92, 0",
  },
  snapshot: {
    left: [
      {label: "Client", value: "Self-initiated startup project"},
      {
        label: "Product",
        value: "Photify - AI-powered event photo discovery platform",
      },
      {label: "Duration", value: "2026"},
      {
        label: "Capacity",
        value: "Product Design, Frontend Development, Backend Development",
      },
      {label: "Team Model", value: "Built with one collaborator"},
      {label: "Status", value: "Launched MVP"},
    ],
    right: [
      {
        label: "In a Nutshell",
        value:
          "Photify helps event attendees instantly find photos of themselves using facial recognition. Instead of manually searching through hundreds of event photos, users upload a selfie and receive a personalized gallery of matched images.",
      },
      {
        label: "Impact",
        bullets: [
          "Reduced photo discovery from hundreds of images to a personalized selection",
          "Released a production-ready mobile application on the App Store",
          "Shipped and owned a complete product from concept to deployment",
        ],
      },
      {
        label: "Tags",
        tags: [
          "Product Design",
          "Mobile App",
          "AI",
          "Facial Recognition",
          "React Native",
          "Django",
          "UX Design",
        ],
      },
    ],
  },
  sections: [
    {
      id: "context",
      title: "Context",
      heading: "Event photography creates thousands of photos.",
      body: "At concerts, festivals, conferences, and social events, photographers capture countless moments that participants may never see again.\n\nA familiar experience inspired this project: noticing a photographer take your photo, then never knowing where that image ended up. Even when galleries are published, attendees are often expected to manually search through hundreds or thousands of photos to find themselves.",
    },
    {
      id: "solution",
      title: "Solution",
      heading: "A selfie becomes the search query.",
      body: "Photify transforms a complex image-matching process into a simple user experience. Attendees join an event, upload a selfie, and receive a personalized gallery of photos in which they appear.\n\nThe goal was to make photo discovery effortless while maintaining transparency and trust around the use of facial recognition technology.",
      variant: "overview",
    },
    {
      id: "solution-walkthrough",
      title: "Features",
      heading: "Designed to make photo discovery effortless",
      body: "",
      variant: "walkthrough",
    },
    {
      id: "interaction-design",
      title: "My Role",
      heading: "Co-founder, product designer, and technical lead",
      body: "Photify was built from the ground up with a former college classmate. As co-founders, we collaborated closely on the product vision and strategy, while taking ownership of different areas of the business.\n\nMy co-founder led marketing, sales, and partnership efforts, while I was responsible for product design, user experience, and technical implementation from concept through launch.",
      variant: "role",
    },
    {
      id: "reflection",
      title: "Reflection",
      heading: "What I've learned",
      body: "",
      variant: "reflection",
    },
  ],
  solutionOverview: {
    image: photifySolution,
    imageAlt:
      "Photify app screens showing selfie upload, event access, and personalized photo results",
    captionKicker: "From digital clutter",
    captionTitle: "to custom gallery",
  },
  floatingVisual: {
    image: photifyCamera,
    imageAlt: "",
    revealSectionId: "context",
  },
  walkthrough: {
    intro:
      "The goal was to create a flow simple enough for any event attendee to complete in under a minute. Each step was designed to reduce friction while building trust around the use of facial recognition technology.",
    ariaLabel: "Photify solution steps",
    steps: [
      {
        number: "1",
        label: "Phone Verification",
        screenTitle: "Phone Verification",
        screenBody:
          "Users create an account using their phone number and a one-time verification code, providing a simple and secure onboarding experience.",
        image: photifyScreen1,
      },
      {
        number: "2",
        label: "Upload Selfie",
        screenTitle: "Upload Selfie",
        screenBody:
          "Users upload a selfie that serves as their visual identifier. This image is used to match them with photos captured during events.",
        image: photifyScreen2,
      },
      {
        number: "3",
        label: "Scan QR",
        screenTitle: "Scan QR",
        screenBody:
          "Attendees can quickly access an event by scanning a QR code provided by the organizer, removing the need for manual event searches.",
        image: photifyScreen3,
      },
      {
        number: "4",
        label: "Join Event",
        screenTitle: "Join Event",
        screenBody:
          "After joining, users can view all events they are participating in and track the status of photo processing and matching.",
        image: photifyScreen4,
      },
      {
        number: "5",
        label: "Personal Gallery",
        screenTitle: "Personal Gallery",
        screenBody:
          "Once matching is complete, users receive a personalized gallery containing only the photos in which they appear, making photo discovery effortless.",
        image: photifyScreen5,
      },
    ],
  },
  roleSections: [
    {
      title: "Product & Design",
      paragraphs: [
        "I led the product and design process from concept to launch, marking the first time I was fully responsible for designing an entire product experience from scratch.",
        "Our goal was to create a product that could be comfortably used by a wide range of event attendees, regardless of age or technical familiarity.",
        "Every design decision was guided by simplicity, clarity, and trust.",
        "I tried to develop a visual identity that felt warm, and energetic. This direction influenced everything from the logo and branding to the interface language and interaction patterns.",
      ],
      bullets: [
        "Defined the end-to-end user journey",
        "Established the visual identity, design language, and component patterns",
        "Iterated on flows based on testing and real-world feedback",
      ],
      callout:
        "The primary challenge was not the matching technology itself, but creating an experience that felt simple, trustworthy, and accessible to first-time users.",
      insight: {
        title: "Designing Through Prototyping",
        body: "Rather than following a traditional workflow of fully designing screens in Figma before implementation, I adopted a more iterative approach. Leveraging AI-assisted development tools and my experience building reusable design systems, I was able to rapidly prototype ideas directly in code and evaluate them in a real environment. Because our component system, typography scales, spacing tokens, and color foundations were designed to be reusable, visual exploration could happen simultaneously with implementation. This significantly shortened feedback loops and allowed design decisions to be validated through working prototypes rather than static mockups.",
      },
    },
    {
      title: "Frontend Development",
      paragraphs: [
        "Because frontend development is already my area of expertise, implementation became an extension of the design process. Familiar tools, reusable systems, and AI-assisted development allowed ideas to move quickly from concept to working prototype, creating a tighter feedback loop between design and execution. I was responsible for all frontend development across both the mobile application and marketing website.",
      ],
      bullets: [
        "Mobile application development",
        "Marketing website design and development",
        "User onboarding and event flows",
        "API integrations",
        "App Store deployment",
      ],
    },
    {
      title: "Backend & Infrastructure",
      paragraphs: [
        "Having worked alongside backend engineers throughout my career, I was already familiar with many backend concepts and system design discussions. However, building and maintaining the backend myself required a much deeper understanding of how these systems operate in practice.",
        "Using Django, I designed and implemented the backend powering the application. AI tools, particularly Claude, played an important role throughout this process--not only as coding assistants, but as learning tools that helped me understand unfamiliar concepts, evaluate architectural decisions, and deepen my understanding of backend development.",
      ],
      bullets: [
        "Built backend services using Django",
        "Designed user, event, and photo management systems",
        "Implemented APIs supporting the mobile application",
        "Managed authentication, storage, and media workflows",
        "Integrated facial recognition and photo matching processes",
      ],
      callout:
        "This experience transformed backend development from something I collaborated with into something I could confidently design, build, and reason about myself.",
    },
  ],
  reflectionCards: [
    {
      title: "Beyond My Comfort Zone",
      body: "Photify pushed me beyond my usual role as a frontend developer. Taking ownership of product design and backend development gave me a broader understanding of how decisions made in one area affect the entire product. The experience reinforced my interest in working across disciplines and approaching problems from both technical and human perspectives.",
    },
    {
      title: "Ownership & Creative Freedom",
      body: "Working on my own product was fundamentally different from working on client or company projects. Having ownership over every decision-from product direction and design choices to technical implementation-created a level of motivation I had not experienced before.\n\nThe freedom to experiment, challenge assumptions, and immediately act on ideas without organizational constraints allowed the product to evolve organically. It reinforced my interest in building products where design, technology, and strategy can influence one another rather than exist as separate disciplines.",
    },
  ],
};

const brikCaseStudy: CaseStudy = {
  accent: {
    color: "#118cf2",
    soft: "#dff0ff",
    text: "#0b61b8",
    rgb: "17, 140, 242",
    collageBackground: "#edf7ff",
    shadow: "11, 97, 184",
  },
  snapshot: {
    left: [
      {label: "Client", value: "Early-stage startup"},
      {
        label: "Product",
        value: "Brik - AI-powered workforce learning platform",
      },
      {label: "Duration", value: "2024-2025"},
      {label: "Capacity", value: "Mobile Development, Product Development"},
      {label: "Team Model", value: "Cross-functional startup team"},
      {label: "Status", value: "Live product"},
    ],
    right: [
      {
        label: "In a Nutshell",
        value:
          "Brik helps frontline teams build skills through short, engaging learning experiences. By combining AI-generated content, progress tracking, and gamification mechanics, the platform encourages consistent learning and measurable improvement.",
      },
      {
        label: "Impact",
        bullets: [
          "Contributed to the development of a production mobile application",
          "Built core learning, engagement, and progress-tracking experiences",
          "Delivered features used across iOS and Android platforms",
          "Helped establish the application's frontend architecture and component system",
        ],
      },
      {
        label: "Tags",
        tags: [
          "React Native",
          "Expo",
          "Mobile App",
          "EdTech",
          "AI",
          "Gamification",
          "Product Development",
        ],
      },
    ],
  },
  sections: [
    {
      id: "overview",
      title: "Context",
      heading: "Knowledge is available. Learning is the challenge.",
      body: "Traditional onboarding and training materials are often time-consuming and difficult to revisit. Employees may struggle to stay motivated, while organizations have limited visibility into learning progress and knowledge retention.",
    },
    {
      id: "challenge",
      title: "Solution",
      heading: "Short lessons, lasting knowledge.",
      body: "Brik transforms workplace training into short, interactive learning experiences. Through bite-sized content, gamification, and progress tracking, it helps employees learn more consistently and stay engaged.",
      variant: "overview",
    },
    {
      id: "approach",
      title: "Features",
      heading: "Built around daily learning habits.",
      body: "",
      variant: "walkthrough",
    },
    {
      id: "role",
      title: "My Role",
      heading: "Mobile development with a product mindset.",
      body: "Although I joined Brik as a mobile developer, working in an early-stage startup meant responsibilities often extended beyond implementation. Product decisions were highly collaborative, and everyone on the team had the opportunity to contribute ideas, challenge assumptions, and influence the direction of the product.\n\nThis environment gave me valuable exposure to product thinking and allowed me to participate in conversations around user experience, feature prioritization, and long-term product strategy while remaining primarily responsible for the mobile application.",
      variant: "role",
    },
    {
      id: "outcome",
      title: "Reflection",
      heading: "What I've learned.",
      body: "",
      variant: "reflection",
    },
  ],
  solutionOverview: {
    image: brikLogo,
    imageAlt: "Brik logo",
    captionKicker: "Brik",
    captionTitle: "case study",
  },
  walkthrough: {
    intro:
      "Instead of asking employees to dedicate hours to training, Brik breaks learning into short, engaging sessions that fit naturally into the workday. Progress tracking and gamification help maintain motivation over time.",
    ariaLabel: "Brik approach steps",
    steps: [
      {
        number: "1",
        label: "Get Started",
        screenTitle: "Get Started",
        screenBody:
          "Create your account and enter your personalized learning experience.",
        image: brikScreen1,
      },
      {
        number: "2",
        label: "Follow Your Path",
        screenTitle: "Follow Your Path",
        screenBody:
          "Discover courses tailored to your role and track your progress over time.",
        image: brikScreen2,
      },
      {
        number: "3",
        label: "Learn in Minutes",
        screenTitle: "Learn in Minutes",
        screenBody: "Complete bite-sized lessons designed for busy workdays.",
        image: brikScreen3,
      },
      {
        number: "4",
        label: "Put Knowledge Into Practice",
        screenTitle: "Put Knowledge Into Practice",
        screenBody:
          "Take quizzes and challenges to reinforce what you've learned.",
        image: brikScreen4,
      },
      {
        number: "5",
        label: "Stay Motivated",
        screenTitle: "Stay Motivated",
        screenBody:
          "Earn badges, build streaks, and celebrate achievements along the way.",
        image: brikScreen5,
      },
    ],
  },
  roleSections: [],
  reflectionCards: [
    {
      title: "Startup Pace",
      body: "Brik gave me my first experience working within an early-stage startup environment, where product decisions, technical constraints, and business goals were constantly influencing one another. I learned that building successful products requires much more than shipping features-it requires understanding user needs, collaborating across disciplines, and balancing competing priorities.\n\nThe experience also sparked my interest in product design and strategy, which would later influence how I approached my own projects.",
    },
  ],
};

const algorandCaseStudy: CaseStudy = {
  accent: {
    color: "rgb(185, 239, 238)",
    soft: "#e8fbfb",
    text: "#286766",
    rgb: "185, 239, 238",
    collageBackground: "#f1fcfc",
    shadow: "40, 103, 102",
  },
  snapshot: {
    left: [
      {label: "Client", value: "Algorand Foundation"},
      {label: "Product", value: "Algorand Ecosystem Products"},
      {label: "Duration", value: "2020-2024"},
      {label: "Capacity", value: "Frontend Development"},
      {label: "Team Model", value: "Cross-functional product teams"},
      {label: "Status", value: "Live Products"},
    ],
    right: [
      {
        label: "In a Nutshell",
        value:
          "As part of the frontend team at Hipo, I contributed to a range of products within the Algorand ecosystem, including governance platforms, developer tools, analytics dashboards, and wallet integrations. My work focused on translating complex blockchain concepts into accessible user experiences while supporting millions of dollars in on-chain activity.",
      },
      {
        label: "Impact",
        bullets: [
          "Contributed to multiple production products used across the Algorand ecosystem",
          "Built and maintained governance, analytics, and developer-facing experiences",
          "Participated in major platform upgrades, migrations, and feature releases",
        ],
      },
      {
        label: "Tags",
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
      },
    ],
  },
  sections: [
    {
      id: "context",
      title: "Context",
      heading: "Entering the World of Web3.",
      body: "During my time at Hipo, I contributed to multiple products within the Algorand ecosystem, including governance platforms, developer tools, analytics dashboards, and wallet integrations.\n\nAlthough these products served different audiences, they shared a common challenge: translating complex blockchain concepts into experiences that felt understandable, trustworthy, and easy to use.",
    },
    {
      id: "governance-platform",
      title: "Governance Platform",
      heading: "Helping users take part.",
      body: "Algorand Governance allows token holders to participate in decisions that influence the future of the network. By committing their assets and fulfilling participation requirements, users can vote on proposals and earn governance rewards.\n\nHowever, participating in governance requires understanding unfamiliar concepts, managing wallet connections, and completing blockchain transactions-creating a significant barrier for many users.",
      variant: "role",
      images: [
        {
          src: algorandGovernance,
          alt: "Algorand Governance platform interface",
        },
      ],
      subsections: [
        {
          title: "My Role",
          paragraphs: [
            "I took ownership of the Governance Platform frontend after inheriting the project from another engineer. I contributed to several areas of the governance platform, including governor discovery, activity tracking, wallet integrations, and governance participation flows.",
          ],
          bullets: [
            "Built filtering and infinite scrolling experiences for the Governor List",
            "Developed governance activity and history interfaces",
            "Implemented wallet connection and transaction flows",
            "Contributed to xGov participation experiences",
            "Supported major platform upgrades and frontend migrations",
          ],
        },
        {
          title: "Key Takeaway",
          paragraphs: [
            "Working on governance products taught me that participation is often a design challenge rather than a technical one. Small improvements in clarity, feedback, and guidance can significantly reduce the friction users experience when interacting with complex systems.",
          ],
          bullets: [],
        },
      ],
    },
    {
      id: "developer-portal",
      title: "Developer Portal",
      heading: "Helping developers build with confidence.",
      body: "The Algorand Developer Portal serves as the primary learning and documentation hub for developers building applications on the Algorand blockchain. It provides technical guides, tutorials, API references, and educational resources designed to help developers understand the ecosystem and build with confidence.",
      variant: "role",
      images: [
        {
          src: algorandDeveloperPortal,
          alt: "Algorand Developer Portal homepage interface",
        },
        {
          src: algorandDeveloperPortalDocs,
          alt: "Algorand Developer Portal documentation interface",
        },
      ],
      subsections: [
        {
          title: "My Role",
          paragraphs: [
            "I contributed to the frontend development of the Developer Portal, working on experiences that helped developers discover, consume, and engage with technical content more effectively.",
            "Beyond presenting documentation, the goal was to create an environment that encouraged continued exploration of the Algorand ecosystem and reduced the friction of learning unfamiliar concepts.",
          ],
          bullets: [
            "Developed new portal features and content experiences",
            "Improved navigation and content discoverability",
            "Built interactive and educational experiences to increase engagement",
            "Collaborated with developer relations teams on learning initiatives",
            "Maintained and expanded the frontend architecture",
          ],
        },
        {
          title: "Key Takeaway",
          paragraphs: [
            "Working on the Developer Portal introduced me to server-side rendering and the unique challenges of content-driven products. I learned that technical decisions are often product decisions, influencing everything from discoverability and performance to how users engage with information.",
          ],
          bullets: [],
        },
      ],
    },
    {
      id: "metrics-dashboard",
      title: "Metrics Dashboard",
      heading: "Turning ecosystem activity into insight.",
      body: "The Algorand Metrics Dashboard provides an overview of activity across the ecosystem, helping users monitor network growth, transaction volume, participation, and other key indicators.\n\nThe challenge was not collecting data, but presenting large amounts of information in a way that felt clear, meaningful, and easy to explore.",
      variant: "role",
      images: [
        {
          src: algorandMetrics,
          alt: "Algorand Metrics Dashboard overview interface",
        },
        {
          src: algorandMetricsDetail,
          alt: "Algorand Metrics Dashboard detail interface",
        },
      ],
      subsections: [
        {
          title: "My Role",
          paragraphs: [
            "I contributed to the frontend development of the Metrics Dashboard, helping transform complex blockchain data into accessible visualizations and user-friendly experiences.",
          ],
          bullets: [
            "Developed dashboard interfaces and data visualizations",
            "Built reusable components for presenting network metrics",
            "Integrated APIs and real-time data sources",
            "Collaborated with design and product teams on information architecture",
            "Maintained and expanded the frontend application",
          ],
        },
        {
          title: "Key Takeaway",
          paragraphs: [
            "Working on the Metrics Dashboard reinforced the importance of information hierarchy and visual communication. Even accurate data loses value if users cannot quickly understand what it means or identify the insights most relevant to them.",
          ],
          bullets: [],
        },
      ],
    },
    {
      id: "wallet-integrations",
      title: "Wallet Integrations",
      heading: "Connecting users to the ecosystem.",
      body: "Digital wallets are the primary way users interact with blockchain applications. They enable authentication, transaction signing, and asset management, making them a critical part of the overall user experience.\n\nUnlike a standalone feature, wallet connectivity was embedded throughout the ecosystem. As a result, I worked on wallet integrations across multiple products, helping users authenticate, sign transactions, and interact with blockchain applications through a consistent and reliable experience.",
      variant: "role",
      images: [
        {
          src: algorandConnect,
          alt: "Algorand wallet connection interface",
          size: "compact",
        },
      ],
      subsections: [
        {
          title: "My Role",
          paragraphs: [
            "I contributed to the integration of several wallet providers across Algorand products, including Pera Wallet, Defly Wallet, Exodus Wallet, and some more.",
            "Each integration introduced unique technical requirements and user experience considerations.",
          ],
          bullets: [
            "Implemented wallet connection flows",
            "Developed transaction signing experiences",
            "Resolved compatibility and user experience issues",
            "Maintained and improved wallet-related infrastructure",
          ],
        },
        {
          title: "Key Takeaway",
          paragraphs: [
            "Wallet interactions often involve sensitive actions with real financial consequences. This experience reinforced the importance of clear feedback, confirmation states, and transparent communication, helping users feel confident throughout the transaction journey.",
          ],
          bullets: [],
        },
      ],
    },
    {
      id: "reflection",
      title: "Reflection",
      heading: "What I've learned.",
      body: "",
      variant: "reflection",
    },
  ],
  solutionOverview: {
    image: algorandLogo,
    imageAlt: "Algorand logo",
    captionKicker: "Algorand",
    captionTitle: "case study",
  },
  walkthrough: {
    intro:
      "This area will use the same case-study structure as the other projects, with Algorand-specific feature highlights once the details are ready.",
    ariaLabel: "Algorand feature steps",
    steps: [],
  },
  roleSections: [],
  reflectionCards: [
    {
      title: "Professional Foundation",
      body: "Hipo was where I built my professional foundation. It introduced me to modern development practices, scalable frontend architecture, code quality standards, and the collaborative processes behind successful digital products.\n\nWorking with international teams and contributing to products used by a global audience broadened my perspective beyond implementation alone. More importantly, it taught me how design, engineering, and communication work together to make complex technologies accessible to people.\n\nMany of the principles I still rely on today-from building reusable systems to simplifying complexity for users-were shaped during this experience.",
    },
  ],
};

const personalExplorationsCaseStudy: CaseStudy = {
  accent: {
    color: "#ff00ff",
    soft: "#ffe0ff",
    text: "#8a008a",
    rgb: "255, 0, 255",
    collageBackground: "#ffd6ff",
    shadow: "138, 0, 138",
  },
  snapshot: {
    left: [
      {label: "Client", value: "Self-directed"},
      {label: "Work", value: "Personal Explorations"},
      {label: "Duration", value: "Ongoing"},
      {
        label: "Capacity",
        value: "Creative Direction, Visual Design, Prototyping",
      },
    ],
    right: [
      {
        label: "In a Nutshell",
        value:
          "A collection of self-directed visual, interaction, and product experiments.",
      },
      {
        label: "Tags",
        tags: [
          "Visual Design",
          "Interaction",
          "Creative Coding",
          "Prototyping",
        ],
      },
    ],
  },
  sections: [
    {
      id: "context",
      title: "Context",
      heading: "Self-directed space for visual and interaction ideas.",
      body: "Personal Explorations brings together experiments that do not belong to a single client or product brief. The work is a place to test visual systems, interaction patterns, and product ideas with more room for intuition and play.",
    },
    {
      id: "explorations",
      title: "Explorations",
      heading: "A growing archive of creative prototypes.",
      body: "This section is intended to evolve over time as new experiments are added.",
      variant: "overview",
    },
    {
      id: "reflection",
      title: "Reflection",
      heading: "What this space is for.",
      body: "",
      variant: "reflection",
    },
  ],
  solutionOverview: {
    image: personalExplorationsImage,
    imageAlt: "Personal Explorations visual artwork",
    captionKicker: "Personal",
    captionTitle: "explorations",
  },
  reflectionCards: [
    {
      title: "Creative Range",
      body: "This work gives me a place to explore direction, mood, and interaction outside the constraints of production roadmaps. It keeps experimentation visible as part of my practice.",
    },
  ],
};

export const caseStudies: Record<string, CaseStudy> = {
  photify: photifyCaseStudy,
  brik: brikCaseStudy,
  algorand: algorandCaseStudy,
  "personal-explorations": personalExplorationsCaseStudy,
};
