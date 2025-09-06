<script lang="ts">
  import { onMount } from 'svelte'
  import { writable, derived } from 'svelte/store'
  import ThemeProvider from './components/ThemeProvider.svelte'
  import ThemeToggle from './components/ThemeToggle.svelte'
  import SearchFilter from './components/SearchFilter.svelte'
  import LinkCard from './components/LinkCard.svelte'
  import Tabs from './components/ui/tabs/Tabs.svelte'
  import TabsContent from './components/ui/tabs/TabsContent.svelte'
  import TabsList from './components/ui/tabs/TabsList.svelte'
  import TabsTrigger from './components/ui/tabs/TabsTrigger.svelte'
  import { staticNavigationData, getCategories } from './data/staticNavigationData'
  import { Star } from 'lucide-svelte'

  interface Link {
    title: string
    description: string
    url: string
    category: string
    tags: string[]
    icon?: any
    imageUrl?: string
  }

  // Stores
  const searchTerm = writable('')
  const activeCategory = writable('all')
  const links = writable<Link[]>(staticNavigationData)
  const loading = writable(false)

  // Derived stores - using static data directly for categories
  const categories = writable(getCategories())

  const inxeozBucketLinks = derived(links, ($links) => {
    return $links.filter(link => link.category === 'Inxeoz Bucket')
  })

  const filteredLinks = derived(
    [searchTerm, activeCategory, links],
    ([$searchTerm, $activeCategory, $links]) => {
      return $links.filter(link => {
        const matchesSearch = $searchTerm === '' || 
          link.title.toLowerCase().includes($searchTerm.toLowerCase()) ||
          link.description.toLowerCase().includes($searchTerm.toLowerCase()) ||
          link.tags.some(tag => tag.toLowerCase().includes($searchTerm.toLowerCase()))
        
        const matchesCategory = $activeCategory === 'all' || link.category === $activeCategory

        return matchesSearch && matchesCategory
      })
    }
  )

  const totalLinks = derived(links, ($links) => $links.length)

  const getMobileName = (cat: string) => {
    const mobileNames: Record<string, string> = {
      'Common Online Services': 'Services',
      'Developer Documentation': 'Docs',
      'API & Swagger Tools': 'APIs',
      'Knowledge Base & Wikis': 'Wiki',
      'Markdown References': 'Markdown',
      'Cloud Services / DevOps': 'Cloud',
      'Design Tools': 'Design',
      'Learning Resources': 'Learn',
      'Utilities': 'Utils',
      'Inxeoz Bucket': 'Bucket',
    }
    return mobileNames[cat] || (cat.length > 8 ? cat.substring(0, 6) + '...' : cat)
  }
</script>

