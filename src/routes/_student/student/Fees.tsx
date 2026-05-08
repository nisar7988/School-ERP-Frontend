import { DashboardLayout } from '#/features/dashboard/components/DashboardLayout'
import { FeeDetailsPage } from '#/features/students/pages/FeeDetailsPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_student/student/Fees')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <DashboardLayout topbarTitle="Fees & Finance">
      <FeeDetailsPage />
    </DashboardLayout>
  )
}
