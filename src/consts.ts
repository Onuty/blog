export const SITE = {
  title: "Onuty",
  author: "Alex (Onuty)",
  description: "Personal blog about technology, programming, games, and projects.",
  url: "https://onuty.net"
};

export const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" }
] as const;

export type Project = {
  name: string;
  description: string;
  github: string;
  demo?: string;
  stars?: string;
};

export const FEATURED_PROJECTS: Project[] = [
  {
    name: "Onuty Blog",
    description: "This Astro + MDX blog with Decap CMS and giscus comments.",
    github: "https://github.com/your-username/onuty",
    stars: "-"
  },
  {
    name: "Game Prototype Lab",
    description: "Small experiments on game mechanics and rendering techniques.",
    github: "https://github.com/your-username/game-prototype-lab",
    demo: "https://example.com"
  },
  {
    name: "Dev Notes",
    description: "A note system for quick programming references and snippets.",
    github: "https://github.com/your-username/dev-notes"
  }
];

export const formatDate = (value: Date | string) =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit"
  }).format(new Date(value));

export const GISCUS = {
  repo: import.meta.env.PUBLIC_GISCUS_REPO ?? "",
  repoId: import.meta.env.PUBLIC_GISCUS_REPO_ID ?? "",
  category: import.meta.env.PUBLIC_GISCUS_CATEGORY ?? "",
  categoryId: import.meta.env.PUBLIC_GISCUS_CATEGORY_ID ?? "",
  mapping: import.meta.env.PUBLIC_GISCUS_MAPPING ?? "pathname",
  strict: import.meta.env.PUBLIC_GISCUS_STRICT ?? "0",
  reactionsEnabled: import.meta.env.PUBLIC_GISCUS_REACTIONS_ENABLED ?? "1",
  emitMetadata: import.meta.env.PUBLIC_GISCUS_EMIT_METADATA ?? "0",
  inputPosition: import.meta.env.PUBLIC_GISCUS_INPUT_POSITION ?? "top",
  theme: import.meta.env.PUBLIC_GISCUS_THEME ?? "light",
  lang: import.meta.env.PUBLIC_GISCUS_LANG ?? "en"
};
