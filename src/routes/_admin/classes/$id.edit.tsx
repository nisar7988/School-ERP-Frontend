import { createFileRoute } from '@tanstack/react-router'
import { EditClassPage } from '@/features/classes/pages/EditClassPage'
import { DashboardLayout } from '@/features/dashboard/components/DashboardLayout'

export const Route = createFileRoute('/_admin/classes/$id/edit')({
  component: () => (
    <DashboardLayout>
      <EditClassPage />
    </DashboardLayout>
  ),
})
