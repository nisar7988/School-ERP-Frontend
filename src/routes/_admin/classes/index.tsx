import { createFileRoute } from '@tanstack/react-router'
import { ClassesPage } from '@/features/classes/pages/ClassesPage'
import { DashboardLayout } from '@/features/dashboard/components/DashboardLayout'

export const Route = createFileRoute('/_admin/classes/')({
  component: () => (
    <DashboardLayout topbarTitle="Classes Management">
      <ClassesPage />
    </DashboardLayout>
  ),
})
