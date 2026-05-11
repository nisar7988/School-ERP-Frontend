import { createFileRoute } from '@tanstack/react-router';
import { DashboardLayout } from '@/features/dashboard/components/DashboardLayout';
import { SubjectsListPage } from '@/features/subjects/pages/SubjectsListPage';

export const Route = createFileRoute('/_admin/subjects')({
  component: () => (
    <DashboardLayout topbarTitle="Curriculum Management">
      <SubjectsListPage />
    </DashboardLayout>
  ),
});
