import { apiClient } from '../client'
import type { UserProfile } from '../../types/domain'

export interface AuthPayload {
  fullName?: string
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  user: UserProfile
}

export const authService = {
  login: async (payload: AuthPayload) => {
    const { data } = await apiClient.post<AuthResponse>('/auth/login', payload)
    return data
  },
  register: async (payload: AuthPayload) => {
    const { data } = await apiClient.post<AuthResponse>('/auth/register', payload)
    return data
  },
}
