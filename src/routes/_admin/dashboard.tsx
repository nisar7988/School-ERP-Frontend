import { createFileRoute } from '@tanstack/react-router'
import { DashboardLayout } from '@/features/dashboard/components/DashboardLayout'
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage'

export const Route = createFileRoute('/_admin/dashboard')({
  component: () => (
    <DashboardLayout>
      <DashboardPage />
    </DashboardLayout>
  ),
})
