import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { bookingService } from '../api/services/bookings'
import { eventService } from '../api/services/events'
import { BookingForm } from '../components/BookingForm'
import { useSession } from '../providers/SessionProvider'

function isNumericId(value: string) {
  return /^\d+$/.test(value)
}

export function RegistrationPage() {
  const navigate = useNavigate()
  const { user } = useSession()
  const { eventId = '' } = useParams()

  const eventQuery = useQuery({
    queryKey: ['event', eventId, 'registration'],
    queryFn: () => eventService.details(eventId),
    enabled: isNumericId(eventId),
  })

  const mutation = useMutation({
    mutationFn: (values: { guestName: string; guestEmail: string; seats: number }) =>
      bookingService.create({
        eventId: Number(eventId),
        userId: user!.id,
        attendeeName: values.guestName,
        attendeeEmail: values.guestEmail,
        quantity: values.seats,
      }),
    onSuccess: (registration) => {
      const amount = (eventQuery.data?.ticketPrice ?? 0) * registration.quantity
      navigate(`/payment?registrationId=${registration.id}&amount=${amount}`)
    },
  })

  if (!user || !isNumericId(eventId)) {
    return (
      <section className="section-shell py-10">
        <div className="paper-panel px-6 py-8">
          <h1 className="section-title">Sign in and choose an event to complete your registration.</h1>
          <p className="mt-3 text-sm text-[color:var(--color-muted)]">
            Once you are signed in, you can confirm your details, reserve your seats, and continue to payment if needed.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="section-shell py-10">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="paper-panel floral-corner px-6 py-8">
          <span className="eyebrow">Guest Registration</span>
          <h1 className="section-title">Reserve your place and get ready for a wonderful event.</h1>
          <p className="mt-4 text-sm leading-7 text-[color:var(--color-muted)]">
            Share your details, choose the number of seats you need, and we will guide you through the next step.
          </p>
        </div>
        <BookingForm
          onSubmit={async (values) => {
            await mutation.mutateAsync(values)
          }}
          loading={mutation.isPending}
        />
      </div>
    </section>
  )
}
