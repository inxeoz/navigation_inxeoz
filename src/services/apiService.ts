interface ApiLink {
  id: number
  title: string
  description: string
  url: string
  category: string
  imageUrl?: string
  tags: string[]
  created_at: string
}

interface NavigationLink {
  title: string
  description: string
  url: string
  category: string
  tags: string[]
  imageUrl?: string
}

interface ApiResponse {
  data: NavigationLink[]
  isFromApi: boolean
  source: 'api' | 'cache' | 'fallback'
}

export class ApiService {
  private static readonly API_URL = 'https://nav.api.inxeoz.com/links'
  private static cache: NavigationLink[] | null = null
  private static lastFetch: number = 0
  private static readonly CACHE_DURATION = 5 * 60 * 1000 // 5 minutes
  private static readonly MAX_RETRIES = 3

  static async fetchNavigationData(forceRefresh: boolean = false): Promise<ApiResponse> {
    const now = Date.now()
    const isCacheValid = this.cache && (now - this.lastFetch < this.CACHE_DURATION)
    
    if (!forceRefresh && isCacheValid) {
      console.log('📦 Using cached data:', this.cache!.length, 'links')
      return {
        data: this.cache!,
        isFromApi: true, // Cache is from previous API call
        source: 'cache'
      }
    }

    // Try to fetch with retries
    for (let attempt = 1; attempt <= this.MAX_RETRIES; attempt++) {
      try {
        console.log(`🔄 Fetching from: ${this.API_URL} (attempt ${attempt}/${this.MAX_RETRIES})`)
        
        const controller = new AbortController()
        const timeoutId = setTimeout(() => {
          console.log('⏰ Request timeout - aborting')
          controller.abort()
        }, 10000) // 10 second timeout
        
        const response = await fetch(this.API_URL, {
          signal: controller.signal,
          method: 'GET',
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache',
            'User-Agent': 'NavigationHub/1.0'
          }
        })
        
        clearTimeout(timeoutId)
        
        console.log(`📡 Response status: ${response.status} ${response.statusText}`)
        console.log(`📋 Response headers:`, Object.fromEntries(response.headers.entries()))
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`)
        }
        
        const responseText = await response.text()
        console.log(`📄 Raw response length: ${responseText.length} characters`)
        
        let apiData: ApiLink[]
        try {
          apiData = JSON.parse(responseText)
        } catch (parseError) {
          console.error('❌ JSON parse error:', parseError)
          console.log('📄 Response preview:', responseText.substring(0, 200))
          throw new Error('Invalid JSON response from API')
        }
        
        console.log('✅ Successfully fetched and parsed:', `${apiData.length} links`)
        console.log('📊 Sample data:', apiData.slice(0, 2))
        
        // Transform API data to our internal format
        const transformedData = this.transformApiData(apiData)
        
        this.cache = transformedData
        this.lastFetch = now
        
        return {
          data: transformedData,
          isFromApi: true,
          source: 'api'
        }
        
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error)
        console.warn(`❌ Attempt ${attempt} failed:`, errorMessage)
        
        if (error instanceof TypeError && error.message.includes('fetch')) {
          console.warn('🌐 Network error - possible CORS or connectivity issue')
        }
        
        // If this is the last attempt, return cached data or fallback
        if (attempt === this.MAX_RETRIES) {
          console.error('🚨 All fetch attempts failed, using fallback data with all 26 links')
          if (this.cache) {
            return {
              data: this.cache,
              isFromApi: true, // Cache is from previous API call
              source: 'cache'
            }
          } else {
            return {
              data: this.getFallbackData(),
              isFromApi: false,
              source: 'fallback'
            }
          }
        }
        
        // Wait before retry (exponential backoff)
        const delay = Math.pow(2, attempt - 1) * 1000
        console.log(`⏳ Waiting ${delay}ms before retry...`)
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }
    
    return {
      data: this.getFallbackData(),
      isFromApi: false,
      source: 'fallback'
    }
  }

  private static transformApiData(apiData: ApiLink[]): NavigationLink[] {
    console.log(`🔄 Transforming ${apiData.length} API items`)
    
    const transformedData = apiData
      .sort((a, b) => {
        // Sort by category first (Inxeoz Bucket first), then by id
        if (a.category === 'Inxeoz Bucket' && b.category !== 'Inxeoz Bucket') return -1
        if (b.category === 'Inxeoz Bucket' && a.category !== 'Inxeoz Bucket') return 1
        if (a.category !== b.category) return a.category.localeCompare(b.category)
        return a.id - b.id
      })
      .map(item => ({
        title: item.title,
        description: item.description,
        url: item.url,
        category: item.category,
        imageUrl: item.imageUrl,
        tags: item.tags || []
      }))
    
    console.log(`✅ Transformed to ${transformedData.length} navigation items`)
    const categories = Array.from(new Set(transformedData.map(item => item.category)))
    console.log(`📂 Categories: ${categories.join(', ')}`)
    
    return transformedData
  }

  private static getFallbackData(): NavigationLink[] {
    console.log('🔄 Using fallback data - ALL 26 links from API')
    return [
      {
        title: "Manjaro Linux",
        description: "Arch-based Linux distro you're using.",
        url: "https://manjaro.org/",
        category: "Inxeoz Bucket",
        imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
        tags: ["linux", "manjaro", "arch", "os", "distro"]
      },
      {
        title: "Android VM Setup",
        description: "Emulator/VM setup docs.",
        url: "https://developer.android.com/studio/run/emulator",
        category: "Inxeoz Bucket",
        imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
        tags: ["android", "vm", "emulator", "setup"]
      },
      {
        title: "Google Search",
        description: "Popular search engine.",
        url: "https://www.google.com/",
        category: "Common Online Services",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
        tags: ["search", "google", "engine"]
      },
      {
        title: "Wikipedia",
        description: "Free online encyclopedia.",
        url: "https://en.wikipedia.org/",
        category: "Common Online Services",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/63/Wikipedia-logo.svg",
        tags: ["encyclopedia", "knowledge", "wiki"]
      },
      {
        title: "Stack Overflow",
        description: "Developer Q&A community.",
        url: "https://stackoverflow.com/",
        category: "Common Online Services",
        imageUrl: "https://cdn.worldvectorlogo.com/logos/stack-overflow.svg",
        tags: ["developer", "questions", "answers", "community"]
      },
      {
        title: "GitHub",
        description: "Code hosting & collaboration.",
        url: "https://github.com/",
        category: "Common Online Services",
        imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
        tags: ["git", "code", "repository", "collaboration"]
      },
      {
        title: "MDN Web Docs",
        description: "Web development documentation.",
        url: "https://developer.mozilla.org/",
        category: "Developer Documentation",
        imageUrl: "https://raw.githubusercontent.com/aleen42/badges/master/src/mdn.svg",
        tags: ["docs", "html", "css", "javascript", "web"]
      },
      {
        title: "Python Docs",
        description: "Official Python reference.",
        url: "https://docs.python.org/3/",
        category: "Developer Documentation",
        imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        tags: ["python", "docs", "reference"]
      },
      {
        title: "Node.js Docs",
        description: "Node.js API & usage.",
        url: "https://nodejs.org/en/docs/",
        category: "Developer Documentation",
        imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        tags: ["nodejs", "docs", "javascript"]
      },
      {
        title: "React Docs",
        description: "React library docs.",
        url: "https://react.dev/docs/getting-started",
        category: "Developer Documentation",
        imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        tags: ["react", "docs", "frontend", "javascript"]
      },
      {
        title: "Next.js Docs",
        description: "Next.js framework docs.",
        url: "https://nextjs.org/docs",
        category: "Developer Documentation",
        imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        tags: ["nextjs", "docs", "react", "framework"]
      },
      {
        title: "Svelte Docs",
        description: "Svelte framework docs.",
        url: "https://svelte.dev/docs",
        category: "Developer Documentation",
        imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg",
        tags: ["svelte", "docs", "framework"]
      },
      {
        title: "Frappe/ERPNext Docs",
        description: "Frappe / ERPNext documentation.",
        url: "https://frappeframework.com/docs/",
        category: "Developer Documentation",
        imageUrl: "https://brandfetch-resources.s3.us-east-2.amazonaws.com/frappe.io/logo.svg",
        tags: ["frappe", "erpnext", "docs", "framework"]
      },
      {
        title: "SwaggerHub",
        description: "API design & docs hub.",
        url: "https://swagger.io/tools/swaggerhub/",
        category: "API & Swagger Tools",
        imageUrl: "https://static1.smartbear.co/swagger/media/assets/images/swagger_logo.svg",
        tags: ["api", "swagger", "docs", "design"]
      },
      {
        title: "ReDoc",
        description: "OpenAPI documentation generator.",
        url: "https://github.com/Redocly/redoc",
        category: "API & Swagger Tools",
        imageUrl: "https://redocly.github.io/redoc/logo.svg",
        tags: ["api", "docs", "openapi"]
      },
      {
        title: "Postman Docs",
        description: "API collaboration & testing tool.",
        url: "https://learning.postman.com/docs/",
        category: "API & Swagger Tools",
        imageUrl: "https://vectorlogo.zone/logos/getpostman/icon.svg",
        tags: ["api", "testing", "collaboration", "postman"]
      },
      {
        title: "Notion",
        description: "All-in-one notes & docs platform.",
        url: "https://www.notion.so/",
        category: "Knowledge Base & Wikis",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/02/Notion-logo.svg",
        tags: ["notes", "docs", "knowledge", "wiki"]
      },
      {
        title: "Confluence",
        description: "Team collaboration wiki.",
        url: "https://www.atlassian.com/software/confluence",
        category: "Knowledge Base & Wikis",
        imageUrl: "https://cdn.worldvectorlogo.com/logos/confluence-1.svg",
        tags: ["team", "collaboration", "wiki"]
      },
      {
        title: "ProProfs KB",
        description: "Help center & knowledge base tool.",
        url: "https://www.proprofskb.com/",
        category: "Knowledge Base & Wikis",
        imageUrl: "https://www.proprofskb.com/wp-content/uploads/2020/02/proprofs-logo.svg",
        tags: ["knowledge", "help", "docs"]
      },
      {
        title: "Markdown Guide",
        description: "CommonMark official guide.",
        url: "https://commonmark.org/help/",
        category: "Markdown References",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/48/Markdown-mark.svg",
        tags: ["markdown", "guide", "reference"]
      },
      {
        title: "MDN Markdown Guide",
        description: "MDN guide for Markdown.",
        url: "https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Howto/Markdown_in_MDN",
        category: "Markdown References",
        imageUrl: "https://raw.githubusercontent.com/aleen42/badges/master/src/mdn.svg",
        tags: ["markdown", "guide", "mdn"]
      },
      {
        title: "Relative Links",
        description: "Guide to relative linking in Markdown.",
        url: "https://www.docstomarkdown.pro/relative-links-in-markdown/",
        category: "Markdown References",
        imageUrl: "https://www.svgrepo.com/show/349418/link.svg",
        tags: ["markdown", "links", "relative"]
      },
      {
        title: "Creating Links",
        description: "Markdown link creation guide.",
        url: "https://anvilproject.org/guides/content/creating-links",
        category: "Markdown References",
        imageUrl: "https://www.svgrepo.com/show/353540/anvil.svg",
        tags: ["markdown", "links", "guide"]
      },
      {
        title: "AWS Docs",
        description: "Amazon Web Services documentation.",
        url: "https://docs.aws.amazon.com/",
        category: "Cloud Services / DevOps",
        imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
        tags: ["aws", "cloud", "docs", "amazon"]
      },
      {
        title: "Azure Docs",
        description: "Microsoft Azure docs.",
        url: "https://learn.microsoft.com/en-us/",
        category: "Cloud Services / DevOps",
        imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
        tags: ["azure", "cloud", "docs", "microsoft"]
      },
      {
        title: "Google Cloud Docs",
        description: "Google Cloud documentation.",
        url: "https://cloud.google.com/docs",
        category: "Cloud Services / DevOps",
        imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
        tags: ["google", "cloud", "docs", "gcp"]
      }
    ]
  }

  static clearCache(): void {
    this.cache = null
    this.lastFetch = 0
    console.log('🗑️ Cache cleared')
  }
  
  static getCacheInfo(): { isCached: boolean, lastFetch: Date | null, age: number } {
    return {
      isCached: this.cache !== null,
      lastFetch: this.lastFetch ? new Date(this.lastFetch) : null,
      age: this.lastFetch ? Date.now() - this.lastFetch : 0
    }
  }
  
  static async forceRefresh(): Promise<ApiResponse> {
    console.log('🔄 Force refreshing navigation data...')
    return this.fetchNavigationData(true)
  }

  static async testApiConnection(): Promise<{ success: boolean, message: string, data?: any }> {
    try {
      console.log('🧪 Testing API connection...')
      const response = await fetch(this.API_URL, {
        method: 'GET',
        mode: 'cors',
        headers: { 'Accept': 'application/json' }
      })
      
      if (!response.ok) {
        return {
          success: false,
          message: `HTTP ${response.status}: ${response.statusText}`
        }
      }
      
      const data = await response.json()
      return {
        success: true,
        message: `Successfully connected! Got ${data.length} items`,
        data: data
      }
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : String(error)
      }
    }
  }
}
