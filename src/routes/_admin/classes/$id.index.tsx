import { createFileRoute } from '@tanstack/react-router'
import { ClassDetailsPage } from '@/features/classes/pages/ClassDetailsPage'
import { DashboardLayout } from '@/features/dashboard/components/DashboardLayout'

export const Route = createFileRoute('/_admin/classes/$id/')({
  component: () => (
    <DashboardLayout>
      <ClassDetailsPage  />
    </DashboardLayout>
  ),
})
