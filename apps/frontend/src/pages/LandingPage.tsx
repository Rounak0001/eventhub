import { BadgeIndianRupee, HeartHandshake, MapPinned, PartyPopper, UtensilsCrossed } from 'lucide-react'
import { Link } from 'react-router-dom'
import { GalleryGrid } from '../components/GalleryGrid'
import { HeroSection } from '../components/HeroSection'
import { VenueCard } from '../components/VenueCard'
import { curatedVenues, galleryMoments } from '../data/content'

const categories = [
  { icon: HeartHandshake, title: 'Wedding events', text: 'Venue, decor tier, food tier, capacity, and invite flow in one pipeline.' },
  { icon: PartyPopper, title: 'Private & public events', text: 'Support invite-only access codes or discoverable public registrations.' },
  { icon: MapPinned, title: 'Availability-first booking', text: 'Only valid venue and vendor combinations should pass to booking.' },
  { icon: UtensilsCrossed, title: 'Tiered vendors', text: 'Standard, Premium, and Plus pricing mapped into deterministic event costs.' },
  { icon: BadgeIndianRupee, title: 'Demo payment ready', text: 'Paid events can move through a realistic internal payment simulation.' },
]

export function LandingPage() {
  return (
    <div className="pb-8">
      <HeroSection />

      <section className="section-shell py-16">
        <div className="mb-8">
          <span className="eyebrow">MVP Scope</span>
          <h2 className="section-title max-w-3xl">The design you shared has been reshaped around the actual event-platform business model.</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {categories.map((item) => (
            <div key={item.title} className="paper-panel px-6 py-6">
              <item.icon className="h-6 w-6 text-[color:var(--color-gold-deep)]" />
              <h3 className="mt-6 font-display text-2xl">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[color:var(--color-muted)]">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell py-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow">Seeded Venues</span>
            <h2 className="section-title">Three-city inventory for the first demo narrative</h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-[color:var(--color-muted)]">
            The frontend now points toward city + event-type aware catalog endpoints so backend integration lands cleanly.
          </p>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {curatedVenues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      </section>

      <section className="section-shell py-16">
        <div className="mb-8">
          <span className="eyebrow">Look & Feel</span>
          <h2 className="section-title">The original invitation-style visual language is preserved, but the UX is now more product-oriented.</h2>
        </div>
        <GalleryGrid images={galleryMoments} />
      </section>

      <section className="section-shell py-8">
        <div className="paper-panel floral-corner px-6 py-10 text-center sm:px-10">
          <span className="eyebrow">Execution Path</span>
          <h2 className="section-title">Frontend is now positioned for backend integration instead of just static presentation.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[color:var(--color-muted)]">
            Next phase is backend implementation against auth, catalog, events, registrations, demo payments, admin actions, and Brevo notifications.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/create" className="primary-button">
              Create an Event
            </Link>
            <Link to="/admin" className="secondary-button">
              Open Admin Panel
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
