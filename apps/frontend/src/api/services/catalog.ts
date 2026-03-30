import { apiClient } from '../client'
import type { City, EventType } from '../../types/domain'

export const catalogService = {
  listCities: async () => {
    const { data } = await apiClient.get<City[]>('/catalog/cities')
    return data
  },
  listEventTypes: async () => {
    const { data } = await apiClient.get<EventType[]>('/catalog/event-types')
    return data
  },
}
