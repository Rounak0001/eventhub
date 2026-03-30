import { apiClient } from '../client'
import type { Vendor, VendorTier, VendorType } from '../../types/domain'

interface VendorResponse {
  id: number
  cityId: number
  eventTypeId: number
  name: string
  tier: VendorTier
  price?: number
  pricePerPlate?: number
  imageUrl?: string
  status?: string
}

function mapVendor(type: VendorType, data: VendorResponse): Vendor {
  const basePrice = data.price ?? data.pricePerPlate ?? 0

  return {
    id: data.id,
    name: data.name,
    type,
    tier: data.tier,
    cityId: data.cityId,
    eventTypeId: data.eventTypeId,
    price: basePrice,
    priceFrom: basePrice,
    image: data.imageUrl,
    status: data.status,
  }
}

export const vendorService = {
  list: async (type: VendorType, cityId: number, eventTypeId: number, tier?: VendorTier) => {
    const endpoint = type === 'FOOD' ? '/catalog/food-vendors' : '/catalog/decoration-vendors'

    const { data } = await apiClient.get<VendorResponse[]>(endpoint, {
      params: { cityId, eventTypeId, tier },
    })

    return data.map((item) => mapVendor(type, item))
  },
}
