import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/faculty/$id')({
  component: () => <Outlet />,
})
