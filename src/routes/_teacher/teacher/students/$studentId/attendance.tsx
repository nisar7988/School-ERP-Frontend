import { createFileRoute } from '@tanstack/react-router'
import { StudentAttendanceReport } from '@/features/attendance/pages/StudentAttendanceReport'
import { useStudent } from '@/features/students/queries/useStudents'
import { DashboardLayout } from '@/features/dashboard/components/DashboardLayout'

export const Route = createFileRoute(
  '/_teacher/teacher/students/$studentId/attendance',
)({
  component: TeacherStudentAttendanceComponent,
})

function TeacherStudentAttendanceComponent() {
  const { studentId } = Route.useParams()
  // Fetch student details to show name
  const { data: student } = useStudent(studentId)

  return (
    <DashboardLayout topbarTitle="Student Attendance">
      <StudentAttendanceReport
        studentId={studentId}
        studentName={
          student
            ? `${student.user.firstName} ${student.user.lastName}`
            : undefined
        }
      />
    </DashboardLayout>
  )
}
