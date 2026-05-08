import { apiClient } from '@/lib/http/client'
import { AUTH_ROUTES } from './routes'
import type { LoginDto, LoginResponse } from '../types'
import type { User, SingleResponse } from '@/types/base.types'

export const loginService = async (credentials: LoginDto) => {
  const { data } = await apiClient.post<LoginResponse>(
    AUTH_ROUTES.LOGIN,
    credentials,
  )
  return data
}

export const getMeService = async () => {
  const { data } = await apiClient.get<SingleResponse<User>>(AUTH_ROUTES.ME)
  return data.data
}

export const updateUserProfileImageService = async (userId: string, file: File) => {
  const formData = new FormData()
  formData.append('profileImage', file)
  const { data } = await apiClient.patch(
    AUTH_ROUTES.UPDATE_IMAGE(userId),
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  )
  return data
}
