import { ExternalLink } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { DynamicIcon } from './DynamicIcon'
import { getCardColorVariant, getColorClasses, NeutralColorVariant } from './utils/colorUtils'

interface LinkCardProps {
  title: string
  description: string
  url: string
  category: string
  icon?: React.ReactNode
  imageUrl?: string
  index?: number
  colorVariant?: NeutralColorVariant
}

export function LinkCard({ title, description, url, category, icon, imageUrl, index = 0, colorVariant }: LinkCardProps) {
  const variant = colorVariant || getCardColorVariant(title, index)
  const colors = getColorClasses(variant)
  
  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 cursor-pointer h-full border-0 ${colors.card} ${colors.hover}`}>
      <a href={url} target="_blank" rel="noopener noreferrer" className="block h-full">
        <CardHeader className="pb-3 p-4 sm:p-6">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <div className={colors.text}>
                {icon || <DynamicIcon imageUrl={imageUrl} category={category} title={title} />}
              </div>
              <CardTitle className={`text-base sm:text-lg group-hover:opacity-80 transition-opacity truncate ${colors.text}`}>
                {title}
              </CardTitle>
            </div>
            <ExternalLink className={`h-4 w-4 opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5 ${colors.text}`} />
          </div>
          <Badge className={`w-fit text-xs sm:text-sm mt-2 ${colors.badge}`}>
            {category}
          </Badge>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <CardDescription className={`text-xs sm:text-sm line-clamp-3 opacity-80 ${colors.text}`}>
            {description}
          </CardDescription>
        </CardContent>
      </a>
    </Card>
  )
}