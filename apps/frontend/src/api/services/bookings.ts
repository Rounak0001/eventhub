import { apiClient } from '../client'
import type { Registration } from '../../types/domain'

export interface CreateBookingPayload {
  eventId: string
  guestName: string
  guestEmail: string
  seats: number
  specialRequest?: string
  accessCode?: string
}

export const bookingService = {
  create: async (payload: CreateBookingPayload) => {
    const { data } = await apiClient.post<Registration>(`/events/${payload.eventId}/register`, payload)
    return data
  },
  listMine: async () => {
    const { data } = await apiClient.get<Registration[]>('/users/me/registrations')
    return data
  },
}
