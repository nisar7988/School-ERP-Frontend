import { createFileRoute } from '@tanstack/react-router'
import { StudentsPage } from '@/features/students/pages/StudentsPage'
import { DashboardLayout } from '@/features/dashboard/components/DashboardLayout'

export const Route = createFileRoute('/_teacher/teacher/students')({
  component: () => (
    <DashboardLayout topbarTitle="Student Management">
      <StudentsPage />
    </DashboardLayout>
  ),
})
