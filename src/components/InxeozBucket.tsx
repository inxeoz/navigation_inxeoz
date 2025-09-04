import { Star } from 'lucide-react'
import { LinkCard } from './LinkCard'

interface Link {
  title: string
  description: string
  url: string
  category: string
  tags: string[]
  icon?: React.ReactNode
  imageUrl?: string
}

interface InxeozBucketProps {
  links: Link[]
}

export function InxeozBucket({ links }: InxeozBucketProps) {
  const bucketLinks = links.filter(link => link.category === 'Inxeoz Bucket')
  
  if (bucketLinks.length === 0) return null

  return (
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
          {bucketLinks.length}
        </span>
      </div>

      {/* Links Grid - Horizontal scrolling on mobile, grid on larger screens */}
      <div className="sm:hidden">
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory">
          {bucketLinks.map((link, index) => (
            <div key={`${link.title}-${index}`} className="flex-shrink-0 w-72 snap-start">
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
          {bucketLinks.map((link, index) => (
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
      </div>
    </div>
  )
}