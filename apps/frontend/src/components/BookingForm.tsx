import { LoaderCircle } from 'lucide-react'
import { useState } from 'react'

interface BookingFormValues {
  guestName: string
  guestEmail: string
  seats: number
  specialRequest: string
}

interface BookingFormProps {
  onSubmit: (values: BookingFormValues) => Promise<void> | void
  loading?: boolean
  submitLabel?: string
}

export function BookingForm({ onSubmit, loading, submitLabel = 'Confirm Reservation' }: BookingFormProps) {
  const [values, setValues] = useState<BookingFormValues>({
    guestName: '',
    guestEmail: '',
    seats: 2,
    specialRequest: '',
  })

  return (
    <form
      className="paper-panel floral-corner space-y-5 px-6 py-8 sm:px-8"
      onSubmit={async (event) => {
        event.preventDefault()
        await onSubmit(values)
      }}
    >
      <div className="text-center">
        <p className="font-display text-4xl">Booking Form</p>
        <p className="mt-2 text-sm uppercase tracking-[0.25em] text-[color:var(--color-gold-deep)]">Guest Registration</p>
      </div>

      <div className="gold-divider" />

      <div className="grid gap-4 md:grid-cols-2">
        <input className="field" placeholder="Guest name" value={values.guestName} onChange={(event) => setValues((current) => ({ ...current, guestName: event.target.value }))} />
        <input type="email" className="field" placeholder="Email address" value={values.guestEmail} onChange={(event) => setValues((current) => ({ ...current, guestEmail: event.target.value }))} />
        <input type="number" min={1} max={12} className="field" placeholder="Seats" value={values.seats} onChange={(event) => setValues((current) => ({ ...current, seats: Number(event.target.value) }))} />
        <input className="field" placeholder="Dietary notes" />
      </div>

      <textarea className="field min-h-28" placeholder="Special requests or accessibility notes" value={values.specialRequest} onChange={(event) => setValues((current) => ({ ...current, specialRequest: event.target.value }))} />

      <button type="submit" className="primary-button w-full" disabled={loading}>
        {loading ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : null}
        {submitLabel}
      </button>
    </form>
  )
}
