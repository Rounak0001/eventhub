import { apiClient } from '../client'
import type { PaymentRecord } from '../../types/domain'

export interface ProcessPaymentPayload {
  registrationId: number
  userId: number
  amount: number
}

interface PaymentResponse {
  id: number
  registrationId: number
  payerUserId?: number
  provider?: string
  amount: number
  status: string
  paymentType?: string
  paidAt?: string
  createdAt?: string
}

function mapPayment(data: PaymentResponse): PaymentRecord {
  return {
    id: data.id,
    registrationId: data.registrationId,
    payerUserId: data.payerUserId,
    amount: data.amount,
    status: data.status,
    provider: data.provider,
    paymentType: data.paymentType,
    paidAt: data.paidAt,
    createdAt: data.createdAt,
  }
}

export const paymentService = {
  process: async ({ registrationId, userId, amount }: ProcessPaymentPayload) => {
    const { data } = await apiClient.post<PaymentResponse>(
      `/payments/process?registrationId=${registrationId}&userId=${userId}&amount=${amount}`
    )
    return mapPayment(data)
  },
}
