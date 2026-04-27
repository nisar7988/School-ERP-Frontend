import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_teacher/teacher/students/$id')({
  component: () => <Outlet />,
})
