import { createFileRoute } from '@tanstack/react-router'
import { TeachersPage } from '@/features/teachers/pages/TeachersPage'
import { DashboardLayout } from '@/features/dashboard/components/DashboardLayout'

export const Route = createFileRoute('/_admin/faculty/')({
  component: () => (
    <DashboardLayout topbarTitle="Faculty Management">
      <TeachersPage />
    </DashboardLayout>
  ),
})
