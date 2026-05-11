import { createFileRoute } from '@tanstack/react-router';
import { DashboardLayout } from '@/features/dashboard/components/DashboardLayout';
import { PaymentAnalyticsDashboard } from '@/features/fees/pages/PaymentAnalyticsDashboard';

export const Route = createFileRoute('/_admin/fees/analytics')({
  component: () => (
    <DashboardLayout topbarTitle="Financial Insights">
      <PaymentAnalyticsDashboard />
    </DashboardLayout>
  ),
});
