import { apiClient } from '../client'
import type { AdminAnalytics, EventSummary } from '../../types/domain'

export interface Transaction {
  id: string
  guestName: string
  amount: number
  status: string
  createdAt: string
}

export const adminService = {
  events: async () => {
    const { data } = await apiClient.get<EventSummary[]>('/admin/events')
    return data
  },
  transactions: async () => {
    const { data } = await apiClient.get<Transaction[]>('/admin/transactions')
    return data
  },
  analytics: async () => {
    const { data } = await apiClient.get<AdminAnalytics>('/admin/analytics')
    return data
  },
}
