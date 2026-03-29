import { apiClient } from '../client'
import type { EventDetails, EventSummary, EventType, EventVisibility, TicketType, VendorTier } from '../../types/domain'

export interface CreateEventPayload {
  title: string
  eventType: EventType
  city: string
  date: string
  startTime: string
  endTime: string
  seatCapacity: number
  venueId: string
  decorationTier: VendorTier
  foodTier: VendorTier
  decorationVendorId?: string
  foodVendorId?: string
  visibility: EventVisibility
  accessCode?: string
  ticketType: TicketType
  ticketPrice?: number
  description: string
}

export const eventService = {
  list: async () => {
    const { data } = await apiClient.get<EventSummary[]>('/events')
    return data
  },
  details: async (id: string) => {
    const { data } = await apiClient.get<EventDetails>(`/events/${id}`)
    return data
  },
  create: async (payload: CreateEventPayload) => {
    const { data } = await apiClient.post<EventDetails>('/events', payload)
    return data
  },
}
