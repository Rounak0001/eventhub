import { apiClient } from '../client'
import type { UserProfile } from '../../types/domain'

export interface ProfileSetupPayload {
  userId: string
  bio?: string
  address?: string
}

export interface ProfileUpdatePayload {
  name?: string
  phone?: string
  avatarUrl?: string
  city?: string
  bio?: string
  address?: string
}

interface ProfileResponse {
  userId: number
  name: string
  email: string
  role?: UserProfile['role']
  phone?: string
  avatarUrl?: string
  city?: string
  isActive?: boolean
  bio?: string
  address?: string
}

function mapProfile(data: ProfileResponse): UserProfile {
  return {
    id: data.userId,
    name: data.name,
    email: data.email,
    role: data.role,
    phone: data.phone,
    avatarUrl: data.avatarUrl,
    city: data.city,
    isActive: data.isActive,
    bio: data.bio,
    address: data.address,
  }
}

export const userService = {
  getProfile: async (userId: string) => {
    const { data } = await apiClient.get<ProfileResponse>(`/users/profile/${userId}`)
    return mapProfile(data)
  },
  setupProfile: async (payload: ProfileSetupPayload) => {
    const { data } = await apiClient.post<ProfileResponse>('/users/profile/setup', payload)
    return mapProfile(data)
  },
  updateProfile: async (userId: string, payload: ProfileUpdatePayload) => {
    const { data } = await apiClient.put<ProfileResponse>(`/users/profile/${userId}`, payload)
    return mapProfile(data)
  },
}
