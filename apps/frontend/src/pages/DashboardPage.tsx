import { useQuery } from '@tanstack/react-query'
import { CalendarRange, CreditCard, Ticket } from 'lucide-react'
import { bookingService } from '../api/services/bookings'
import { eventService } from '../api/services/events'
import { showcaseEvents } from '../data/content'
import { useSession } from '../providers/SessionProvider'
import { formatCurrency, formatDate } from '../utils/format'

export function DashboardPage() {
  const { user } = useSession()

  const eventsQuery = useQuery({
    queryKey: ['events', 'organizer', user?.id],
    queryFn: () => eventService.listByOrganizer(user!.id),
    enabled: Boolean(user?.id),
  })

  const bookingsQuery = useQuery({
    queryKey: ['registrations', 'user', user?.id],
    queryFn: () => bookingService.listByUser(user!.id),
    enabled: Boolean(user?.id),
  })

  const events = eventsQuery.data?.length ? eventsQuery.data : showcaseEvents
  const bookings = bookingsQuery.data ?? []
  const revenue = bookings.reduce((sum, booking) => sum + (booking.amount ?? 0), 0)

  return (
    <section className="section-shell py-10">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="eyebrow">Dashboard</span>
          <h1 className="section-title">Keep an eye on your upcoming events, guest activity, and booking momentum.</h1>
        </div>
        <p className="max-w-2xl text-sm leading-7 text-[color:var(--color-muted)]">
          Your dashboard brings together key details so you can stay organized and respond quickly as plans come together.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { icon: CalendarRange, label: 'Events managed', value: String(events.length) },
          { icon: Ticket, label: 'Registrations', value: String(bookings.length) },
          { icon: CreditCard, label: 'Registration value', value: formatCurrency(revenue) },
        ].map((stat) => (
          <div key={stat.label} className="paper-panel px-6 py-6">
            <stat.icon className="h-6 w-6 text-[color:var(--color-gold-deep)]" />
            <p className="mt-6 font-display text-4xl">{stat.value}</p>
            <p className="mt-2 text-sm text-[color:var(--color-muted)]">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="paper-panel px-6 py-7">
          <h2 className="font-display text-3xl">Upcoming events</h2>
          <div className="mt-6 space-y-5">
            {events.map((event) => (
              <div key={event.id} className="rounded-[1.75rem] border border-white/65 bg-white/70 p-4 sm:p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--color-gold-deep)]">{event.eventType}</p>
                    <h3 className="mt-2 font-display text-2xl">{event.title}</h3>
                    <p className="mt-2 text-sm text-[color:var(--color-muted)]">
                      {formatDate(event.date)} - {event.venueName ?? event.city} - {event.visibility ?? 'PUBLIC'}
                    </p>
                  </div>
                  <div className="rounded-full bg-[color:rgba(185,146,71,0.12)] px-4 py-2 text-sm text-[color:var(--color-gold-deep)]">
                    {event.status ?? 'CONFIRMED'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="paper-panel px-6 py-7">
          <h2 className="font-display text-3xl">Registrations</h2>
          <div className="mt-6 space-y-4">
            {bookings.length ? (
              bookings.map((booking) => (
                <div key={booking.id} className="rounded-[1.5rem] bg-white/70 p-5">
                  <p className="font-display text-xl">{booking.attendeeName}</p>
                  <p className="mt-2 text-sm text-[color:var(--color-muted)]">{booking.attendeeEmail}</p>
                  <p className="mt-4 text-sm text-[color:var(--color-muted)]">
                    {booking.quantity} seats - {booking.status ?? 'PENDING'} - {booking.paymentStatus ?? 'PENDING'}
                  </p>
                </div>
              ))
            ) : (
              <div className="rounded-[1.5rem] bg-white/70 p-5 text-sm leading-7 text-[color:var(--color-muted)]">
                No guest registrations yet. Once attendees begin signing up, you will see them here automatically.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
