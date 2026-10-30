export type VideoMeta = { src: string; poster?: string };

export type Project = {
  id: string;
  title: string;
  short: string;
  description: string;
  tech: string[];
  highlights: string[];
  githubUrl: string;
  /** Still frame shown on the project card. */
  thumbnail: string;
  badge?: string;
  video: {
    ariaLabel: string;
    landscape: VideoMeta;
    portrait: VideoMeta;
  };
};

export type SkillCategory =
  | "Mobile"
  | "Web"
  | "Backend"
  | "AI / Data"
  | "Networking"
  | "Dev Tools";

export type Skill = {
  /** Key used to look up the logo in TechIcon. */
  name: string;
  label: string;
  level: number;
  category: SkillCategory;
};

export type Education = {
  degree: string;
  institution: string;
  period: string;
  status: string;
};

export type Contact = {
  id: "email" | "linkedin" | "github";
  label: string;
  value: string;
  href: string;
  external: boolean;
};

export const portfolio = {
  name: "Ali Hasnain",
  title: "Software Engineer",
  tagline:
    "Software Engineering graduate building mobile and full-stack applications, with hands-on experience in QA, AI/NLP, computer networking and information security.",
  summary:
    "I am a Software Engineering graduate with hands-on experience across mobile and full-stack development, quality assurance, AI/ML and NLP, computer networking, and information security. I have contributed to academic projects as part of development teams, including serving as a team lead on major projects, and I have taken software from planning and architecture through implementation, testing, and presentation. I have built a full-stack Flutter application, an NLP-based information extraction pipeline, and a simulated hospital network. I am seeking opportunities in mobile/full-stack development, software QA/testing, and practical AI/ML and NLP applications.",
  location: "Sargodha, Punjab, Pakistan",
  email: "hsah78765@gmail.com",
  siteUrl: "https://alihasnain-se.vercel.app",
  contacts: [
    {
      id: "email",
      label: "Email",
      value: "hsah78765@gmail.com",
      href: "mailto:hsah78765@gmail.com",
      external: false,
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      value: "in/alihasnain-se",
      href: "https://www.linkedin.com/in/alihasnain-se",
      external: true,
    },
    {
      id: "github",
      label: "GitHub",
      value: "alihasnain-se",
      href: "https://github.com/alihasnain-se",
      external: true,
    },
  ] satisfies Contact[],

  projects: [
    {
      id: "design-build-hub",
      title: "Design & Build Hub",
      badge: "Featured · Final-year project",
      short:
        "A cross-platform Flutter marketplace where homeowners discover interior designers, architects, and civil engineers, then submit hire requests, book consultations, and chat in-app, backed by a role-based admin panel.",
      description:
        "Design & Build Hub is a cross-platform platform connecting homeowners with interior designers, architects, and civil engineers. Users can discover professionals, explore portfolios, submit hire requests, book consultations, and communicate through in-app chat. It also includes a role-based admin panel for managing users, content, services, requests, and platform activity, with a focus on secure authentication, real-time communication, and scalable cloud services.",
      tech: ["Flutter", "Dart", "Riverpod", "Firebase", "Supabase", "Firebase Cloud Functions"],
      highlights: ["Hire requests & consultations", "In-app chat", "Role-based admin panel"],
      githubUrl: "https://github.com/alihasnain-se/Design-Build-Hub",
      thumbnail: "/posters/design-build-hub.jpg",
      video: {
        ariaLabel: "Design & Build Hub app walkthrough video, no audio",
        landscape: { src: "/videos/design-build-hub-landscape.mp4", poster: "/posters/landscape.jpg" },
        portrait: { src: "/videos/design-build-hub-portrait.mp4", poster: "/posters/portrait.jpg" },
      },
    },
    {
      id: "hospital-network-design",
      title: "Hospital Network Design",
      short:
        "A 3-site hospital network built and routed in Cisco Packet Tracer with an OSPF backbone, per-department IP subnets, DNS/HTTP/SMTP/FTP services, and connectivity verified with ping and traceroute.",
      description:
        "A Cisco Packet Tracer networking project that simulates a multi-site hospital infrastructure connecting the IT Department, Clinical Ward, and Entrance & Lobby in a hub-and-spoke topology, with OSPF Area 0 routing, per-site subnets, guest Wi-Fi, and DNS, HTTP, SMTP and FTP services verified with ping and traceroute.",
      tech: ["Networking", "Cisco Packet Tracer"],
      highlights: ["Computer networks", "OSPF routing", "Hospital infrastructure"],
      githubUrl: "https://github.com/alihasnain-se/Hospital-Network-Design",
      thumbnail: "/posters/hospital-network-design.jpg",
      video: {
        ariaLabel: "Hospital Network Design topology walkthrough video, no audio",
        landscape: { src: "/videos/hospital-network-design-landscape.mp4" },
        portrait: { src: "/videos/hospital-network-design-portrait.mp4" },
      },
    },
    {
      id: "cryptosec-lab",
      title: "CryptoSec Lab",
      short:
        "An interactive playground for classical cryptography with six ciphers, an 8-chapter learning hub on the CIA triad and modern crypto, step-by-step visualizations, quizzes, and zero dependencies.",
      description:
        "An interactive web-based cryptography and information security learning platform with working encryption and decryption tools for six classical ciphers, an 8-chapter learning hub, quizzes, progress tracking and light/dark mode, built as a lightweight single-page app with no runtime dependencies.",
      tech: ["HTML5", "CSS3", "JavaScript", "Cryptography"],
      highlights: ["Cryptography", "Information security", "Interactive learning"],
      githubUrl: "https://github.com/alihasnain-se/CryptoSec-Lab",
      thumbnail: "/posters/cryptosec-lab.jpg",
      video: {
        ariaLabel: "CryptoSec Lab project walkthrough video",
        landscape: { src: "/videos/cryptosec-lab_landscape.mp4" },
        portrait: { src: "/videos/cryptosec-lab_portrait.mp4" },
      },
    },
    {
      id: "nutrition-information-extraction",
      title: "Nutrition Information Extraction",
      short:
        "An NLP pipeline that reads a recipe's text and predicts its full nutrition profile, using BiLSTM over GloVe, Word2Vec, or FastText embeddings, with an optional DistilBERT encoder and a Gradio demo.",
      description:
        "An NLP and deep-learning project that predicts calories, protein, fat, carbohydrates, sugar and sodium from recipe text using a BiLSTM over GloVe, Word2Vec or FastText embeddings, with a DistilBERT variant and an interactive Gradio interface.",
      tech: ["Python", "scikit-learn", "TensorFlow", "PyTorch", "Jupyter", "Gradio"],
      highlights: ["NLP", "Model training", "Feature engineering"],
      githubUrl:
        "https://github.com/alihasnain-se/Nutrition-Information-Extraction-From-Food-Descriptions",
      thumbnail: "/posters/nutrition-nlp.jpg",
      video: {
        ariaLabel: "Nutrition Information Extraction project walkthrough video",
        landscape: { src: "/videos/nutrition-nlp-landscape.mp4" },
        portrait: { src: "/videos/nutrition-nlp-portrait.mp4" },
      },
    },
  ] satisfies Project[],

  skills: [
    { name: "Flutter", label: "Flutter", level: 94, category: "Mobile" },
    { name: "Dart", label: "Dart", level: 90, category: "Mobile" },
    { name: "JavaScript", label: "JavaScript", level: 89, category: "Web" },
    { name: "HTML & CSS", label: "HTML & CSS", level: 92, category: "Web" },
    { name: "React.js", label: "React.js", level: 91, category: "Backend" },
    { name: "Node.js", label: "Node.js", level: 88, category: "Backend" },
    { name: "MySQL", label: "MySQL", level: 90, category: "Backend" },
    { name: "Python", label: "Python", level: 95, category: "AI / Data" },
    { name: "PyTorch", label: "PyTorch", level: 90, category: "AI / Data" },
    { name: "TensorFlow", label: "TensorFlow", level: 88, category: "AI / Data" },
    { name: "scikit-learn", label: "scikit-learn", level: 89, category: "AI / Data" },
    { name: "Jupyter", label: "Jupyter", level: 92, category: "AI / Data" },
    { name: "Cisco Packet Tracer", label: "Packet Tracer", level: 87, category: "Networking" },
    { name: "Git", label: "Git", level: 93, category: "Dev Tools" },
    { name: "GitHub", label: "GitHub", level: 90, category: "Dev Tools" },
  ] satisfies Skill[],

  alsoWorkingWith: [
    "Firebase",
    "Supabase",
    "Firestore",
    "Natural Language Processing",
    "Data preprocessing",
    "Feature engineering",
    "VLANs & subnetting",
    "Dynamic IP routing",
    "Information security",
    "UI/UX design",
    "Cross-platform development",
    "Technical documentation",
    "Android Studio",
    "VS Code",
  ],

  education: {
    degree: "B.S. Software Engineering",
    institution: "The University of Lahore",
    period: "2022 – 2026",
    status: "Graduated",
  } satisfies Education,
};

export type Portfolio = typeof portfolio;
