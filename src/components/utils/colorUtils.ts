export type NeutralColorVariant = 1 | 2 | 3 | 4 | 5 | 6

export function getCardColorVariant(title: string, index: number): NeutralColorVariant {
  // Create a more distributed hash combining title characters and index
  const titleHash = title.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0)
    return a & a
  }, 0)
  
  // Combine title hash with index for better distribution
  const combinedHash = Math.abs(titleHash + (index * 17) + (title.length * 7))
  
  // Ensure better distribution across all 6 variants
  const variants: NeutralColorVariant[] = [1, 2, 3, 4, 5, 6]
  return variants[combinedHash % 6]
}

export function getColorClasses(variant: NeutralColorVariant) {
  const colorMap = {
    1: {
      // Warm beige/cream
      card: 'bg-neutral-1/70 border-neutral-1/30 backdrop-blur-sm',
      badge: 'bg-neutral-1/80 text-neutral-1-foreground border-neutral-1/40',
      text: 'text-neutral-1-foreground',
      hover: 'hover:bg-neutral-1/90 hover:shadow-lg hover:border-neutral-1/50'
    },
    2: {
      // Cool blue-gray  
      card: 'bg-neutral-2/70 border-neutral-2/30 backdrop-blur-sm',
      badge: 'bg-neutral-2/80 text-neutral-2-foreground border-neutral-2/40',
      text: 'text-neutral-2-foreground',
      hover: 'hover:bg-neutral-2/90 hover:shadow-lg hover:border-neutral-2/50'
    },
    3: {
      // Slate gray
      card: 'bg-neutral-3/70 border-neutral-3/30 backdrop-blur-sm',
      badge: 'bg-neutral-3/80 text-neutral-3-foreground border-neutral-3/40',
      text: 'text-neutral-3-foreground',
      hover: 'hover:bg-neutral-3/90 hover:shadow-lg hover:border-neutral-3/50'
    },
    4: {
      // Warm brown
      card: 'bg-neutral-4/70 border-neutral-4/30 backdrop-blur-sm',
      badge: 'bg-neutral-4/80 text-neutral-4-foreground border-neutral-4/40',
      text: 'text-neutral-4-foreground',
      hover: 'hover:bg-neutral-4/90 hover:shadow-lg hover:border-neutral-4/50'
    },
    5: {
      // Green-gray
      card: 'bg-neutral-5/70 border-neutral-5/30 backdrop-blur-sm',
      badge: 'bg-neutral-5/80 text-neutral-5-foreground border-neutral-5/40',
      text: 'text-neutral-5-foreground',
      hover: 'hover:bg-neutral-5/90 hover:shadow-lg hover:border-neutral-5/50'
    },
    6: {
      // Warm taupe
      card: 'bg-neutral-6/70 border-neutral-6/30 backdrop-blur-sm',
      badge: 'bg-neutral-6/80 text-neutral-6-foreground border-neutral-6/40',
      text: 'text-neutral-6-foreground',
      hover: 'hover:bg-neutral-6/90 hover:shadow-lg hover:border-neutral-6/50'
    }
  }
  
  return colorMap[variant]
}