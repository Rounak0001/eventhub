import { BadgeIndianRupee, HeartHandshake, MapPinned, PartyPopper, UtensilsCrossed } from 'lucide-react'
import { Link } from 'react-router-dom'
import { GalleryGrid } from '../components/GalleryGrid'
import { HeroSection } from '../components/HeroSection'
import { VenueCard } from '../components/VenueCard'
import { curatedVenues, galleryMoments } from '../data/content'

const categories = [
  { icon: HeartHandshake, title: 'Wedding celebrations', text: 'Bring together venue, decor, dining, and guest planning in one elegant experience.' },
  { icon: PartyPopper, title: 'Public or private moments', text: 'Host open celebrations or keep things intimate with invite-only access.' },
  { icon: MapPinned, title: 'Confident booking choices', text: 'Explore combinations that feel practical, polished, and right for your occasion.' },
  { icon: UtensilsCrossed, title: 'Curated vendor options', text: 'Compare catering and decor styles that match your vision and your budget.' },
  { icon: BadgeIndianRupee, title: 'Clear cost planning', text: 'See estimated event costs early so there are fewer surprises later.' },
]

export function LandingPage() {
  return (
    <div className="pb-8">
      <HeroSection />

      <section className="section-shell py-16">
        <div className="mb-8">
          <span className="eyebrow">Why EventZen</span>
          <h2 className="section-title max-w-3xl">Everything you need to plan a polished event, gathered into one graceful experience.</h2>
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
            <span className="eyebrow">Featured Venues</span>
            <h2 className="section-title">Beautiful spaces across three vibrant cities</h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-[color:var(--color-muted)]">
            Discover venues chosen to suit weddings, celebrations, and memorable guest experiences across our featured destinations.
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
          <span className="eyebrow">Inspiration</span>
          <h2 className="section-title">A romantic, invitation-inspired experience designed to make planning feel joyful.</h2>
        </div>
        <GalleryGrid images={galleryMoments} />
      </section>

      <section className="section-shell py-8">
        <div className="paper-panel floral-corner px-6 py-10 text-center sm:px-10">
          <span className="eyebrow">Start Your Story</span>
          <h2 className="section-title">Begin planning an event that feels seamless, special, and entirely your own.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[color:var(--color-muted)]">
            From venue discovery to guest registration, EventZen helps you move from inspiration to celebration with ease.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/create" className="primary-button">
              Start Planning
            </Link>
            <Link to="/admin" className="secondary-button">
              View Operations
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
