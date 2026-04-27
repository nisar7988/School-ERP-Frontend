import { createFileRoute } from '@tanstack/react-router'
import { TeacherDetailsPage } from '@/features/teachers/pages/TeacherDetailsPage'
import { DashboardLayout } from '@/features/dashboard/components/DashboardLayout'

export const Route = createFileRoute('/_admin/faculty/$id/')({
  component: () => (
    <DashboardLayout>
      <TeacherDetailsPage />
    </DashboardLayout>
  ),
})
