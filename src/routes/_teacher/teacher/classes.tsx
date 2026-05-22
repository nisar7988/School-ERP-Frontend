import { createFileRoute, Outlet } from '@tanstack/react-router'
import { DashboardLayout } from '@/features/dashboard/components/DashboardLayout'

export const Route = createFileRoute('/_teacher/teacher/classes')({
  component: () => (
    <DashboardLayout topbarTitle="Class Management">
      <Outlet />
    </DashboardLayout>
  ),
})
