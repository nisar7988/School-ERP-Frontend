import { createFileRoute } from '@tanstack/react-router'
import { StudentAttendanceReport } from '@/features/attendance/pages/StudentAttendanceReport'
import { useAuthStore } from '@/features/auth/store'
import { DashboardLayout } from '@/features/dashboard/components/DashboardLayout'

export const Route = createFileRoute('/_student/student/attendance')({
  component: StudentAttendanceComponent,
})

function StudentAttendanceComponent() {
  const user = useAuthStore((state) => state.user)

  // Use studentProfile.id if available, fallback to user.id
  const studentId = user?.id

  if (!studentId || !user) {
    return (
      <div className="p-8 text-center text-gray-500 italic">
        Student profile not found.
      </div>
    )
  }

  return (
    <DashboardLayout topbarTitle="Attendance Report">
      <StudentAttendanceReport
        userId={studentId}
        studentName={`${user.firstName} ${user.lastName}`}
      />
    </DashboardLayout>
  )
}
