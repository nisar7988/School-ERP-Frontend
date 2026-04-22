import { createFileRoute, redirect } from '@tanstack/react-router'
import { useAuthStore } from '@/features/auth/store'
import { Role } from '@/features/auth/types'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    const { user } = useAuthStore.getState()

    if (user?.role === Role.TEACHER) {
      throw redirect({ to: '/teacher/dashboard' })
    }
    if (user?.role === Role.STUDENT) {
      throw redirect({ to: '/student/dashboard' })
    }

    throw redirect({
      to: '/dashboard',
    })
  },
})

