interface NavigationLink {
  title: string
  description: string
  url: string
  category: string
  tags: string[]
  icon?: any
  imageUrl?: string
}

export const staticNavigationData: NavigationLink[] = [
  // Inxeoz Bucket - Personal favorites
  {
    title: "Manjaro Linux",
    description: "Arch-based Linux distro with user-friendly experience",
    url: "https://manjaro.org/",
    category: "Inxeoz Bucket",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
    tags: ["linux", "manjaro", "arch", "os", "distro"]
  },
  {
    title: "Android VM Setup",
    description: "Complete guide for Android emulator and VM configuration",
    url: "https://developer.android.com/studio/run/emulator",
    category: "Inxeoz Bucket",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
    tags: ["android", "vm", "emulator", "setup", "mobile"]
  },
  {
    title: "VS Code",
    description: "Popular open-source code editor with rich ecosystem",
    url: "https://code.visualstudio.com/",
    category: "Inxeoz Bucket",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    tags: ["editor", "vscode", "development", "code", "ide"]
  },
  {
    title: "Claude Code",
    description: "AI-powered coding assistant and development tool",
    url: "https://claude.ai/code",
    category: "Inxeoz Bucket",
    tags: ["ai", "assistant", "coding", "claude", "development"]
  },

  // Common Online Services
  {
    title: "Google Search",
    description: "World's most popular search engine",
    url: "https://www.google.com/",
    category: "Common Online Services",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    tags: ["search", "google", "engine", "web"]
  },
  {
    title: "Wikipedia",
    description: "Free online encyclopedia with millions of articles",
    url: "https://en.wikipedia.org/",
    category: "Common Online Services",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/63/Wikipedia-logo.svg",
    tags: ["encyclopedia", "knowledge", "wiki", "information"]
  },
  {
    title: "GitHub",
    description: "Code hosting and collaboration platform",
    url: "https://github.com/",
    category: "Common Online Services",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    tags: ["git", "code", "repository", "collaboration", "version-control"]
  },
  {
    title: "Stack Overflow",
    description: "Developer Q&A community and knowledge sharing",
    url: "https://stackoverflow.com/",
    category: "Common Online Services",
    imageUrl: "https://cdn.worldvectorlogo.com/logos/stack-overflow.svg",
    tags: ["developer", "questions", "answers", "community", "programming"]
  },
  {
    title: "YouTube",
    description: "Video sharing platform and learning resource",
    url: "https://www.youtube.com/",
    category: "Common Online Services",
    tags: ["video", "learning", "tutorials", "entertainment", "content"]
  },

  // Developer Documentation
  {
    title: "MDN Web Docs",
    description: "Comprehensive web development documentation",
    url: "https://developer.mozilla.org/",
    category: "Developer Documentation",
    imageUrl: "https://raw.githubusercontent.com/aleen42/badges/master/src/mdn.svg",
    tags: ["docs", "html", "css", "javascript", "web", "reference"]
  },
  {
    title: "Python Documentation",
    description: "Official Python language reference and tutorials",
    url: "https://docs.python.org/3/",
    category: "Developer Documentation",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    tags: ["python", "docs", "reference", "programming", "language"]
  },
  {
    title: "Node.js Documentation",
    description: "Official Node.js API documentation and guides",
    url: "https://nodejs.org/en/docs/",
    category: "Developer Documentation",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    tags: ["nodejs", "docs", "javascript", "server", "api"]
  },
  {
    title: "React Documentation",
    description: "Official React library documentation",
    url: "https://react.dev/docs/getting-started",
    category: "Developer Documentation",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    tags: ["react", "docs", "frontend", "javascript", "ui"]
  },
  {
    title: "Svelte Documentation",
    description: "Official Svelte framework documentation",
    url: "https://svelte.dev/docs",
    category: "Developer Documentation",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg",
    tags: ["svelte", "docs", "framework", "frontend", "javascript"]
  },
  {
    title: "TypeScript Documentation",
    description: "TypeScript language reference and handbook",
    url: "https://www.typescriptlang.org/docs/",
    category: "Developer Documentation",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    tags: ["typescript", "docs", "javascript", "types", "language"]
  },

  // API & Swagger Tools
  {
    title: "SwaggerHub",
    description: "API design, documentation, and collaboration platform",
    url: "https://swagger.io/tools/swaggerhub/",
    category: "API & Swagger Tools",
    imageUrl: "https://static1.smartbear.co/swagger/media/assets/images/swagger_logo.svg",
    tags: ["api", "swagger", "docs", "design", "openapi"]
  },
  {
    title: "Postman",
    description: "API development and testing platform",
    url: "https://www.postman.com/",
    category: "API & Swagger Tools",
    imageUrl: "https://www.vectorlogo.zone/logos/getpostman/icon.svg",
    tags: ["api", "testing", "development", "http", "requests"]
  },
  {
    title: "Insomnia",
    description: "Powerful REST API client and testing tool",
    url: "https://insomnia.rest/",
    category: "API & Swagger Tools",
    tags: ["api", "rest", "client", "testing", "http"]
  },
  {
    title: "JSONPlaceholder",
    description: "Fake JSON API for testing and prototyping",
    url: "https://jsonplaceholder.typicode.com/",
    category: "API & Swagger Tools",
    tags: ["json", "api", "fake", "testing", "placeholder", "mock"]
  },

  // Knowledge Base & Wikis
  {
    title: "Notion",
    description: "All-in-one workspace for notes, docs, and collaboration",
    url: "https://www.notion.so/",
    category: "Knowledge Base & Wikis",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/02/Notion-logo.svg",
    tags: ["notes", "docs", "knowledge", "wiki", "collaboration"]
  },
  {
    title: "Confluence",
    description: "Team collaboration and knowledge sharing platform",
    url: "https://www.atlassian.com/software/confluence",
    category: "Knowledge Base & Wikis",
    imageUrl: "https://cdn.worldvectorlogo.com/logos/confluence-1.svg",
    tags: ["team", "collaboration", "wiki", "knowledge", "atlassian"]
  },
  {
    title: "Obsidian",
    description: "Powerful knowledge base on top of local folder of notes",
    url: "https://obsidian.md/",
    category: "Knowledge Base & Wikis",
    tags: ["notes", "knowledge", "graph", "linking", "markdown"]
  },
  {
    title: "Roam Research",
    description: "Note-taking tool for networked thought",
    url: "https://roamresearch.com/",
    category: "Knowledge Base & Wikis",
    tags: ["notes", "research", "networked", "graph", "knowledge"]
  },

  // Markdown References
  {
    title: "Markdown Guide",
    description: "Comprehensive guide to Markdown syntax",
    url: "https://www.markdownguide.org/",
    category: "Markdown References",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/48/Markdown-mark.svg",
    tags: ["markdown", "guide", "syntax", "reference", "formatting"]
  },
  {
    title: "CommonMark Spec",
    description: "Official CommonMark specification",
    url: "https://commonmark.org/",
    category: "Markdown References",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/48/Markdown-mark.svg",
    tags: ["markdown", "commonmark", "spec", "standard"]
  },
  {
    title: "GitHub Markdown",
    description: "GitHub Flavored Markdown documentation",
    url: "https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax",
    category: "Markdown References",
    tags: ["markdown", "github", "gfm", "formatting", "syntax"]
  },
  {
    title: "Mermaid Diagrams",
    description: "Markdown-based diagram and flowchart tool",
    url: "https://mermaid.js.org/",
    category: "Markdown References",
    tags: ["markdown", "diagrams", "mermaid", "flowchart", "visualization"]
  },

  // Cloud Services / DevOps
  {
    title: "AWS Console",
    description: "Amazon Web Services management console",
    url: "https://console.aws.amazon.com/",
    category: "Cloud Services / DevOps",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
    tags: ["aws", "cloud", "console", "amazon", "services"]
  },
  {
    title: "Google Cloud Platform",
    description: "Google's cloud computing services",
    url: "https://console.cloud.google.com/",
    category: "Cloud Services / DevOps",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
    tags: ["gcp", "google", "cloud", "platform", "services"]
  },
  {
    title: "Microsoft Azure",
    description: "Microsoft's cloud computing platform",
    url: "https://portal.azure.com/",
    category: "Cloud Services / DevOps",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
    tags: ["azure", "microsoft", "cloud", "portal", "services"]
  },
  {
    title: "Docker Hub",
    description: "Container registry and Docker image repository",
    url: "https://hub.docker.com/",
    category: "Cloud Services / DevOps",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    tags: ["docker", "containers", "registry", "images", "devops"]
  },
  {
    title: "Kubernetes",
    description: "Container orchestration platform documentation",
    url: "https://kubernetes.io/",
    category: "Cloud Services / DevOps",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
    tags: ["kubernetes", "k8s", "orchestration", "containers", "devops"]
  },
  {
    title: "Netlify",
    description: "Modern web development platform and hosting",
    url: "https://www.netlify.com/",
    category: "Cloud Services / DevOps",
    tags: ["netlify", "hosting", "jamstack", "deployment", "cdn"]
  },
  {
    title: "Vercel",
    description: "Frontend cloud platform for static sites and serverless functions",
    url: "https://vercel.com/",
    category: "Cloud Services / DevOps",
    tags: ["vercel", "deployment", "frontend", "nextjs", "hosting"]
  },

  // Design & Development Tools
  {
    title: "Figma",
    description: "Collaborative design tool for UI/UX design",
    url: "https://www.figma.com/",
    category: "Design Tools",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    tags: ["design", "ui", "ux", "collaborative", "prototyping"]
  },
  {
    title: "Canva",
    description: "Graphic design platform for marketing materials",
    url: "https://www.canva.com/",
    category: "Design Tools",
    tags: ["design", "graphics", "marketing", "templates", "visual"]
  },
  {
    title: "Unsplash",
    description: "Free high-resolution photos for projects",
    url: "https://unsplash.com/",
    category: "Design Tools",
    tags: ["photos", "free", "stock", "images", "photography"]
  },
  {
    title: "Dribbble",
    description: "Design inspiration and portfolio showcase",
    url: "https://dribbble.com/",
    category: "Design Tools",
    tags: ["design", "inspiration", "portfolio", "ui", "graphics"]
  },

  // Learning & Tutorials
  {
    title: "freeCodeCamp",
    description: "Free coding bootcamp with certifications",
    url: "https://www.freecodecamp.org/",
    category: "Learning Resources",
    tags: ["learning", "free", "bootcamp", "certification", "coding"]
  },
  {
    title: "Codecademy",
    description: "Interactive programming and data science courses",
    url: "https://www.codecademy.com/",
    category: "Learning Resources",
    tags: ["learning", "interactive", "courses", "programming", "skills"]
  },
  {
    title: "Pluralsight",
    description: "Technology skills development platform",
    url: "https://www.pluralsight.com/",
    category: "Learning Resources",
    tags: ["technology", "skills", "development", "courses", "assessment"]
  },
  {
    title: "LeetCode",
    description: "Coding practice platform for technical interviews",
    url: "https://leetcode.com/",
    category: "Learning Resources",
    tags: ["coding", "practice", "algorithms", "interviews", "challenges"]
  },
  {
    title: "Roadmap.sh",
    description: "Developer roadmaps and learning paths",
    url: "https://roadmap.sh/",
    category: "Learning Resources",
    tags: ["roadmap", "learning", "career", "skills", "development"]
  },

  // Utilities & Tools
  {
    title: "JSON Formatter",
    description: "Format, validate, and beautify JSON data",
    url: "https://jsonformatter.curiousconcept.com/",
    category: "Utilities",
    tags: ["json", "formatter", "validator", "tools", "data"]
  },
  {
    title: "Regex101",
    description: "Online regex tester, debugger, and reference",
    url: "https://regex101.com/",
    category: "Utilities",
    tags: ["regex", "testing", "debugger", "pattern", "matching"]
  },
  {
    title: "Can I Use",
    description: "Browser compatibility tables for web technologies",
    url: "https://caniuse.com/",
    category: "Utilities",
    tags: ["browser", "compatibility", "support", "web", "standards"]
  },
  {
    title: "Carbon",
    description: "Create beautiful images of your source code",
    url: "https://carbon.now.sh/",
    category: "Utilities",
    tags: ["code", "screenshots", "beautiful", "sharing", "images"]
  },
  {
    title: "Excalidraw",
    description: "Virtual collaborative whiteboard for sketching diagrams",
    url: "https://excalidraw.com/",
    category: "Utilities",
    tags: ["whiteboard", "diagrams", "sketching", "collaboration", "drawing"]
  }
]

// Helper function to get categories
export const getCategories = (): string[] => {
  return Array.from(new Set(staticNavigationData.map(link => link.category)))
}

// Helper function to get links by category
export const getLinksByCategory = (category: string): NavigationLink[] => {
  if (category === 'all') {
    return staticNavigationData
  }
  return staticNavigationData.filter(link => link.category === category)
}

// Helper function to search links
export const searchLinks = (searchTerm: string, category: string = 'all'): NavigationLink[] => {
  const links = getLinksByCategory(category)
  
  if (!searchTerm) {
    return links
  }
  
  const term = searchTerm.toLowerCase()
  return links.filter(link => 
    link.title.toLowerCase().includes(term) ||
    link.description.toLowerCase().includes(term) ||
    link.tags.some(tag => tag.toLowerCase().includes(term))
  )
}