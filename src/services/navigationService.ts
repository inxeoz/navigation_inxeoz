interface ParsedLink {
  title: string
  description: string
  url: string
  category: string
  imageUrl?: string
  tags: string[]
}

export class NavigationService {
  private static readonly GITHUB_RAW_URL = 'https://raw.githubusercontent.com/inxeoz/navigation_link/main/navigation.md'
  private static cache: ParsedLink[] | null = null
  private static lastFetch: number = 0
  private static readonly CACHE_DURATION = 5 * 60 * 1000 // 5 minutes
  private static readonly MAX_RETRIES = 3

  static async fetchNavigationData(forceRefresh: boolean = false): Promise<ParsedLink[]> {
    const now = Date.now()
    const isCacheValid = this.cache && (now - this.lastFetch < this.CACHE_DURATION)
    
    if (!forceRefresh && isCacheValid) {
      return this.cache!
    }

    // Try to fetch with retries
    for (let attempt = 1; attempt <= this.MAX_RETRIES; attempt++) {
      try {
        console.log(`Fetching navigation data (attempt ${attempt}/${this.MAX_RETRIES})...`)
        
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout
        
        const response = await fetch(this.GITHUB_RAW_URL, {
          signal: controller.signal,
          headers: {
            'Cache-Control': 'no-cache',
            'Accept': 'text/plain'
          }
        })
        
        clearTimeout(timeoutId)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const markdown = await response.text()
        console.log('✅ Successfully fetched markdown:', `${markdown.length} characters`)
        
        const parsed = this.parseMarkdown(markdown)
        console.log('📊 Parsed links:', `${parsed.length} items`)
        
        // Always add Inxeoz Bucket data to the parsed results
        const inxeozBucket = this.getInxeozBucketData()
        const allData = [...inxeozBucket, ...parsed]
        
        this.cache = allData
        this.lastFetch = now
        
        return allData.length > 0 ? allData : this.getFallbackData()
        
      } catch (error) {
        console.warn(`❌ Attempt ${attempt} failed:`, error)
        
        // If this is the last attempt, return cached data or fallback
        if (attempt === this.MAX_RETRIES) {
          console.error('🚨 All fetch attempts failed, using fallback data')
          return this.cache || this.getFallbackData()
        }
        
        // Wait before retry (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt - 1) * 1000))
      }
    }
    
    return this.getFallbackData()
  }

  private static parseMarkdown(markdown: string): ParsedLink[] {
    const links: ParsedLink[] = []
    const lines = markdown.split('\n')
    let currentCategory = ''
    let lineNumber = 0

    console.log('🔍 Starting markdown parsing...')

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      lineNumber++
      
      // Parse category headers - handle multiple formats
      if (line.match(/^#{1,4}\s+/)) {
        currentCategory = line
          .replace(/^#{1,4}\s+/, '') // Remove # markers
          .replace(/^[^\w\s]+\s*/, '') // Remove emoji and extra spaces
          .replace(/\s*\{[^}]*\}\s*$/, '') // Remove any trailing {#anchor} tags
          .trim()
        
        if (currentCategory) {
          console.log(`📁 Found category: "${currentCategory}" (line ${lineNumber})`)
        }
        continue
      }

      // Parse link items - handle multiple markdown formats
      if ((line.startsWith('* ') || line.startsWith('- ') || line.startsWith('+ ')) && 
          line.includes('[') && line.includes('](')) {
        const parsed = this.parseLinkLine(line, currentCategory, lineNumber)
        if (parsed) {
          links.push(parsed)
          console.log(`🔗 Added link: "${parsed.title}" in "${parsed.category}"`)
        }
      }
      
      // Also handle numbered lists
      if (line.match(/^\d+\.\s+/) && line.includes('[') && line.includes('](')) {
        const parsed = this.parseLinkLine(line, currentCategory, lineNumber)
        if (parsed) {
          links.push(parsed)
          console.log(`🔢 Added numbered link: "${parsed.title}" in "${parsed.category}"`)
        }
      }
    }

    console.log(`✨ Parsing complete: ${links.length} links found`)
    return links
  }

  private static parseLinkLine(line: string, category: string, lineNumber: number): ParsedLink | null {
    try {
      // Remove list markers (*, -, +, or numbers)
      let cleanLine = line.replace(/^[\*\-\+]\s+/, '').replace(/^\d+\.\s+/, '').trim()
      
      // Extract image URL (if present) - handle multiple formats
      let imageUrl: string | undefined
      const imgPatterns = [
        /<img[^>]+src=["']([^"']+)["'][^>]*\/?>/,  // HTML img tags
        /!\[[^\]]*\]\(([^)]+)\)/,                   // Markdown images
        /<img[^>]+src=([^>\s]+)[^>]*\/?>/           // HTML img without quotes
      ]
      
      for (const pattern of imgPatterns) {
        const imgMatch = cleanLine.match(pattern)
        if (imgMatch) {
          imageUrl = imgMatch[1].replace(/["']/g, '')
          cleanLine = cleanLine.replace(pattern, '').trim()
          break
        }
      }

      // Extract title and URL from cleaned line - handle multiple link formats
      const linkPatterns = [
        /\[([^\]]+)\]\(([^)]+)\)/,                  // Standard markdown links
        /<a[^>]+href=["']([^"']+)["'][^>]*>([^<]+)<\/a>/, // HTML links
        /\*\*([^*]+)\*\*[:\s]*<?([^>\s]+)>?/        // Bold text with URL
      ]
      
      let title = ''
      let url = ''
      
