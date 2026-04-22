import { redirect } from '@tanstack/react-router'
import { useAuthStore } from '@/features/auth/store'
import { Role } from '@/features/auth/types'

export const checkRole = (allowedRoles: Role[]) => {
  const { user, isAuthenticated, _hasHydrated } = useAuthStore.getState()

  // Don't redirect until we know the store has hydrated from localStorage
  if (!_hasHydrated) return

  if (!isAuthenticated) {
    throw redirect({ to: '/auth/login' })
  }

  if (user && !allowedRoles.includes(user.role)) {
    // Redirect to the correct dashboard based on role
    if (user.role === Role.ADMIN) {
      throw redirect({ to: '/dashboard' })
    } else if (user.role === Role.TEACHER) {
      throw redirect({ to: '/teacher/dashboard' })
    } else if (user.role === Role.STUDENT) {
      throw redirect({ to: '/student/dashboard' })
    }
    // Fallback
    throw redirect({ to: '/auth/login' })
  }
}
