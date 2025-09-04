import { useState, useMemo, useEffect } from 'react'
import { ThemeProvider } from './components/ThemeProvider'
import { ThemeToggle } from './components/ThemeToggle'
import { SearchFilter } from './components/SearchFilter'
import { LinkCard } from './components/LinkCard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { ApiService } from './services/apiService'
import { RefreshCw, AlertCircle, Star } from 'lucide-react'
import { Button } from './components/ui/button'
import { Alert, AlertDescription } from './components/ui/alert'

interface Link {
  title: string
  description: string
  url: string
  category: string
  tags: string[]
  icon?: React.ReactNode
  imageUrl?: string
}



export default function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [links, setLinks] = useState<Link[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isFromApi, setIsFromApi] = useState(false)
  const [dataSource, setDataSource] = useState<'api' | 'cache' | 'fallback'>('fallback')

  const categories = useMemo(() => {
    return Array.from(new Set(links.map(link => link.category)))
  }, [links])

  const inxeozBucketLinks = useMemo(() => {
    return links.filter(link => link.category === 'Inxeoz Bucket')
  }, [links])

  const filteredLinks = useMemo(() => {
    return links.filter(link => {
      const matchesSearch = searchTerm === '' || 
        link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        link.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        link.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesCategory = activeCategory === 'all' || link.category === activeCategory

      return matchesSearch && matchesCategory
    })
  }, [searchTerm, activeCategory, links])

  const totalLinks = links.length

  const loadNavigationData = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await ApiService.fetchNavigationData()
      console.log(`📊 Loaded ${response.data.length} navigation links from ${response.source}`)
      console.log('📋 Categories found:', Array.from(new Set(response.data.map(link => link.category))))
      setLinks(response.data)
      setIsFromApi(response.isFromApi)
      setDataSource(response.source)
    } catch (err) {
      setError('Failed to load navigation data. Please try again.')
      console.error('Error loading navigation data:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await ApiService.forceRefresh()
      console.log(`🔄 Refreshed ${response.data.length} navigation links from ${response.source}`)
      setLinks(response.data)
      setIsFromApi(response.isFromApi)
      setDataSource(response.source)
    } catch (err) {
      setError('Failed to refresh navigation data. Please try again.')
      console.error('Error refreshing navigation data:', err)
    } finally {
      setLoading(false)
    }
  }

  const testApiConnection = async () => {
    console.log('🧪 Testing API connection...')
    const result = await ApiService.testApiConnection()
    console.log('🧪 Test result:', result)
    if (result.success) {
      alert(`✅ API Test Successful!\n${result.message}`)
    } else {
      alert(`❌ API Test Failed!\n${result.message}`)
    }
  }

  useEffect(() => {
    loadNavigationData()
  }, [])

  return (
    <ThemeProvider defaultTheme="dark">
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
            <div className="flex items-start sm:items-center justify-between gap-4">
              <div className="space-y-1 min-w-0 flex-1">
                <h1 className="text-xl sm:text-2xl font-bold truncate">Navigation Hub</h1>
                <p className="text-muted-foreground text-sm sm:text-base hidden sm:block">Your gateway to essential development resources</p>
                <p className="text-muted-foreground text-sm sm:hidden">Development resources hub</p>
              </div>
              <div className="flex-shrink-0">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Error Alert */}
          {error && (
            <Alert className="mb-6 border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="flex items-center justify-between">
                <span>{error}</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleRefresh}
                  className="ml-4 h-8"
                >
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Retry
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {/* Search */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center gap-2 max-w-sm sm:max-w-md lg:max-w-lg mx-auto">
              <SearchFilter 
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleRefresh}
                disabled={loading}
                className="flex-shrink-0"
                title="Refresh from API"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                <span className="sr-only">Refresh data from API</span>
              </Button>
              {process.env.NODE_ENV === 'development' && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={testApiConnection}
                  className="flex-shrink-0 text-xs"
                  title="Test API Connection"
                >
                  Test API
                </Button>
              )}
            </div>
            {/* Debug info for development */}
            {process.env.NODE_ENV === 'development' && (
              <div className="text-center mt-2 space-y-1">
                <div className="text-xs text-muted-foreground">
                  {(() => {
                    const cacheInfo = ApiService.getCacheInfo()
                    return cacheInfo.isCached 
                      ? `Cached ${Math.round(cacheInfo.age / 1000)}s ago`
                      : 'No cache'
                  })()}
                </div>
                <div className="text-xs text-muted-foreground">
                  Total Links: {links.length} | Filtered: {filteredLinks.length} | Source: {dataSource}
                </div>
              </div>
            )}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Loading navigation links...</p>
            </div>
          )}

          {/* Inxeoz Bucket Section - Show when we have Inxeoz Bucket links */}
          {!loading && inxeozBucketLinks.length > 0 && (
            <div className="mb-8 sm:mb-10">
              {/* Header */}
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="flex items-center gap-2 bg-gradient-to-r from-neutral-5/40 via-neutral-5/20 to-transparent px-4 py-2 rounded-lg border border-neutral-5/30 shadow-sm">
                  <div className="p-1 bg-neutral-5/30 rounded-md">
                    <Star className="h-4 w-4 text-neutral-5-foreground fill-neutral-5/40" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-neutral-5-foreground">Inxeoz Bucket</h2>
                    <p className="text-xs text-neutral-5-foreground/80">Quick access favorites</p>
                  </div>
                </div>
                <div className="h-px bg-gradient-to-r from-neutral-5/40 to-transparent flex-1" />
                <span className="text-xs text-neutral-5-foreground bg-neutral-5/30 px-3 py-1.5 rounded-full font-medium border border-neutral-5/40">
                  {inxeozBucketLinks.length}
                </span>
              </div>

              {/* Links Grid - Horizontal scrolling on mobile, grid on larger screens */}
              <div className="sm:hidden">
                <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory">
                  {inxeozBucketLinks.map((link, index) => (
                    <div key={`bucket-${link.title}-${index}`} className="flex-shrink-0 w-72 snap-start">
                      <LinkCard
                        title={link.title}
                        description={link.description}
                        url={link.url}
                        category={link.category}
                        icon={link.icon}
                        imageUrl={link.imageUrl}
                        index={index}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="hidden sm:block">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                  {inxeozBucketLinks.map((link, index) => (
                    <LinkCard
                      key={`bucket-${link.title}-${index}`}
                      title={link.title}
                      description={link.description}
                      url={link.url}
                      category={link.category}
                      icon={link.icon}
                      imageUrl={link.imageUrl}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Category Tabs */}
          {!loading && (
            <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
              <div className="mb-6 sm:mb-8">
                <TabsList className="w-full h-auto p-1 flex flex-wrap justify-center gap-1 sm:gap-2">
                  <TabsTrigger 
                    value="all" 
                    className="text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 min-w-0"
                  >
                    <span className="truncate">All ({totalLinks})</span>
                  </TabsTrigger>
                  {categories.map(category => {
                    const count = links.filter(link => link.category === category).length
                    
                    // Better mobile-friendly category names
                    const getMobileName = (cat: string) => {
                      const mobileNames: Record<string, string> = {
                        'Common Online Services': 'Services',
                        'Developer Documentation': 'Docs',
                        'API & Swagger Tools': 'APIs',
                        'Knowledge Base & Wikis': 'Wiki',
                        'Markdown References': 'Markdown',
                        'Cloud Services / DevOps': 'Cloud',
                        'Cloud Services': 'Cloud',
                        'DevOps': 'DevOps',
                        'Inxeoz Bucket': 'Bucket',
                      }
                      return mobileNames[cat] || (cat.length > 8 ? cat.substring(0, 6) + '...' : cat)
                    }
                    
                    return (
                      <TabsTrigger 
                        key={category} 
                        value={category} 
                        className="text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 min-w-0 max-w-[80px] sm:max-w-none"
                        title={category} // Show full name on hover
                      >
                        <span className="hidden md:inline truncate">{category} ({count})</span>
                        <span className="hidden sm:inline md:hidden truncate">{category.length > 12 ? category.substring(0, 8) + '...' : category}</span>
                        <span className="sm:hidden truncate">{getMobileName(category)}</span>
                      </TabsTrigger>
                    )
                  })}
                </TabsList>
              </div>

              <TabsContent value={activeCategory} className="mt-0">
                {/* Links Grid */}
                {filteredLinks.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
                    {filteredLinks.map((link, index) => (
                      <LinkCard
                        key={`${link.title}-${index}`}
                        title={link.title}
                        description={link.description}
                        url={link.url}
                        category={link.category}
                        icon={link.icon}
                        imageUrl={link.imageUrl}
                        index={index}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 sm:py-12">
                    <p className="text-muted-foreground text-base sm:text-lg mb-2">No links found</p>
                    <p className="text-muted-foreground text-sm sm:text-base">Try adjusting your search or category filter</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-8 sm:mt-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="text-center space-y-2">
              <p className="text-muted-foreground text-sm sm:text-base">
                Navigation Hub - Curated collection of essential development resources
              </p>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Found a broken link or want to suggest a new one? Let us know!
              </p>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  )
}