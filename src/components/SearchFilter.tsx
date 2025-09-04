import { Search } from 'lucide-react'
import { Input } from './ui/input'

interface SearchFilterProps {
  searchTerm: string
  onSearchChange: (value: string) => void
}

export function SearchFilter({ searchTerm, onSearchChange }: SearchFilterProps) {
  return (
    <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        type="text"
        placeholder="Search links..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10 bg-input-background w-full text-base"
      />
    </div>
  )
}