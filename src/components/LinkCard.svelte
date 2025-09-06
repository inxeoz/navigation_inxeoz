<script lang="ts">
  import { ExternalLink, Globe } from 'lucide-svelte'
  import Card from './ui/card/Card.svelte'
  import CardContent from './ui/card/CardContent.svelte'
  import CardHeader from './ui/card/CardHeader.svelte'
  import Badge from './ui/badge/Badge.svelte'
  import { getCardColorVariant, getColorClasses, type NeutralColorVariant } from './utils/colorUtils'

  export let title: string
  export let description: string
  export let url: string
  export let category: string
  export let icon: any = undefined
  export let imageUrl: string | undefined = undefined
  export let index: number

  const colorVariant: NeutralColorVariant = getCardColorVariant(title, index)
  const colors = getColorClasses(colorVariant)

  const handleClick = () => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const getDomainFromUrl = (url: string): string => {
    try {
      return new URL(url).hostname.replace(/^www\./, '')
    } catch {
      return url
    }
  }

  const domain = getDomainFromUrl(url)
</script>

<Card 
  class="cursor-pointer transition-all duration-200 {colors.card} {colors.hover}"
  on:click={handleClick}
>
  <CardHeader class="pb-3 p-4 sm:p-6">
    <div class="flex items-start justify-between gap-3">
      <div class="flex items-start gap-3 min-w-0 flex-1">
        {#if imageUrl}
          <img
            src={imageUrl}
            alt={`${title} icon`}
            class="w-6 h-6 sm:w-8 sm:h-8 rounded flex-shrink-0 object-contain"
          />
        {:else if icon}
          <svelte:component this={icon} class="w-5 h-5 sm:w-6 sm:h-6 {colors.text} flex-shrink-0" />
        {:else}
          <Globe class="w-5 h-5 sm:w-6 sm:h-6 {colors.text} flex-shrink-0" />
        {/if}
        
        <div class="min-w-0 flex-1">
          <h3 class="font-semibold text-sm sm:text-base {colors.text} leading-tight line-clamp-2">
            {title}
          </h3>
          <p class="text-xs sm:text-sm text-muted-foreground mt-1 opacity-80">
            {domain}
          </p>
        </div>
      </div>
      
      <ExternalLink class="w-4 h-4 {colors.text} flex-shrink-0 opacity-60" />
    </div>
  </CardHeader>
  
  <CardContent class="pt-0 p-4 sm:p-6">
    <p class="text-xs sm:text-sm {colors.text} opacity-90 leading-relaxed line-clamp-3 mb-3">
      {description}
    </p>
    
    <div class="flex items-center justify-between">
      <Badge variant="outline" class="{colors.badge} text-xs">
        {category}
      </Badge>
    </div>
  </CardContent>
</Card>