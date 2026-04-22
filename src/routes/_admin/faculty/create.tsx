import { createFileRoute } from '@tanstack/react-router'
import { DashboardLayout } from '@/features/dashboard/components/DashboardLayout'
import { CreateTeacherPage } from '@/features/teachers/pages/CreateTeacherPage'

export const Route = createFileRoute('/_admin/faculty/create')({
  component: () => (
    <DashboardLayout topbarTitle="Onboard Faculty">
      <CreateTeacherPage />
    </DashboardLayout>
  ),
})
