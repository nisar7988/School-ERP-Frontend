import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { authApi } from '../api/auth.api'
import { Role } from '../types'
import { useAuthStore } from '../store'
import { toast } from '@/lib/stores/toast.store'

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth)
  const navigate = useNavigate()

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: async (response) => {
      const { access_token, user } = response.data
      setAuth(access_token, user)

      try {
        const fullUser = await authApi.getMe()
        useAuthStore.getState().updateUser(fullUser)
        toast.success(`Welcome back, ${fullUser.firstName}!`)

        if (fullUser.role === Role.ADMIN) {
          navigate({ to: '/dashboard' })
        } else if (fullUser.role === Role.TEACHER) {
          navigate({ to: '/teacher/dashboard' })
        } else if (fullUser.role === Role.STUDENT) {
          navigate({ to: '/student/dashboard' })
        }
      } catch (error) {
        console.error('Failed to fetch full user profile:', error)
        // Fallback to basic user info and redirect
        if (user.role === Role.ADMIN) {
          navigate({ to: '/dashboard' })
        } else if (user.role === Role.TEACHER) {
          navigate({ to: '/teacher/dashboard' })
        } else if (user.role === Role.STUDENT) {
          navigate({ to: '/student/dashboard' })
        }
      }
    },
  })
}
