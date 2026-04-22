import { createFileRoute } from '@tanstack/react-router'
import { EditTeacherPage } from '@/features/teachers/pages/EditTeacherPage'
import { DashboardLayout } from '@/features/dashboard/components/DashboardLayout'

export const Route = createFileRoute('/_admin/faculty/$id/edit')({
  component: () => (
    <DashboardLayout topbarTitle="Edit Faculty Profile">
      <EditTeacherPage />
    </DashboardLayout>
  ),
})
