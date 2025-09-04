interface NavigationLink {
  title: string
  description: string
  url: string
  category: string
  imageUrl?: string
  tags: string[]
}

export const navigationData: NavigationLink[] = [
  {
    title: "Asana",
    description: "Work management platform for teams",
    url: "https://asana.com",
    category: "Productivity",
    tags: ["work", "management", "teams", "projects", "tasks"]
  }
]
