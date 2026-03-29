import { apiClient } from '../client'
import type { PaymentPayload } from '../../types/domain'

export const paymentService = {
  create: async (payload: PaymentPayload) => {
    const { data } = await apiClient.post('/payments/demo/create-order', payload)
    return data
  },
  complete: async (paymentId: string, status: 'SUCCESS' | 'FAILED' | 'PENDING') => {
    const { data } = await apiClient.post('/payments/demo/complete', { paymentId, status })
    return data
  },
}
