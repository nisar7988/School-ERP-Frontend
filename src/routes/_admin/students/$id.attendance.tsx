import { createFileRoute } from '@tanstack/react-router'
import { StudentAttendanceReport } from '@/features/attendance/pages/StudentAttendanceReport'
import { useStudent } from '@/features/students/api/queries'
import { DashboardLayout } from '@/features/dashboard/components/DashboardLayout'

export const Route = createFileRoute('/_admin/students/$id/attendance')({
  component: AdminStudentAttendanceComponent,
})

function AdminStudentAttendanceComponent() {
  const { id } = Route.useParams()
  // Fetch student details to show name
  const { data: student } = useStudent(id)

  return (
    <DashboardLayout topbarTitle="Student Attendance">
      <StudentAttendanceReport
        userId={student?.userId || id}
        studentName={
          student
            ? `${student.user.firstName} ${student.user.lastName}`
            : undefined
        }
      />
    </DashboardLayout>
  )
}
