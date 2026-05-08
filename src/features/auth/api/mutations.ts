import { useMutation, useQueryClient } from '@tanstack/react-query'
import { loginService, updateUserProfileImageService } from './services'
import { useAuthStore } from '../store'
import { toast } from '@/lib/stores/toast.store'

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth)
  
  return useMutation({
    mutationFn: loginService,
    onSuccess: (response) => {
      setAuth(response.data.access_token, response.data.user)
      toast.success('Successfully logged in')
    },
    onError: (error: any) => {
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
