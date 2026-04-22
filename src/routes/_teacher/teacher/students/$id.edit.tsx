import { createFileRoute } from '@tanstack/react-router'
import { EditStudentPage } from '@/features/students/pages/EditStudentPage'
import { DashboardLayout } from '@/features/dashboard/components/DashboardLayout'

export const Route = createFileRoute('/_teacher/teacher/students/$id/edit')({
  component: () => (
    <DashboardLayout topbarTitle="Edit Student">
      <EditStudentPage />
    </DashboardLayout>
  ),
})
