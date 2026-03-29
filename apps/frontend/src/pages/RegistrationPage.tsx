import { useMutation } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { bookingService } from '../api/services/bookings'
import { BookingForm } from '../components/BookingForm'

export function RegistrationPage() {
  const navigate = useNavigate()
  const { eventId = '' } = useParams()

  const mutation = useMutation({
    mutationFn: (values: { guestName: string; guestEmail: string; seats: number; specialRequest: string }) =>
      bookingService.create({ eventId, ...values }),
    onSuccess: () => navigate('/payment'),
  })

  return (
    <section className="section-shell py-10">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="paper-panel floral-corner px-6 py-8">
          <span className="eyebrow">Participant Registration</span>
          <h1 className="section-title">Registration now aligns to event capacity and ticketing logic.</h1>
          <p className="mt-4 text-sm leading-7 text-[color:var(--color-muted)]">
            On integration, this screen will call the registration-service and respect sold-out, private access, and 24-hour closure rules.
          </p>
        </div>
        <BookingForm onSubmit={(values) => mutation.mutateAsync(values)} loading={mutation.isPending} />
      </div>
    </section>
  )
}