      for (const pattern of linkPatterns) {
        const linkMatch = cleanLine.match(pattern)
        if (linkMatch) {
          if (pattern === linkPatterns[1]) { // HTML link format
            url = linkMatch[1]
            title = linkMatch[2]
          } else {
            title = linkMatch[1]
            url = linkMatch[2]
          }
          break
        }
      }
      
      if (!title || !url) {
        console.warn(`⚠️  Could not parse link on line ${lineNumber}: ${line}`)
        return null
      }
      
      // Clean title (remove markdown formatting)
      title = title
        .replace(/\*\*/g, '')           // Remove bold
        .replace(/\*/g, '')             // Remove italics
        .replace(/`/g, '')              // Remove code
        .replace(/~~(.+)~~/g, '$1')     // Remove strikethrough
        .trim()

      // Extract description - handle multiple separator formats
      let description = ''
      const afterLink = cleanLine.split(/\]\([^)]+\)/)[1] || cleanLine.split(/<\/a>/)[1] || ''
      
      if (afterLink) {
        // Look for different description separators
        const descPatterns = [
          /[–—-]\s*(.+?)\.?\s*$/,        // Em dash, en dash, or hyphen
          /:\s*(.+?)\.?\s*$/,            // Colon
          /\.\s+(.+?)\.?\s*$/,           // Period + space
          /\s+(.+?)\.?\s*$/              // Just whitespace
        ]
        
        for (const pattern of descPatterns) {
          const descMatch = afterLink.match(pattern)
          if (descMatch && descMatch[1].length > 3) {
            description = descMatch[1].trim()
            break
          }
        }
        
        // Clean description
        description = description
          .replace(/\*\*/g, '')           // Remove bold
          .replace(/\*/g, '')             // Remove italics
          .replace(/`/g, '')              // Remove code
          .replace(/\\/g, '')             // Remove escapes
          .replace(/\.$/, '')             // Remove trailing period
          .trim()
      }
      
      // If no description found, try to infer from title or URL
      if (!description) {
        if (url.includes('github.com')) {
          description = `GitHub repository for ${title}`
        } else if (url.includes('stackoverflow.com')) {
          description = `Stack Overflow discussion about ${title}`
        } else if (url.includes('docs.') || url.includes('documentation')) {
          description = `Documentation for ${title}`
        } else if (url.includes('api.') || url.includes('/api/')) {
          description = `API reference for ${title}`
        } else {
          description = `Learn more about ${title}`
        }
      }

      // Generate intelligent tags from title, category, and URL
      const titleWords = title.toLowerCase().split(/[\s\-_]+/)
      const categoryWords = category.toLowerCase().split(/[\s\-_]+/)
      const urlWords = url.toLowerCase().match(/[a-z]+/g) || []
      
      const tags = [
        ...titleWords,
        ...categoryWords,
        ...urlWords.filter(word => word.length > 2 && !['com', 'org', 'net', 'www', 'http', 'https'].includes(word))
      ]
        .filter(tag => tag.length > 2)
        .filter((tag, index, arr) => arr.indexOf(tag) === index) // Remove duplicates
        .slice(0, 10) // Limit to 10 tags

      return {
        title,
        description,
        url,
        category: category || 'Uncategorized',
        imageUrl,
        tags
      }
    } catch (error) {
      console.error(`❌ Error parsing link line ${lineNumber}:`, line, error)
      return null
    }
  }

  private static getInxeozBucketData(): ParsedLink[] {
    return [
      {
        title: "Manjaro Linux",
        description: "Arch-based Linux distro you're using",
        url: "https://manjaro.org/",
        category: "Inxeoz Bucket",
        imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
        tags: ["linux", "manjaro", "arch", "os"]
      },
      {
        title: "Android VM Setup",
        description: "Emulator/VM setup docs",
        url: "https://developer.android.com/studio/run/emulator",
        category: "Inxeoz Bucket",
        imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
        tags: ["android", "vm", "emulator", "setup"]
      },
      {
        title: "Glow Markdown",
        description: "Render Markdown in terminal",
        url: "https://github.com/charmbracelet/glow",
        category: "Inxeoz Bucket",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Markdown-mark-solid.svg",
        tags: ["markdown", "terminal", "cli", "glow"]
      },
      {
        title: "VS Code",
        description: "Popular open-source code editor",
        url: "https://code.visualstudio.com/",
        category: "Inxeoz Bucket",
        imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
        tags: ["editor", "vscode", "development", "code"]
      }
    ]
  }

  private static getFallbackData(): ParsedLink[] {
    return [
      ...this.getInxeozBucketData(),
      {
        title: "GitHub",
        description: "Code hosting & collaboration platform",
        url: "https://github.com",
        category: "Development",
        tags: ["git", "code", "collaboration"],
      },
      {
        title: "Stack Overflow",
        description: "Developer Q&A community",
        url: "https://stackoverflow.com",
        category: "Development", 
        tags: ["programming", "questions", "community"],
      },
      {
        title: "MDN Web Docs",
        description: "Web development documentation",
        url: "https://developer.mozilla.org",
        category: "Documentation",
        tags: ["web", "documentation", "reference"],
      }
    ]
  }

  static clearCache(): void {
    this.cache = null
    this.lastFetch = 0
    console.log('🗑️  Cache cleared')
  }
  
  static getCacheInfo(): { isCached: boolean, lastFetch: Date | null, age: number } {
    return {
      isCached: this.cache !== null,
      lastFetch: this.lastFetch ? new Date(this.lastFetch) : null,
      age: this.lastFetch ? Date.now() - this.lastFetch : 0
    }
  }
  
  static async forceRefresh(): Promise<ParsedLink[]> {
    console.log('🔄 Force refreshing navigation data...')
    return this.fetchNavigationData(true)
  }
}