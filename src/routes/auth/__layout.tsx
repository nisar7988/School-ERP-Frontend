import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/__layout')({
  component: AuthLayout,
})

function AuthLayout() {
  return (
    <div className="auth-layout min-h-[calc(100vh-160px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Outlet />
    </div>
  )
}
