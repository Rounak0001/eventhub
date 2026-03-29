import { MapPin, Users } from 'lucide-react'
import type { Venue } from '../types/domain'
import { formatCurrency } from '../utils/format'

interface VenueCardProps {
  venue: Venue
  selected?: boolean
  onSelect?: () => void
}

export function VenueCard({ venue, selected, onSelect }: VenueCardProps) {
  return (
    <button type="button" onClick={onSelect} className={`paper-panel group text-left transition ${selected ? 'ring-2 ring-[color:var(--color-gold)]' : ''}`}>
      <div className="overflow-hidden rounded-[1.65rem]">
        <img src={venue.image ?? '/img1.webp'} alt={venue.name} className="h-60 w-full object-cover transition duration-700 group-hover:scale-105" />
      </div>
      <div className="space-y-4 px-5 py-5">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--color-gold-deep)]">{venue.style}</p>
          <h3 className="mt-2 font-display text-2xl">{venue.name}</h3>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-[color:var(--color-muted)]">
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4" /> {venue.city}
          </span>
          <span className="inline-flex items-center gap-2">
            <Users className="h-4 w-4" /> up to {venue.capacity ?? 200}
          </span>
        </div>
        <p className="text-sm text-[color:var(--color-muted)]">from {formatCurrency(venue.startingPrice)}</p>
      </div>
    </button>
  )
}