<ThemeProvider defaultTheme="dark">
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div class="flex items-start sm:items-center justify-between gap-4">
          <div class="space-y-1 min-w-0 flex-1">
            <h1 class="text-xl sm:text-2xl font-bold truncate">Navigation Hub</h1>
            <p class="text-muted-foreground text-sm sm:text-base hidden sm:block">Your gateway to essential development resources</p>
            <p class="text-muted-foreground text-sm sm:hidden">Development resources hub</p>
          </div>
          <div class="flex-shrink-0">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <!-- Search -->
      <div class="mb-6 sm:mb-8">
        <div class="flex items-center gap-2 max-w-sm sm:max-w-md lg:max-w-lg mx-auto">
          <SearchFilter 
            bind:searchTerm={$searchTerm}
          />
        </div>
        <!-- Debug info for development -->
        {#if import.meta.env.DEV}
          <div class="text-center mt-2 space-y-1">
            <div class="text-xs text-muted-foreground">
              Total Links: {$links.length} | Filtered: {$filteredLinks.length} | Source: Static Data
            </div>
          </div>
        {/if}
      </div>

      <!-- Inxeoz Bucket Section - Show when we have Inxeoz Bucket links -->
      {#if $inxeozBucketLinks.length > 0}
        <div class="mb-8 sm:mb-10">
          <!-- Header -->
          <div class="flex items-center gap-3 mb-4 sm:mb-6">
            <div class="flex items-center gap-2 bg-gradient-to-r from-neutral-5/40 via-neutral-5/20 to-transparent px-4 py-2 rounded-lg border border-neutral-5/30 shadow-sm">
              <div class="p-1 bg-neutral-5/30 rounded-md">
                <Star class="h-4 w-4 text-neutral-5-foreground fill-neutral-5/40" />
              </div>
              <div>
                <h2 class="font-semibold text-neutral-5-foreground">Inxeoz Bucket</h2>
                <p class="text-xs text-neutral-5-foreground/80">Quick access favorites</p>
              </div>
            </div>
            <div class="h-px bg-gradient-to-r from-neutral-5/40 to-transparent flex-1" />
            <span class="text-xs text-neutral-5-foreground bg-neutral-5/30 px-3 py-1.5 rounded-full font-medium border border-neutral-5/40">
              {$inxeozBucketLinks.length}
            </span>
          </div>

          <!-- Links Grid - Horizontal scrolling on mobile, grid on larger screens -->
          <div class="sm:hidden">
            <div class="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory">
              {#each $inxeozBucketLinks as link, index}
                <div class="flex-shrink-0 w-72 snap-start">
                  <LinkCard
                    title={link.title}
                    description={link.description}
                    url={link.url}
                    category={link.category}
                    icon={link.icon}
                    imageUrl={link.imageUrl}
                    {index}
                  />
                </div>
              {/each}
            </div>
          </div>

          <div class="hidden sm:block">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {#each $inxeozBucketLinks as link, index}
                <LinkCard
                  title={link.title}
                  description={link.description}
                  url={link.url}
                  category={link.category}
                  icon={link.icon}
                  imageUrl={link.imageUrl}
                  {index}
                />
              {/each}
            </div>
          </div>
        </div>
      {/if}

      <!-- Category Tabs -->
        <Tabs bind:value={$activeCategory} class="w-full">
          <div class="mb-6 sm:mb-8">
            <TabsList class="w-full h-auto p-1 flex flex-wrap justify-center gap-1 sm:gap-2">
              <TabsTrigger 
                value="all" 
                class="text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 min-w-0"
              >
                <span class="truncate">All ({$totalLinks})</span>
              </TabsTrigger>
              {#each $categories as category}
                {@const count = $links.filter(link => link.category === category).length}
                <TabsTrigger 
                  value={category}
                  class="text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 min-w-0 max-w-[80px] sm:max-w-none"
                  title={category}
                >
                  <span class="hidden md:inline truncate">{category} ({count})</span>
                  <span class="hidden sm:inline md:hidden truncate">{category.length > 12 ? category.substring(0, 8) + '...' : category}</span>
                  <span class="sm:hidden truncate">{getMobileName(category)}</span>
                </TabsTrigger>
              {/each}
            </TabsList>
          </div>

          <TabsContent value={$activeCategory} class="mt-0">
            <!-- Links Grid -->
            {#if $filteredLinks.length > 0}
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
                {#each $filteredLinks as link, index}
                  <LinkCard
                    title={link.title}
                    description={link.description}
                    url={link.url}
                    category={link.category}
                    icon={link.icon}
                    imageUrl={link.imageUrl}
                    {index}
                  />
                {/each}
              </div>
            {:else}
              <div class="text-center py-8 sm:py-12">
                <p class="text-muted-foreground text-base sm:text-lg mb-2">No links found</p>
                <p class="text-muted-foreground text-sm sm:text-base">Try adjusting your search or category filter</p>
              </div>
            {/if}
          </TabsContent>
        </Tabs>
    </main>

    <!-- Footer -->
    <footer class="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-8 sm:mt-12">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div class="text-center space-y-2">
          <p class="text-muted-foreground text-sm sm:text-base">
            Navigation Hub - Curated collection of essential development resources
          </p>
          <p class="text-muted-foreground text-xs sm:text-sm">
            Found a broken link or want to suggest a new one? Let us know!
          </p>
        </div>
      </div>
    </footer>
  </div>
</ThemeProvider>