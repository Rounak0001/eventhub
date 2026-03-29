import { motion } from 'framer-motion'
import { ArrowRight, CalendarDays, MapPin, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

export function HeroSection() {
  return (
    <section className="section-shell pt-6 sm:pt-10">
      <div className="grid items-stretch gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          className="paper-panel floral-corner flex flex-col justify-between px-6 py-8 sm:px-8 sm:py-10"
        >
          <div>
            <span className="eyebrow">Event Management Platform</span>
            <h1 className="display-title max-w-2xl">
              Build, price, publish, and manage events through one responsive control surface.
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-[color:var(--color-muted)] sm:text-base">
              EventHub combines venue selection, decoration and food tiers, seat capacity logic, private/public access,
              demo payments, and admin recovery workflows into one frontend ready for backend integration.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/create" className="primary-button">
              Create Event <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link to="/events" className="secondary-button">
              Browse Public Events
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.5rem] border border-white/70 bg-white/70 p-4">
              <Sparkles className="h-5 w-5 text-[color:var(--color-gold-deep)]" />
              <p className="mt-4 font-display text-2xl">3</p>
              <p className="text-sm text-[color:var(--color-muted)]">event types for MVP launch</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/70 bg-white/70 p-4">
              <MapPin className="h-5 w-5 text-[color:var(--color-gold-deep)]" />
              <p className="mt-4 font-display text-2xl">3</p>
              <p className="text-sm text-[color:var(--color-muted)]">target cities pre-seeded</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/70 bg-white/70 p-4">
              <CalendarDays className="h-5 w-5 text-[color:var(--color-gold-deep)]" />
              <p className="mt-4 font-display text-2xl">24h</p>
              <p className="text-sm text-[color:var(--color-muted)]">registration cutoff before event</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} className="grid gap-4 sm:grid-cols-2 sm:grid-rows-2">
          {[
            { src: '/img2.jpg', className: 'sm:col-span-2', height: 'min-h-[260px]' },
            { src: '/img1.webp', className: '', height: 'min-h-[220px]' },
            { src: '/img3.webp', className: '', height: 'min-h-[220px]' },
          ].map((image) => (
            <div key={image.src + image.className} className={`paper-panel group overflow-hidden ${image.className} ${image.height}`}>
              <img src={image.src} alt="Celebration setup" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(43,29,24,0.35)] via-transparent to-transparent" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
