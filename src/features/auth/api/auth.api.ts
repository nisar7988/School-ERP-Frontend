import { apiClient } from '../../../lib/http/client'
import type { LoginDto, LoginResponse } from '../types'

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
}
