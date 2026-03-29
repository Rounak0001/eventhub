import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { eventService } from '../api/services/events'
import { showcaseEvents } from '../data/content'
import { formatCurrency, formatDate } from '../utils/format'

export function EventsPage() {
  const eventsQuery = useQuery({
    queryKey: ['events', 'discover'],
    queryFn: eventService.list,
  })

  const events = eventsQuery.data?.length ? eventsQuery.data : showcaseEvents

  return (
    <section className="section-shell py-10">
      <div className="mb-8">
        <span className="eyebrow">Invitation Gallery</span>
        <h1 className="section-title max-w-3xl">An editorial grid for discovering live events and guest registration journeys.</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {events.map((event) => (
          <article key={event.id} className="paper-panel overflow-hidden">
            <div className="grid gap-0 md:grid-cols-[0.92fr_1.08fr]">
              <div className="overflow-hidden">
                <img src={event.heroImage ?? '/img2.jpg'} alt={event.title} className="h-full min-h-[320px] w-full object-cover" />
              </div>
              <div className="flex flex-col justify-between px-6 py-7">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--color-gold-deep)]">{event.eventType}</p>
                  <h2 className="mt-3 font-display text-4xl">{event.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-[color:var(--color-muted)]">{event.description}</p>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--color-gold-deep)]">Date</p>
                    <p className="mt-2 text-lg">{formatDate(event.date)}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--color-gold-deep)]">Budget</p>
                    <p className="mt-2 text-lg">{formatCurrency(event.budget)}</p>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to={`/events/${event.id}`} className="primary-button">
                    View Details
                  </Link>
                  <Link to={`/events/${event.id}/register`} className="secondary-button">
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
