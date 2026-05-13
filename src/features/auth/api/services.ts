import { apiClient } from '@/lib/http/client'
import { AUTH_ROUTES } from './routes'
import type { LoginDto, LoginResponse } from '../types'
import type { User, SingleResponse } from '@/types/base.types'

export const loginService = (credentials: LoginDto) =>
  apiClient.post<LoginResponse>(AUTH_ROUTES.LOGIN, credentials);

export const getMeService = () =>
  apiClient.get<SingleResponse<User>>(AUTH_ROUTES.ME);

export const updateUserProfileImageService = (userId: string, file: File) => {
  const formData = new FormData()
  formData.append('profileImage', file)
  return apiClient.patch(
    AUTH_ROUTES.UPDATE_IMAGE(userId),
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  )
}
