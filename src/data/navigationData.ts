interface NavigationLink {
  title: string
  description: string
  url: string
  category: string
  imageUrl?: string
  tags: string[]
}

export const navigationData: NavigationLink[] = [
  // Inxeoz Bucket - Personal favorites
  {
    title: "Manjaro Linux",
    description: "Arch-based Linux distro you're using",
    url: "https://manjaro.org/",
    category: "Inxeoz Bucket",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
    tags: ["linux", "manjaro", "arch", "os", "distro"]
  },
  {
    title: "Android VM Setup",
    description: "Emulator/VM setup docs",
    url: "https://developer.android.com/studio/run/emulator",
    category: "Inxeoz Bucket",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
    tags: ["android", "vm", "emulator", "setup", "mobile"]
  },
  {
    title: "Glow Markdown",
    description: "Render Markdown in terminal",
    url: "https://github.com/charmbracelet/glow",
    category: "Inxeoz Bucket",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Markdown-mark-solid.svg",
    tags: ["markdown", "terminal", "cli", "glow", "rendering"]
  },
  {
    title: "VS Code",
    description: "Popular open-source code editor",
    url: "https://code.visualstudio.com/",
    category: "Inxeoz Bucket",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    tags: ["editor", "vscode", "development", "code", "ide"]
  },

  // Development Tools & Platforms
  {
    title: "GitHub",
    description: "Code hosting & collaboration platform",
    url: "https://github.com",
    category: "Development",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    tags: ["git", "code", "collaboration", "repository", "version-control"]
  },
  {
    title: "GitLab",
    description: "Complete DevOps platform with CI/CD",
    url: "https://gitlab.com",
    category: "Development",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg",
    tags: ["git", "devops", "ci", "cd", "collaboration"]
  },
  {
    title: "Stack Overflow",
    description: "Developer Q&A community",
    url: "https://stackoverflow.com",
    category: "Development",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/stackoverflow/stackoverflow-original.svg",
    tags: ["programming", "questions", "community", "help", "answers"]
  },
  {
    title: "CodePen",
    description: "Online code editor for front-end development",
    url: "https://codepen.io",
    category: "Development",
    tags: ["frontend", "html", "css", "javascript", "playground"]
  },
  {
    title: "JSFiddle",
    description: "Test your JavaScript, CSS, HTML or CoffeeScript online",
    url: "https://jsfiddle.net",
    category: "Development",
    tags: ["javascript", "html", "css", "testing", "online"]
  },
  {
    title: "Repl.it",
    description: "Online IDE supporting 50+ programming languages",
    url: "https://replit.com",
    category: "Development",
    tags: ["ide", "online", "programming", "collaborative", "languages"]
  },

  // Documentation & References
  {
    title: "MDN Web Docs",
    description: "Web development documentation",
    url: "https://developer.mozilla.org",
    category: "Documentation",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firefox/firefox-original.svg",
    tags: ["web", "documentation", "reference", "html", "css", "javascript"]
  },
  {
    title: "DevDocs",
    description: "Unified documentation for web technologies",
    url: "https://devdocs.io",
    category: "Documentation",
    tags: ["documentation", "reference", "api", "web", "technologies"]
  },
  {
    title: "W3Schools",
    description: "Web development tutorials and references",
    url: "https://www.w3schools.com",
    category: "Documentation",
    tags: ["tutorials", "web", "learning", "reference", "examples"]
  },
  {
    title: "Can I Use",
    description: "Browser support tables for web technologies",
    url: "https://caniuse.com",
    category: "Documentation",
    tags: ["browser", "support", "compatibility", "web", "standards"]
  },
  {
    title: "Roadmap.sh",
    description: "Developer roadmaps and learning paths",
    url: "https://roadmap.sh",
    category: "Documentation",
    tags: ["roadmap", "learning", "career", "skills", "development"]
  },

  // API & Tools
  {
    title: "Postman",
    description: "API development and testing platform",
    url: "https://www.postman.com",
    category: "API Tools",
    tags: ["api", "testing", "development", "http", "requests"]
  },
  {
    title: "Swagger",
    description: "API documentation and design tools",
    url: "https://swagger.io",
    category: "API Tools",
    tags: ["api", "documentation", "swagger", "openapi", "design"]
  },
  {
    title: "Insomnia",
    description: "REST API client for developers",
    url: "https://insomnia.rest",
    category: "API Tools",
    tags: ["api", "rest", "client", "testing", "development"]
  },
  {
    title: "JSONPlaceholder",
    description: "Fake JSON API for testing and prototyping",
    url: "https://jsonplaceholder.typicode.com",
    category: "API Tools",
    tags: ["json", "api", "fake", "testing", "placeholder"]
  },
  {
    title: "Reqres",
    description: "Test your front-end against a real API",
    url: "https://reqres.in",
    category: "API Tools",
    tags: ["api", "testing", "mock", "frontend", "real"]
  },

  // Design & UI/UX
  {
    title: "Figma",
    description: "Collaborative design tool for UI/UX",
    url: "https://www.figma.com",
    category: "Design",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    tags: ["design", "ui", "ux", "collaborative", "prototyping"]
  },
  {
    title: "Adobe XD",
    description: "Vector-based user experience design tool",
    url: "https://www.adobe.com/products/xd.html",
    category: "Design",
    tags: ["design", "ui", "ux", "adobe", "prototyping"]
  },
  {
    title: "Dribbble",
    description: "Design inspiration and portfolio platform",
    url: "https://dribbble.com",
    category: "Design",
    tags: ["design", "inspiration", "portfolio", "ui", "graphics"]
  },
  {
    title: "Behance",
    description: "Creative work showcase platform",
    url: "https://www.behance.net",
    category: "Design",
    tags: ["design", "portfolio", "creative", "showcase", "adobe"]
  },
  {
    title: "Unsplash",
    description: "Free high-resolution photos",
    url: "https://unsplash.com",
    category: "Design",
    tags: ["photos", "free", "stock", "images", "photography"]
  },

  // Cloud Services & DevOps
  {
    title: "AWS Console",
    description: "Amazon Web Services management console",
    url: "https://console.aws.amazon.com",
    category: "Cloud Services",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
    tags: ["aws", "cloud", "console", "amazon", "services"]
  },
  {
    title: "Google Cloud",
    description: "Google Cloud Platform services",
    url: "https://console.cloud.google.com",
    category: "Cloud Services",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
    tags: ["gcp", "google", "cloud", "platform", "services"]
  },
  {
    title: "Azure Portal",
    description: "Microsoft Azure cloud services",
    url: "https://portal.azure.com",
    category: "Cloud Services",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
    tags: ["azure", "microsoft", "cloud", "portal", "services"]
  },
  {
    title: "Heroku",
    description: "Cloud platform for deploying applications",
    url: "https://dashboard.heroku.com",
    category: "Cloud Services",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/heroku/heroku-original.svg",
    tags: ["heroku", "deployment", "platform", "hosting", "apps"]
  },
  {
    title: "Netlify",
    description: "Modern web development platform",
    url: "https://www.netlify.com",
    category: "Cloud Services",
    tags: ["netlify", "hosting", "jamstack", "deployment", "cdn"]
  },
  {
    title: "Vercel",
    description: "Platform for frontend frameworks and static sites",
    url: "https://vercel.com",
    category: "Cloud Services",
    tags: ["vercel", "deployment", "frontend", "nextjs", "hosting"]
  },

  // Learning Resources
  {
    title: "freeCodeCamp",
    description: "Free coding bootcamp and certification",
    url: "https://www.freecodecamp.org",
    category: "Learning",
    tags: ["learning", "free", "bootcamp", "certification", "coding"]
  },
  {
    title: "Codecademy",
    description: "Interactive programming courses",
    url: "https://www.codecademy.com",
    category: "Learning",
    tags: ["learning", "interactive", "courses", "programming", "skills"]
  },
  {
    title: "Coursera",
    description: "Online courses from universities and companies",
    url: "https://www.coursera.org",
    category: "Learning",
    tags: ["courses", "university", "certification", "online", "learning"]
  },
  {
    title: "Udemy",
    description: "Online learning platform with practical courses",
    url: "https://www.udemy.com",
    category: "Learning",
    tags: ["courses", "practical", "skills", "online", "learning"]
  },
  {
    title: "Pluralsight",
    description: "Technology skills development platform",
    url: "https://www.pluralsight.com",
    category: "Learning",
    tags: ["technology", "skills", "development", "courses", "assessment"]
  },

  // Utilities & Tools
  {
    title: "JSON Formatter",
    description: "Format and validate JSON data",
    url: "https://jsonformatter.curiousconcept.com",
    category: "Utilities",
    tags: ["json", "formatter", "validator", "tools", "data"]
  },
  {
    title: "Regex101",
    description: "Online regex tester and debugger",
    url: "https://regex101.com",
    category: "Utilities",
    tags: ["regex", "testing", "debugger", "pattern", "matching"]
  },
  {
    title: "Codebeautify",
    description: "Collection of online tools for developers",
    url: "https://codebeautify.org",
    category: "Utilities",
    tags: ["tools", "formatter", "validator", "converter", "beautify"]
  },
  {
    title: "Carbon",
    description: "Create beautiful code screenshots",
    url: "https://carbon.now.sh",
    category: "Utilities",
    tags: ["code", "screenshots", "beautiful", "sharing", "images"]
  },
  {
    title: "Lorem Ipsum",
    description: "Generate placeholder text for designs",
    url: "https://www.lipsum.com",
    category: "Utilities",
    tags: ["placeholder", "text", "lorem", "ipsum", "design"]
  },

  // Package Managers & Libraries
  {
    title: "npm",
    description: "Node.js package manager",
    url: "https://www.npmjs.com",
    category: "Package Managers",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg",
    tags: ["npm", "nodejs", "packages", "javascript", "manager"]
  },
  {
    title: "Yarn",
    description: "Fast, reliable, and secure dependency management",
    url: "https://yarnpkg.com",
    category: "Package Managers",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/yarn/yarn-original.svg",
    tags: ["yarn", "packages", "javascript", "dependencies", "fast"]
  },
  {
    title: "PyPI",
    description: "Python Package Index",
    url: "https://pypi.org",
    category: "Package Managers",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    tags: ["python", "packages", "pypi", "libraries", "modules"]
  },
  {
    title: "CDN.js",
    description: "Free CDN for web libraries",
    url: "https://cdnjs.com",
    category: "Package Managers",
    tags: ["cdn", "libraries", "javascript", "css", "free"]
  },

  // Productivity & Communication
  {
    title: "Notion",
    description: "All-in-one workspace for notes, docs, and tasks",
    url: "https://www.notion.so",
    category: "Productivity",
    tags: ["notes", "docs", "tasks", "workspace", "collaboration"]
  },
  {
    title: "Slack",
    description: "Team communication platform",
    url: "https://slack.com",
    category: "Productivity",
    tags: ["communication", "team", "chat", "collaboration", "messaging"]
  },
  {
    title: "Discord",
    description: "Voice, video, and text communication platform",
    url: "https://discord.com",
    category: "Productivity",
    tags: ["communication", "voice", "video", "text", "community"]
  },
  {
    title: "Trello",
    description: "Collaborative project management tool",
    url: "https://trello.com",
    category: "Productivity",
    tags: ["project", "management", "kanban", "collaboration", "tasks"]
  },
  {
    title: "Asana",
    description: "Work management platform for teams",
    url: "https://asana.com",
    category: "Productivity",
    tags: ["work", "management", "teams", "projects", "tasks"]
  }
]