import { createFileRoute, Outlet, useMatchRoute } from '@tanstack/react-router'
import { ClassDetailsPage } from '@/features/classes/pages/ClassDetailsPage'
import { DashboardLayout } from '@/features/dashboard/components/DashboardLayout'

export const Route = createFileRoute('/_admin/classes/$id')({
  component: () => {
    const matchRoute = useMatchRoute()

    const isEditPage = matchRoute({
      to: '/_admin/classes/$id/edit',
    })

    return (
      <>
        {!isEditPage && (
          <DashboardLayout>
            <ClassDetailsPage />
          </DashboardLayout>
        )}
        <Outlet />
      </>
    )
  },
})
