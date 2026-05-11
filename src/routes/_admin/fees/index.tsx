import { createFileRoute } from '@tanstack/react-router';
import { DashboardLayout } from '@/features/dashboard/components/DashboardLayout';
import { FeesDashboardPage } from '@/features/fees/pages/FeesDashboardPage';

export const Route = createFileRoute('/_admin/fees/')({
  component: () => (
    <DashboardLayout topbarTitle="Financial Management">
      <FeesDashboardPage />
    </DashboardLayout>
  ),
});
