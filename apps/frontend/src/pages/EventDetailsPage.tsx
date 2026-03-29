import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { eventService } from '../api/services/events'
import { InvitationCard } from '../components/InvitationCard'
import { showcaseEvents } from '../data/content'
import { formatCurrency, formatDate } from '../utils/format'

export function EventDetailsPage() {
  const { eventId = '' } = useParams()
  const detailsQuery = useQuery({
    queryKey: ['event', eventId],
    queryFn: () => eventService.details(eventId),
    enabled: Boolean(eventId),
  })

  const event = detailsQuery.data ?? showcaseEvents.find((item) => item.id === eventId) ?? showcaseEvents[0]
  const seatsLeft = (event.seatCapacity ?? event.guestCount ?? 0) - (event.bookedSeats ?? 0)

  return (
    <section className="section-shell py-10">
      <InvitationCard event={event} />

      <div className="mt-8 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="paper-panel floral-corner px-6 py-8">
          <span className="eyebrow">Event Snapshot</span>
          <h1 className="section-title">This page now supports the registration and operations narrative.</h1>
          <div className="mt-8 space-y-4">
            {[
              ['Date', formatDate(event.date)],
              ['Timing', `${event.startTime ?? '--'} - ${event.endTime ?? '--'}`],
              ['Seats left', String(seatsLeft)],
              ['Visibility', event.visibility ?? 'PUBLIC'],
              ['Ticketing', event.ticketType === 'PAID' ? formatCurrency(event.ticketPrice) : 'Free entry'],
              ['Registration deadline', event.registrationDeadline ?? '24 hours before event start'],
              ['Venue', event.venueName ?? event.city],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[1.5rem] bg-white/70 p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--color-gold-deep)]">{label}</p>
                <p className="mt-3 text-lg">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="paper-panel px-6 py-8">
          <h2 className="font-display text-3xl">Guest registration path</h2>
          <p className="mt-4 text-sm leading-7 text-[color:var(--color-muted)]">
            Participants move into a registration flow that will enforce private/public access, capacity constraints, and the 24-hour cutoff rule.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Link to={`/events/${event.id}/register`} className="primary-button text-center">
              Register Attendance
            </Link>
            <Link to="/payment" className="secondary-button text-center">
              Open Demo Payment
            </Link>
          </div>
          <img src={event.heroImage ?? '/img1.webp'} alt={event.title} className="mt-8 h-80 w-full rounded-[1.8rem] object-cover" />
        </div>
      </div>
    </section>
  )
}
