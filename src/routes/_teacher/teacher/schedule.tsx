import { DashboardLayout } from '#/features/dashboard/components/DashboardLayout'
import { SchedulePage } from '@/features/schedule/pages/SchedulePage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_teacher/teacher/schedule')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <DashboardLayout topbarTitle="My Schedule">
      <SchedulePage />
    </DashboardLayout>
  )
}
