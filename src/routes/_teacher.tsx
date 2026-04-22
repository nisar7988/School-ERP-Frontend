import { createFileRoute, Outlet } from '@tanstack/react-router'
import { checkRole } from '@/lib/auth-guards'
import { Role } from '@/features/auth/types'

export const Route = createFileRoute('/_teacher')({
  beforeLoad: () => checkRole([Role.TEACHER]),
  component: () => <Outlet />,
})
