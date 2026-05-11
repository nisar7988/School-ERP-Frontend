import { SchedulePage } from '@/features/schedule/pages/SchedulePage'
import { createFileRoute } from '@tanstack/react-router'
import { DashboardLayout } from '#/features/dashboard/components/DashboardLayout'

export const Route = createFileRoute('/_student/student/schedule')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <DashboardLayout topbarTitle="Schedule">
      <SchedulePage />
    </DashboardLayout>
  )
}
