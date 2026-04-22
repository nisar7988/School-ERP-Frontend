import { createFileRoute } from '@tanstack/react-router'
import { StudentDetailsPage } from '@/features/students/pages/StudentDetailsPage'
import { DashboardLayout } from '@/features/dashboard/components/DashboardLayout'

export const Route = createFileRoute('/_teacher/teacher/students/$id')({
  component: () => (
    <DashboardLayout topbarTitle="Student Profile">
      <StudentDetailsPage />
    </DashboardLayout>
  ),
})
