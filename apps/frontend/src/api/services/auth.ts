import { apiClient } from '../client'
import type { UserProfile } from '../../types/domain'

export interface RegisterPayload {
  name: string
  email: string
  password: string
}

export interface LoginPayload {
  email: string
  password: string
}

interface AuthResponse {
  token: string
  userId: number
  name: string
  email: string
  role: UserProfile['role']
}

interface MeResponse {
  id: number
  name: string
  email: string
  role: UserProfile['role']
  phone?: string
  city?: string
  isActive?: boolean
}

function toUserProfile(data: Pick<UserProfile, 'id' | 'name' | 'email'> & Partial<UserProfile>): UserProfile {
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    role: data.role,
    phone: data.phone,
    city: data.city,
    avatarUrl: data.avatarUrl,
    bio: data.bio,
    address: data.address,
    isActive: data.isActive,
  }
}

function mapAuthResponse(data: AuthResponse) {
  return {
    token: data.token,
    user: toUserProfile({
      id: data.userId,
      name: data.name,
      email: data.email,
      role: data.role,
    }),
  }
}

export const authService = {
  register: async (payload: RegisterPayload) => {
    const { data } = await apiClient.post<AuthResponse>('/auth/register', payload)
    return mapAuthResponse(data)
  },

  login: async (payload: LoginPayload) => {
    const { data } = await apiClient.post<AuthResponse>('/auth/login', payload)
    return mapAuthResponse(data)
  },

  me: async () => {
    const { data } = await apiClient.get<MeResponse>('/auth/me')
    return toUserProfile(data)
  },
}
