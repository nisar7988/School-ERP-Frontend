import { createFileRoute } from '@tanstack/react-router'
import { CreateStudentPage } from '@/features/students/pages/CreateStudentPage'
import { DashboardLayout } from '@/features/dashboard/components/DashboardLayout'

export const Route = createFileRoute('/_admin/students/create')({
  component: () => (
    <DashboardLayout topbarTitle="Add Student">
      <CreateStudentPage />
    </DashboardLayout>
  ),
})
