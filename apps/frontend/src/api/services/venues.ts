import { apiClient } from '../client'
import type { Venue } from '../../types/domain'

interface VenueResponse {
  id: number
  cityId: number
  eventTypeId: number
  name: string
  description?: string
  address?: string
  seatCapacityMax?: number
  basePrice?: number
  imageUrl?: string
  status?: string
}

function mapVenue(data: VenueResponse): Venue {
  return {
    id: data.id,
    cityId: data.cityId,
    eventTypeId: data.eventTypeId,
    name: data.name,
    description: data.description,
    address: data.address,
    capacity: data.seatCapacityMax,
    basePrice: data.basePrice,
    startingPrice: data.basePrice,
    image: data.imageUrl,
    style: data.description,
    status: data.status,
  }
}

export const venueService = {
  list: async (cityId: number, eventTypeId: number) => {
    const { data } = await apiClient.get<VenueResponse[]>('/catalog/venues', {
      params: { cityId, eventTypeId },
    })
    return data.map(mapVenue)
  },
}
