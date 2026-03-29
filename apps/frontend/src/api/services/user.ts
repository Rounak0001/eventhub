import { apiClient } from '../client'
import type { UserProfile } from '../../types/domain'

export const userService = {
  profile: async () => {
    const { data } = await apiClient.get<UserProfile>('/users/profile')
    return data
  },
}
