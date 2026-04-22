import { createFileRoute } from '@tanstack/react-router'
import { DashboardLayout } from '@/features/dashboard/components/DashboardLayout'
import { StudentDashboardPage } from '@/features/dashboard/pages/StudentDashboardPage'

export const Route = createFileRoute('/_student/student/dashboard')({
  component: () => (
    <DashboardLayout topbarTitle="Overview">
      <StudentDashboardPage />
    </DashboardLayout>
  ),
})
