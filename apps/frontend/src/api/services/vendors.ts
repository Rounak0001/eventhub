import { apiClient } from '../client'
import type { EventType, Vendor, VendorTier, VendorType } from '../../types/domain'

export const vendorService = {
  list: async (type: VendorType, tier: VendorTier, city?: string, eventType?: EventType) => {
    const endpoint = type === 'FOOD' ? '/catalog/food-vendors' : '/catalog/decoration-vendors'
    const { data } = await apiClient.get<Vendor[]>(endpoint, { params: { tier, city, eventType } })
    return data
  },
}
