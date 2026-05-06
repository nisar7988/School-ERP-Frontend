import { apiClient } from '../../../lib/http/client'
import type { LoginDto, LoginResponse } from '../types'
import type { User } from '@/types/base.types'

export const authApi = {
  login: async (credentials: LoginDto) => {
    const { data } = await apiClient.post<LoginResponse>(
      '/auth/login',
      credentials,
    )
    return data
  },
  getMe: async () => {
    const { data } = await apiClient.get<{
      success: boolean
      message: string
      data: User
    }>('/users/me')
    return data.data
  },
  updateUserProfileImage: async (userId: string, file: File) => {
    const formData = new FormData()
    formData.append('profileImage', file)
    const { data } = await apiClient.patch(
      `/users/${userId}/profile-image`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    return data
  },
}
