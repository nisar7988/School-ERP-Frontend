import { createFileRoute } from '@tanstack/react-router'
import { TeacherDashboardPage } from '#/features/dashboard/pages/TeacherDashboardPage'
import { DashboardLayout } from '#/features/dashboard/components/DashboardLayout'

export const Route = createFileRoute('/_teacher/teacher/dashboard')({
  component: () => (
    <DashboardLayout>
      <TeacherDashboardPage />
    </DashboardLayout>
  ),
})
