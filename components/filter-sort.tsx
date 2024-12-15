import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SlidersHorizontal } from 'lucide-react'

interface FilterSortProps {
  rarity: string | null
  setRarity: (value: string | null) => void
  minPrice: string | null
  setMinPrice: (value: string | null) => void
  maxPrice: string | null
  setMaxPrice: (value: string | null) => void
  sortBy: string | null
  setSortBy: (value: string | null) => void
  sortOrder: string | null
  setSortOrder: (value: string | null) => void
}

export function FilterSort({
  rarity,
  setRarity,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
}: FilterSortProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filters & Sort
        </Button>
      </DialogTrigger>
      <DialogContent>
        <h2 className="text-2xl font-bold mb-4">Filters & Sort</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="filter-rarity">Rarity</Label>
            <Select value={rarity || ''} onValueChange={(value) => setRarity(value || null)}>
              <SelectTrigger id="filter-rarity">
                <SelectValue placeholder="Select rarity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All</SelectItem>
                <SelectItem value="common">Common</SelectItem>
                <SelectItem value="uncommon">Uncommon</SelectItem>
                <SelectItem value="rare">Rare</SelectItem>
                <SelectItem value="epic">Epic</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Price Range</Label>
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                placeholder="Min"
                value={minPrice || ''}
                onChange={(e) => setMinPrice(e.target.value || null)}
              />
              <span>-</span>
              <Input
                type="number"
                placeholder="Max"
                value={maxPrice || ''}
                onChange={(e) => setMaxPrice(e.target.value || null)}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="sort-by">Sort By</Label>
            <Select value={sortBy || ''} onValueChange={(value) => setSortBy(value || null)}>
              <SelectTrigger id="sort-by">
                <SelectValue placeholder="Select sort option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">None</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="dateListed">Date Listed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="sort-order">Sort Order</Label>
            <Select value={sortOrder || ''} onValueChange={(value) => setSortOrder(value || null)}>
              <SelectTrigger id="sort-order">
                <SelectValue placeholder="Select sort order" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Ascending</SelectItem>
                <SelectItem value="desc">Descending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

