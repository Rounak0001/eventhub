import { apiClient } from '../client'
import type { EventType, Venue } from '../../types/domain'

export const venueService = {
  list: async (city: string, eventType?: EventType, date?: string, startTime?: string, endTime?: string) => {
    const { data } = await apiClient.get<Venue[]>('/catalog/venues', { params: { city, eventType, date, startTime, endTime } })
    return data
  },
}
