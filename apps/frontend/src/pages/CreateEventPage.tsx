import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { eventService } from '../api/services/events'
import { venueService } from '../api/services/venues'
import { vendorService } from '../api/services/vendors'
import { StepperForm } from '../components/StepperForm'
import { TierSelector } from '../components/TierSelector'
import { VenueCard } from '../components/VenueCard'
import { curatedVendors, curatedVenues } from '../data/content'
import type { EventType, EventVisibility, TicketType, VendorTier } from '../types/domain'
import { formatCurrency } from '../utils/format'

const eventTypes: EventType[] = ['WEDDING', 'PARTY', 'CONCERT']

export function CreateEventPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [values, setValues] = useState({
    title: 'Basu Wedding Evening',
    eventType: 'WEDDING' as EventType,
    city: 'Kolkata',
    date: '2026-10-18',
    startTime: '18:00',
    endTime: '23:00',
    seatCapacity: 300,
    venueId: '',
    foodTier: 'PREMIUM' as VendorTier,
    decorationTier: 'STANDARD' as VendorTier,
    foodVendorId: '',
    decorationVendorId: '',
    description: 'Luxury wedding setup with tiered vendors, availability checks, and controlled registrations.',
    visibility: 'PUBLIC' as EventVisibility,
    ticketType: 'FREE' as TicketType,
    ticketPrice: 0,
    accessCode: '',
  })

  const venuesQuery = useQuery({
    queryKey: ['venues', values.city, values.eventType, values.date, values.startTime, values.endTime],
    queryFn: () => venueService.list(values.city, values.eventType, values.date, values.startTime, values.endTime),
  })

  const foodVendorsQuery = useQuery({
    queryKey: ['vendors', 'food', values.foodTier, values.city, values.eventType],
    queryFn: () => vendorService.list('FOOD', values.foodTier, values.city, values.eventType),
  })

  const decorVendorsQuery = useQuery({
    queryKey: ['vendors', 'decor', values.decorationTier, values.city, values.eventType],
    queryFn: () => vendorService.list('DECORATION', values.decorationTier, values.city, values.eventType),
  })

  const createMutation = useMutation({
    mutationFn: () => eventService.create(values),
    onSuccess: (event) => navigate(`/events/${event.id}`),
  })

  const venues = useMemo(
    () => (venuesQuery.data?.length ? venuesQuery.data : curatedVenues.filter((venue) => venue.city === values.city && venue.eventType === values.eventType)),
    [venuesQuery.data, values.city, values.eventType],
  )

  const foodVendors = useMemo(
    () => (foodVendorsQuery.data?.length ? foodVendorsQuery.data : curatedVendors.filter((vendor) => vendor.type === 'FOOD' && vendor.tier === values.foodTier)),
    [foodVendorsQuery.data, values.foodTier],
  )

  const decorVendors = useMemo(
    () => (decorVendorsQuery.data?.length ? decorVendorsQuery.data : curatedVendors.filter((vendor) => vendor.type === 'DECORATION' && vendor.tier === values.decorationTier)),
    [decorVendorsQuery.data, values.decorationTier],
  )

  const selectedVenue = venues.find((venue) => venue.id === values.venueId)
  const selectedFoodVendor = foodVendors.find((vendor) => vendor.id === values.foodVendorId)
  const selectedDecorVendor = decorVendors.find((vendor) => vendor.id === values.decorationVendorId)
  const estimatedTotal = (selectedVenue?.startingPrice ?? 0) + (selectedDecorVendor?.priceFrom ?? 0) + ((selectedFoodVendor?.priceFrom ?? 0) * values.seatCapacity)

  const nextStep = () => {
    if (step === 5) {
      createMutation.mutate()
      return
    }

    setStep((current) => current + 1)
  }

  return (
    <section className="section-shell py-10">
      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <div className="paper-panel floral-corner px-6 py-8">
          <span className="eyebrow">Create Event</span>
          <h1 className="section-title">This flow now matches the actual event-platform requirements.</h1>
          <p className="mt-4 text-sm leading-7 text-[color:var(--color-muted)]">
            City, event type, date window, venue, tiered vendors, visibility, paid/free tickets, and seat capacity are all captured in one wizard.
          </p>

          <div className="mt-8 space-y-4">
            {[
              ['City', values.city],
              ['Event type', values.eventType],
              ['Seats', String(values.seatCapacity)],
              ['Visibility', values.visibility],
              ['Ticket type', values.ticketType],
              ['Estimated total', formatCurrency(estimatedTotal)],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[1.5rem] bg-white/70 p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--color-gold-deep)]">{label}</p>
                <p className="mt-2 font-display text-2xl">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <StepperForm
          currentStep={step}
          totalSteps={5}
          title={['Basics', 'Availability Window', 'Venue', 'Vendors & Ticketing', 'Review & Publish'][step - 1]}
          subtitle="Optimized for a clean backend contract rather than purely static screens."
          canGoBack={step > 1}
          onBack={() => setStep((current) => current - 1)}
          onNext={nextStep}
          isLastStep={step === 5}
          loading={createMutation.isPending}
        >
          {step === 1 ? (
            <div className="grid gap-4 md:grid-cols-2">
              <input className="field border-white/10 bg-white/8 text-white" value={values.title} onChange={(event) => setValues((current) => ({ ...current, title: event.target.value }))} />
              <select className="field border-white/10 bg-white/8 text-white" value={values.eventType} onChange={(event) => setValues((current) => ({ ...current, eventType: event.target.value as EventType }))}>
                {eventTypes.map((type) => (
                  <option key={type} value={type} className="text-black">{type}</option>
                ))}
              </select>
              <select className="field border-white/10 bg-white/8 text-white" value={values.city} onChange={(event) => setValues((current) => ({ ...current, city: event.target.value }))}>
                {['Kolkata', 'Mumbai', 'Bangalore'].map((city) => <option key={city} value={city} className="text-black">{city}</option>)}
              </select>
              <input type="number" className="field border-white/10 bg-white/8 text-white" value={values.seatCapacity} onChange={(event) => setValues((current) => ({ ...current, seatCapacity: Number(event.target.value) }))} />
              <textarea className="field min-h-32 border-white/10 bg-white/8 text-white md:col-span-2" value={values.description} onChange={(event) => setValues((current) => ({ ...current, description: event.target.value }))} />
            </div>
          ) : null}

          {step === 2 ? (
            <div className="grid gap-4 md:grid-cols-2">
              <input type="date" className="field border-white/10 bg-white/8 text-white" value={values.date} onChange={(event) => setValues((current) => ({ ...current, date: event.target.value }))} />
              <input type="time" className="field border-white/10 bg-white/8 text-white" value={values.startTime} onChange={(event) => setValues((current) => ({ ...current, startTime: event.target.value }))} />
              <input type="time" className="field border-white/10 bg-white/8 text-white" value={values.endTime} onChange={(event) => setValues((current) => ({ ...current, endTime: event.target.value }))} />
              <select className="field border-white/10 bg-white/8 text-white" value={values.visibility} onChange={(event) => setValues((current) => ({ ...current, visibility: event.target.value as EventVisibility }))}>
                {['PUBLIC', 'PRIVATE'].map((item) => <option key={item} value={item} className="text-black">{item}</option>)}
              </select>
              <select className="field border-white/10 bg-white/8 text-white" value={values.ticketType} onChange={(event) => setValues((current) => ({ ...current, ticketType: event.target.value as TicketType }))}>
                {['FREE', 'PAID'].map((item) => <option key={item} value={item} className="text-black">{item}</option>)}
              </select>
              {values.ticketType === 'PAID' ? (
                <input type="number" className="field border-white/10 bg-white/8 text-white" value={values.ticketPrice} onChange={(event) => setValues((current) => ({ ...current, ticketPrice: Number(event.target.value) }))} />
              ) : null}
              {values.visibility === 'PRIVATE' ? (
                <input className="field border-white/10 bg-white/8 text-white md:col-span-2" placeholder="Private event access code" value={values.accessCode} onChange={(event) => setValues((current) => ({ ...current, accessCode: event.target.value }))} />
              ) : null}
            </div>
          ) : null}

          {step === 3 ? (
            <div className="grid gap-4 lg:grid-cols-2">
              {venues.map((venue) => (
                <VenueCard key={venue.id} venue={venue} selected={values.venueId === venue.id} onSelect={() => setValues((current) => ({ ...current, venueId: venue.id }))} />
              ))}
            </div>
          ) : null}

          {step === 4 ? (
            <div className="space-y-8">
              <div>
                <p className="mb-4 text-sm uppercase tracking-[0.28em] text-[#d5ba8a]">Food Tier</p>
                <TierSelector value={values.foodTier} onChange={(tier) => setValues((current) => ({ ...current, foodTier: tier }))} />
                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  {foodVendors.map((vendor) => (
                    <button key={vendor.id} type="button" onClick={() => setValues((current) => ({ ...current, foodVendorId: vendor.id }))} className={`rounded-[1.4rem] border p-4 text-left ${values.foodVendorId === vendor.id ? 'border-[#d5ba8a] bg-white/15' : 'border-white/10 bg-white/5'}`}>
                      <p className="font-medium text-white">{vendor.name}</p>
                      <p className="mt-2 text-sm text-white/70">{vendor.description}</p>
                      <p className="mt-3 text-sm text-[#d5ba8a]">From {formatCurrency(vendor.priceFrom)}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-4 text-sm uppercase tracking-[0.28em] text-[#d5ba8a]">Decoration Tier</p>
                <TierSelector value={values.decorationTier} onChange={(tier) => setValues((current) => ({ ...current, decorationTier: tier }))} />
                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  {decorVendors.map((vendor) => (
                    <button key={vendor.id} type="button" onClick={() => setValues((current) => ({ ...current, decorationVendorId: vendor.id }))} className={`rounded-[1.4rem] border p-4 text-left ${values.decorationVendorId === vendor.id ? 'border-[#d5ba8a] bg-white/15' : 'border-white/10 bg-white/5'}`}>
                      <p className="font-medium text-white">{vendor.name}</p>
                      <p className="mt-2 text-sm text-white/70">{vendor.description}</p>
                      <p className="mt-3 text-sm text-[#d5ba8a]">From {formatCurrency(vendor.priceFrom)}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {step === 5 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {[
                ['Title', values.title],
                ['Event type', values.eventType],
                ['City', values.city],
                ['Date', values.date],
                ['Timing', `${values.startTime} - ${values.endTime}`],
                ['Seat capacity', String(values.seatCapacity)],
                ['Venue', selectedVenue?.name ?? 'Select in previous step'],
                ['Food vendor', selectedFoodVendor?.name ?? 'Select in previous step'],
                ['Decoration vendor', selectedDecorVendor?.name ?? 'Select in previous step'],
                ['Visibility', values.visibility],
                ['Ticketing', values.ticketType === 'PAID' ? `PAID • ${formatCurrency(values.ticketPrice)}` : 'FREE'],
                ['Estimated total', formatCurrency(estimatedTotal)],
              ].map(([label, value]) => (
                <div key={label} className="rounded-[1.5rem] border border-white/10 bg-white/8 p-5">
                  <p className="text-xs uppercase tracking-[0.28em] text-[#d5ba8a]">{label}</p>
                  <p className="mt-3 text-lg text-white">{value}</p>
                </div>
              ))}
            </div>
          ) : null}
        </StepperForm>
      </div>
    </section>
  )
}
