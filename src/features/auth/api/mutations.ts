import { useMutation, useQueryClient } from '@tanstack/react-query'
import { loginService, updateUserProfileImageService } from './services'
import { useAuthStore } from '../store'
import { toast } from '@/lib/stores/toast.store'
import type { AxiosError } from 'axios'

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth)
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: loginService,
    onSuccess: (response) => {
      const { access_token, user } = response.data.data
      setAuth(access_token, user)
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] })
      toast.success('Successfully logged in')
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || 'Login failed')
    }
  })
}

export const useUpdateProfileImage = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ userId, file }: { userId: string; file: File }) =>
      updateUserProfileImageService(userId, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] })
      queryClient.invalidateQueries({ queryKey: ['teachers'] })
      queryClient.invalidateQueries({ queryKey: ['students'] })
      toast.success('Profile image updated')
    },
  })
}
