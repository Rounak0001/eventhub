import { apiClient } from '../client'
import type { EventDetails, EventSummary, EventVisibility, TicketType, VendorTier } from '../../types/domain'

export interface CreateEventPayload {
  organizerId: number
  title: string
  eventTypeId: number
  cityId: number
  eventTypeName?: string
  cityName?: string
  date: string
  startTime: string
  endTime: string
  seatCapacity: number
  venueId: string
  decorationTier?: VendorTier
  foodTier?: VendorTier
  decorationVendorId?: string
  foodVendorId?: string
  visibility: EventVisibility
  accessCode?: string
  ticketType: TicketType
  ticketPrice?: number
  description: string
}

interface EventResponse {
  id: number
  organizerId: number
  cityId: number
  eventTypeId: number
  venueId: number
  decorationVendorId: number
  foodVendorId: number
  title: string
  description?: string
  eventDate: string
  startTime?: string
  endTime?: string
  seatCapacity?: number
  expectedGuests?: number
  bookedSeats?: number
  visibility?: EventVisibility
  accessCode?: string
  ticketType?: TicketType
  ticketPrice?: number
  venueCost?: number
  decorationCost?: number
  foodCost?: number
  platformFee?: number
  totalCost?: number
  status?: EventSummary['status']
  registrationDeadline?: string
}

function mapEvent(data: EventResponse, labels?: { cityName?: string; eventTypeName?: string }): EventDetails {
  return {
    id: data.id,
    organizerId: data.organizerId,
    cityId: data.cityId,
    eventTypeId: data.eventTypeId,
    venueId: data.venueId,
    decorationVendorId: data.decorationVendorId,
    foodVendorId: data.foodVendorId,
    title: data.title,
    description: data.description,
    date: data.eventDate,
    startTime: data.startTime,
    endTime: data.endTime,
    seatCapacity: data.seatCapacity,
    guestCount: data.expectedGuests,
    bookedSeats: data.bookedSeats,
    visibility: data.visibility,
    accessCode: data.accessCode,
    ticketType: data.ticketType,
    ticketPrice: data.ticketPrice,
    venueCost: data.venueCost,
    decorationCost: data.decorationCost,
    foodCost: data.foodCost,
    platformFee: data.platformFee,
    totalCost: data.totalCost,
    budget: data.totalCost,
    status: data.status,
    registrationDeadline: data.registrationDeadline,
    city: labels?.cityName ?? `City #${data.cityId}`,
    eventType: labels?.eventTypeName ?? `Type #${data.eventTypeId}`,
  }
}

export const eventService = {
  listByOrganizer: async (organizerId: number) => {
    const { data } = await apiClient.get<EventResponse[]>(`/events/organizer/${organizerId}`)
    return data.map((item) => mapEvent(item))
  },
  details: async (id: string | number) => {
    const { data } = await apiClient.get<EventResponse>(`/events/${id}`)
    return mapEvent(data)
  },
  create: async (payload: CreateEventPayload) => {
    const { data } = await apiClient.post<EventResponse>('/events', {
      organizerId: payload.organizerId,
      cityId: payload.cityId,
      eventTypeId: payload.eventTypeId,
      venueId: Number(payload.venueId),
      decorationVendorId: Number(payload.decorationVendorId),
      foodVendorId: Number(payload.foodVendorId),
      title: payload.title,
      description: payload.description,
      eventDate: payload.date,
      startTime: payload.startTime,
      endTime: payload.endTime,
      seatCapacity: payload.seatCapacity,
      visibility: payload.visibility,
      accessCode: payload.accessCode || undefined,
      ticketType: payload.ticketType,
      ticketPrice: payload.ticketType === 'PAID' ? payload.ticketPrice : undefined,
    })

    return mapEvent(data, {
      cityName: payload.cityName,
      eventTypeName: payload.eventTypeName,
    })
  },
}
