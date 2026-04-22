import { createFileRoute, Outlet, useMatchRoute } from '@tanstack/react-router'
import { TeacherDetailsPage } from '@/features/teachers/pages/TeacherDetailsPage'
import { DashboardLayout } from '@/features/dashboard/components/DashboardLayout'

export const Route = createFileRoute('/_admin/faculty/$id')({
  component: () => {
    const matchRoute = useMatchRoute()

    const isEditPage = matchRoute({
      to: '/_admin/faculty/$id/edit',
    })

    return (
      <>
        {!isEditPage && (
          <DashboardLayout>
            <TeacherDetailsPage />
          </DashboardLayout>
        )}
        <Outlet />
      </>
    )
  },
})
