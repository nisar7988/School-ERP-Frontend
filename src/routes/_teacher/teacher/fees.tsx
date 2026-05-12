import { createFileRoute } from '@tanstack/react-router';
import { DashboardLayout } from '@/features/dashboard/components/DashboardLayout';
import { TeacherFeesPage } from '@/features/teachers/pages/TeacherFeesPage';

export const Route = createFileRoute('/_teacher/teacher/fees')({
  component: () => (
    <DashboardLayout topbarTitle="Class Fees">
      <TeacherFeesPage />
    </DashboardLayout>
  ),
});
