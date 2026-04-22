import { createFileRoute } from '@tanstack/react-router'
import { AttendancePage } from '@/features/attendance/pages/AttendancePage'
import { DashboardLayout } from '@/features/dashboard/components/DashboardLayout'
import { z } from 'zod'

const attendanceSearchSchema = z.object({
  status: z.string().optional(),
  classId: z.string().optional(),
})

export const Route = createFileRoute('/_teacher/teacher/attendance')({
  validateSearch: (search) => attendanceSearchSchema.parse(search),
  component: () => (
    <DashboardLayout topbarTitle="Attendance Management">
      <AttendancePage />
    </DashboardLayout>
  ),
})
