import { useState } from 'react'
import { 
  Globe, 
  Code, 
  BookOpen, 
  Database, 
  Cloud, 
  Shield, 
  Zap,
  Github,
  FileText,
  Settings,
  Smartphone,
  Monitor,
  PenTool,
  MessageSquare
} from 'lucide-react'

interface DynamicIconProps {
  imageUrl?: string
  category: string
  title: string
  className?: string
}

const DEFAULT_ICONS: Record<string, React.ReactNode> = {
  'common online services': <Globe className="h-4 w-4" />,
  'developer documentation': <BookOpen className="h-4 w-4" />,
  'documentation': <BookOpen className="h-4 w-4" />,
  'api & swagger tools': <Code className="h-4 w-4" />,
  'knowledge base & wikis': <FileText className="h-4 w-4" />,
  'markdown references': <FileText className="h-4 w-4" />,
  'cloud services': <Cloud className="h-4 w-4" />,
  'devops': <Settings className="h-4 w-4" />,
  'development': <Code className="h-4 w-4" />,
  'security': <Shield className="h-4 w-4" />,
  'mobile': <Smartphone className="h-4 w-4" />,
  'design': <PenTool className="h-4 w-4" />,
  'blog': <MessageSquare className="h-4 w-4" />,
  'news': <MessageSquare className="h-4 w-4" />,
}

const TITLE_BASED_ICONS: Record<string, React.ReactNode> = {
  'github': <Github className="h-4 w-4" />,
  'google': <Globe className="h-4 w-4" />,
  'stack overflow': <Code className="h-4 w-4" />,
  'react': <Code className="h-4 w-4" />,
  'node': <Code className="h-4 w-4" />,
  'python': <Code className="h-4 w-4" />,
  'aws': <Cloud className="h-4 w-4" />,
  'azure': <Cloud className="h-4 w-4" />,
  'google cloud': <Cloud className="h-4 w-4" />,
  'manjaro': <Monitor className="h-4 w-4" />,
  'linux': <Monitor className="h-4 w-4" />,
  'android': <Smartphone className="h-4 w-4" />,
  'glow': <FileText className="h-4 w-4" />,
  'markdown': <FileText className="h-4 w-4" />,
  'vscode': <Code className="h-4 w-4" />,
  'vs code': <Code className="h-4 w-4" />,
}

export function DynamicIcon({ imageUrl, category, title, className = "h-4 w-4" }: DynamicIconProps) {
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(!!imageUrl)

  const handleImageError = () => {
    setImageError(true)
    setIsLoading(false)
  }

  const handleImageLoad = () => {
    setImageError(false)
    setIsLoading(false)
  }

  const getFallbackIcon = () => {
    const titleKey = title.toLowerCase()
    const categoryKey = category.toLowerCase()
    
    // Check title-based icons first
    for (const [key, icon] of Object.entries(TITLE_BASED_ICONS)) {
      if (titleKey.includes(key)) {
        return icon
      }
    }
    
    // Check category-based icons
    for (const [key, icon] of Object.entries(DEFAULT_ICONS)) {
      if (categoryKey.includes(key)) {
        return icon
      }
    }
    
    return <Globe className="h-4 w-4" />
  }

  // If we have an image URL and it hasn't failed, try to show the image
  if (imageUrl && !imageError) {
    return (
      <div className={`flex-shrink-0 ${className}`}>
        {isLoading && (
          <div className={`${className} bg-muted animate-pulse rounded`} />
        )}
        <img
          src={imageUrl}
          alt={`${title} icon`}
          className={`${className} ${isLoading ? 'hidden' : 'block'}`}
          onError={handleImageError}
          onLoad={handleImageLoad}
          style={{ objectFit: 'contain' }}
          loading="lazy"
        />
      </div>
    )
  }

  // Fallback to lucide icon
  return (
    <div className={`text-primary flex-shrink-0 ${className}`}>
      {getFallbackIcon()}
    </div>
  )
}