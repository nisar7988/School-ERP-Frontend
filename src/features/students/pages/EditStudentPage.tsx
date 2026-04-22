import { useParams, Link } from '@tanstack/react-router'
import { ArrowLeft, UserEdit } from 'lucide-react'
import { StudentForm } from '../components/StudentForm'
import { useStudent } from '../queries/useStudent'
import { useUpdateStudent } from '../hooks/useStudentMutations'
import { Loader2 } from 'lucide-react'

export function EditStudentPage() {
  const { id } = useParams({ strict: false }) as { id: string }
  const { data: student, isLoading: isFetching } = useStudent(id)
  const { mutate: updateStudent, isPending: isUpdating } = useUpdateStudent(id)

  const handleSubmit = (data: any) => {
    // If password is empty, remove it from payload
    if (!data.password) {
      delete data.password
    }
    updateStudent(data)
  }

  if (isFetching) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-10 h-10 animate-spin text-brand-orange" />
      </div>
    )
  }

  if (!student) {
    return (
      <div className="p-10 text-center font-bold text-red-500">
        Student not found.
      </div>
    )
  }

  // Map student record to form default values
  const defaultValues = {
    firstName: student.user.firstName,
    lastName: student.user.lastName,
    email: student.user.email,
    gender: student.user.gender,
    phone: student.user.phone,
    admissionNo: student.admissionNo,
    rollNo: student.rollNo,
    dateOfBirth: new Date(student.dateOfBirth).toISOString().split('T')[0],
    address: student.address,
    fatherName: student.fatherName,
    motherName: student.motherName,
    emergencyContact: student.emergencyContact,
    classId: student.classId,
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="space-y-4">
        <Link
          to="../.."
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-brand-orange transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Students
        </Link>

        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
            <UserEdit className="w-10 h-10 text-brand-orange" />
            Edit Student Details
          </h1>
          <p className="text-gray-500 font-semibold italic">
            Updating records for {student.user.firstName} {student.user.lastName}.
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 p-10 shadow-xl shadow-orange-50/50">
        <StudentForm 
          onSubmit={handleSubmit} 
          isLoading={isUpdating} 
          defaultValues={defaultValues} 
        />
      </div>
    </div>
  )
}
