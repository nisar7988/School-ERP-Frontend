import { createFileRoute } from '@tanstack/react-router'
import { CreateClassPage } from '@/features/classes/pages/CreateClassPage'
import { DashboardLayout } from '@/features/dashboard/components/DashboardLayout'

export const Route = createFileRoute('/_admin/classes/create')({
  component: () => (
    <DashboardLayout topbarTitle="Add Class">
      <CreateClassPage />
    </DashboardLayout>
  ),
})
