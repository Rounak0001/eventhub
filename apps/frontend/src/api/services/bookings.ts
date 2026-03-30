import { apiClient } from '../client'
import type { Registration } from '../../types/domain'

export interface CreateBookingPayload {
  eventId: number
  userId: number
  attendeeName: string
  attendeeEmail: string
  attendeePhone?: string
  quantity: number
  accessCode?: string
}

interface RegistrationResponse {
  id: number
  eventId: number
  userId: number
  attendeeName: string
  attendeeEmail: string
  attendeePhone?: string
  quantity: number
  registrationStatus?: Registration['status']
  paymentStatus?: Registration['paymentStatus']
  createdAt?: string
}

function mapRegistration(data: RegistrationResponse): Registration {
  return {
    id: data.id,
    eventId: data.eventId,
    userId: data.userId,
    attendeeName: data.attendeeName,
    attendeeEmail: data.attendeeEmail,
    attendeePhone: data.attendeePhone,
    quantity: data.quantity,
    seats: data.quantity,
    status: data.registrationStatus,
    paymentStatus: data.paymentStatus,
    createdAt: data.createdAt,
  }
}

export const bookingService = {
  create: async (payload: CreateBookingPayload) => {
    const { data } = await apiClient.post<RegistrationResponse>('/registrations', payload)
    return mapRegistration(data)
  },
  listByUser: async (userId: number) => {
    const { data } = await apiClient.get<RegistrationResponse[]>(`/registrations/user/${userId}`)
    return data.map(mapRegistration)
  },
}
