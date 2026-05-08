import { createFileRoute } from '@tanstack/react-router';
import { ScheduleManagementPage } from '@/features/schedule/components/ScheduleManagementPage';
import { DashboardLayout } from '@/features/dashboard/components/DashboardLayout';

export const Route = createFileRoute('/_admin/schedule')({
  component: AdminScheduleRoute,
});

function AdminScheduleRoute() {
  return (
    <DashboardLayout>
      <ScheduleManagementPage />
    </DashboardLayout>
  );
}
