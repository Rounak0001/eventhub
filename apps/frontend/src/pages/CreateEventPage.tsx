import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { catalogService } from '../api/services/catalog'
import { eventService } from '../api/services/events'
import { venueService } from '../api/services/venues'
import { vendorService } from '../api/services/vendors'
import { StepperForm } from '../components/StepperForm'
import { TierSelector } from '../components/TierSelector'
import { VenueCard } from '../components/VenueCard'
import { useSession } from '../providers/SessionProvider'
import type { EventVisibility, TicketType, VendorTier } from '../types/domain'
import { formatCurrency } from '../utils/format'

export function CreateEventPage() {
  const navigate = useNavigate()
  const { user } = useSession()
  const [step, setStep] = useState(1)
  const [values, setValues] = useState({
    title: 'Basu Wedding Evening',
    cityId: 0,
    eventTypeId: 0,
    date: '2026-10-18',
    startTime: '18:00',
    endTime: '23:00',
    seatCapacity: 300,
    venueId: '',
    foodTier: 'PREMIUM' as VendorTier,
    decorationTier: 'STANDARD' as VendorTier,
    foodVendorId: '',
    decorationVendorId: '',
    description: 'An elegant evening celebration with beautiful decor, curated dining, and a seamless guest experience.',
    visibility: 'PUBLIC' as EventVisibility,
    ticketType: 'FREE' as TicketType,
    ticketPrice: 0,
    accessCode: '',
  })

  const citiesQuery = useQuery({ queryKey: ['catalog', 'cities'], queryFn: catalogService.listCities })
  const eventTypesQuery = useQuery({ queryKey: ['catalog', 'event-types'], queryFn: catalogService.listEventTypes })

  const venuesQuery = useQuery({
    queryKey: ['venues', values.cityId, values.eventTypeId],
    queryFn: () => venueService.list(values.cityId, values.eventTypeId),
    enabled: values.cityId > 0 && values.eventTypeId > 0,
  })

  const foodVendorsQuery = useQuery({
    queryKey: ['vendors', 'food', values.cityId, values.eventTypeId, values.foodTier],
    queryFn: () => vendorService.list('FOOD', values.cityId, values.eventTypeId, values.foodTier),
    enabled: values.cityId > 0 && values.eventTypeId > 0,
  })

  const decorVendorsQuery = useQuery({
    queryKey: ['vendors', 'decor', values.cityId, values.eventTypeId, values.decorationTier],
    queryFn: () => vendorService.list('DECORATION', values.cityId, values.eventTypeId, values.decorationTier),
    enabled: values.cityId > 0 && values.eventTypeId > 0,
  })

  useEffect(() => {
    if (!values.cityId && citiesQuery.data?.length) {
      setValues((current) => ({ ...current, cityId: citiesQuery.data![0].id }))
    }
  }, [citiesQuery.data, values.cityId])

  useEffect(() => {
    if (!values.eventTypeId && eventTypesQuery.data?.length) {
      setValues((current) => ({ ...current, eventTypeId: eventTypesQuery.data![0].id }))
    }
  }, [eventTypesQuery.data, values.eventTypeId])

  useEffect(() => {
    if (venuesQuery.data?.length && !values.venueId) {
      setValues((current) => ({ ...current, venueId: String(venuesQuery.data![0].id) }))
    }
  }, [venuesQuery.data, values.venueId])

  useEffect(() => {
    if (foodVendorsQuery.data?.length && !values.foodVendorId) {
      setValues((current) => ({ ...current, foodVendorId: String(foodVendorsQuery.data![0].id) }))
    }
  }, [foodVendorsQuery.data, values.foodVendorId])

  useEffect(() => {
    if (decorVendorsQuery.data?.length && !values.decorationVendorId) {
      setValues((current) => ({ ...current, decorationVendorId: String(decorVendorsQuery.data![0].id) }))
    }
  }, [decorVendorsQuery.data, values.decorationVendorId])

  const selectedCity = citiesQuery.data?.find((city) => city.id === values.cityId)
  const selectedEventType = eventTypesQuery.data?.find((type) => type.id === values.eventTypeId)
  const selectedVenue = venuesQuery.data?.find((venue) => String(venue.id) === values.venueId)
  const selectedFoodVendor = foodVendorsQuery.data?.find((vendor) => String(vendor.id) === values.foodVendorId)
  const selectedDecorVendor = decorVendorsQuery.data?.find((vendor) => String(vendor.id) === values.decorationVendorId)

  const estimatedTotal = useMemo(
    () =>
      (selectedVenue?.startingPrice ?? 0) +
      (selectedDecorVendor?.priceFrom ?? 0) +
      (selectedFoodVendor?.priceFrom ?? 0) * values.seatCapacity,
    [selectedDecorVendor?.priceFrom, selectedFoodVendor?.priceFrom, selectedVenue?.startingPrice, values.seatCapacity],
  )

  const createMutation = useMutation({
    mutationFn: () =>
      eventService.create({
        organizerId: user!.id,
        title: values.title,
        cityId: values.cityId,
        eventTypeId: values.eventTypeId,
        cityName: selectedCity?.name,
        eventTypeName: selectedEventType?.name,
        date: values.date,
        startTime: values.startTime,
        endTime: values.endTime,
        seatCapacity: values.seatCapacity,
        venueId: values.venueId,
        decorationTier: values.decorationTier,
        foodTier: values.foodTier,
        decorationVendorId: values.decorationVendorId,
        foodVendorId: values.foodVendorId,
        visibility: values.visibility,
        accessCode: values.visibility === 'PRIVATE' ? values.accessCode : undefined,
        ticketType: values.ticketType,
        ticketPrice: values.ticketType === 'PAID' ? values.ticketPrice : 0,
        description: values.description,
      }),
    onSuccess: (event) => navigate(`/events/${event.id}`),
  })

  const nextStep = () => {
    if (step === 5) {
      createMutation.mutate()
      return
    }

    setStep((current) => current + 1)
  }

  if (!user) {
    return (
      <section className="section-shell py-10">
        <div className="paper-panel px-6 py-8">
          <h1 className="section-title">Sign in before creating an event.</h1>
          <p className="mt-3 text-sm text-[color:var(--color-muted)]">
            Sign in to start planning your celebration, save your details, and publish your event with confidence.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="section-shell py-10">
      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <div className="paper-panel floral-corner px-6 py-8">
          <span className="eyebrow">Plan Your Event</span>
          <h1 className="section-title">Bring your celebration to life, one beautiful detail at a time.</h1>
          <p className="mt-4 text-sm leading-7 text-[color:var(--color-muted)]">
            Choose your city, style, venue, guest count, and event details to build a celebration that feels thoughtful and unforgettable.
          </p>

          <div className="mt-8 space-y-4">
            {[
              ['City', selectedCity?.name ?? 'Choosing your city...'],
              ['Event style', selectedEventType?.name ?? 'Choosing your style...'],
              ['Guest count', String(values.seatCapacity)],
              ['Visibility', values.visibility],
              ['Entry type', values.ticketType],
              ['Estimated budget', formatCurrency(estimatedTotal)],
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
          title={['Event Basics', 'Date & Access', 'Choose a Venue', 'Vendors & Tickets', 'Review & Publish'][step - 1]}
          subtitle="Shape the celebration, refine the details, and publish when everything feels just right."
          canGoBack={step > 1}
          onBack={() => setStep((current) => current - 1)}
          onNext={nextStep}
          isLastStep={step === 5}
          loading={createMutation.isPending}
        >
          {step === 1 ? (
            <div className="grid gap-4 md:grid-cols-2">
              <input className="field border-white/10 bg-white/8 text-white" value={values.title} onChange={(event) => setValues((current) => ({ ...current, title: event.target.value }))} />
              <select className="field border-white/10 bg-white/8 text-white" value={values.eventTypeId || ''} onChange={(event) => setValues((current) => ({ ...current, eventTypeId: Number(event.target.value), venueId: '', foodVendorId: '', decorationVendorId: '' }))}>
                {(eventTypesQuery.data ?? []).map((type) => (
                  <option key={type.id} value={type.id} className="text-black">{type.name}</option>
                ))}
              </select>
              <select className="field border-white/10 bg-white/8 text-white" value={values.cityId || ''} onChange={(event) => setValues((current) => ({ ...current, cityId: Number(event.target.value), venueId: '', foodVendorId: '', decorationVendorId: '' }))}>
                {(citiesQuery.data ?? []).map((city) => (
                  <option key={city.id} value={city.id} className="text-black">{city.name}</option>
                ))}
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
              <select className="field border-white/10 bg-white/8 text-white" value={values.ticketType} onChange={(event) => setValues((current) => ({ ...current, ticketType: event.target.value as TicketType, ticketPrice: event.target.value === 'PAID' ? current.ticketPrice : 0 }))}>
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
              {(venuesQuery.data ?? []).map((venue) => (
                <VenueCard key={venue.id} venue={venue} selected={values.venueId === String(venue.id)} onSelect={() => setValues((current) => ({ ...current, venueId: String(venue.id) }))} />
              ))}
            </div>
          ) : null}

          {step === 4 ? (
            <div className="space-y-8">
              <div>
                <p className="mb-4 text-sm uppercase tracking-[0.28em] text-[#d5ba8a]">Food Tier</p>
                <TierSelector value={values.foodTier} onChange={(tier) => setValues((current) => ({ ...current, foodTier: tier, foodVendorId: '' }))} />
                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  {(foodVendorsQuery.data ?? []).map((vendor) => (
                    <button key={vendor.id} type="button" onClick={() => setValues((current) => ({ ...current, foodVendorId: String(vendor.id) }))} className={`rounded-[1.4rem] border p-4 text-left ${values.foodVendorId === String(vendor.id) ? 'border-[#d5ba8a] bg-white/15' : 'border-white/10 bg-white/5'}`}>
                      <p className="font-medium text-white">{vendor.name}</p>
                      <p className="mt-3 text-sm text-[#d5ba8a]">From {formatCurrency(vendor.priceFrom)}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-4 text-sm uppercase tracking-[0.28em] text-[#d5ba8a]">Decoration Tier</p>
                <TierSelector value={values.decorationTier} onChange={(tier) => setValues((current) => ({ ...current, decorationTier: tier, decorationVendorId: '' }))} />
                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  {(decorVendorsQuery.data ?? []).map((vendor) => (
                    <button key={vendor.id} type="button" onClick={() => setValues((current) => ({ ...current, decorationVendorId: String(vendor.id) }))} className={`rounded-[1.4rem] border p-4 text-left ${values.decorationVendorId === String(vendor.id) ? 'border-[#d5ba8a] bg-white/15' : 'border-white/10 bg-white/5'}`}>
                      <p className="font-medium text-white">{vendor.name}</p>
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
                ['Event style', selectedEventType?.name ?? 'Choose this earlier'],
                ['City', selectedCity?.name ?? 'Choose this earlier'],
                ['Date', values.date],
                ['Time', `${values.startTime} - ${values.endTime}`],
                ['Guest count', String(values.seatCapacity)],
                ['Venue', selectedVenue?.name ?? 'Choose this earlier'],
                ['Food partner', selectedFoodVendor?.name ?? 'Choose this earlier'],
                ['Decor partner', selectedDecorVendor?.name ?? 'Choose this earlier'],
                ['Visibility', values.visibility],
                ['Ticketing', values.ticketType === 'PAID' ? `Paid - ${formatCurrency(values.ticketPrice)}` : 'Free'],
                ['Estimated budget', formatCurrency(estimatedTotal)],
              ].map(([label, value]) => (
                <div key={label} className="rounded-[1.5rem] border border-white/10 bg-white/8 p-5">
                  <p className="text-xs uppercase tracking-[0.28em] text-[#d5ba8a]">{label}</p>
                  <p className="mt-3 text-lg text-white">{value}</p>
                </div>
              ))}
              {createMutation.error ? (
                <p className="md:col-span-2 text-sm text-rose-300">
                  {createMutation.error instanceof Error ? createMutation.error.message : 'We could not publish your event just yet.'}
                </p>
              ) : null}
            </div>
          ) : null}
        </StepperForm>
      </div>
    </section>
  )
}
