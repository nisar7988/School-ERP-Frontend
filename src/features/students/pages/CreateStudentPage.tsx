import { ArrowLeft, UserPlus } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { StudentForm } from '../components/StudentForm'
import { useCreateStudent } from '../hooks/useStudentMutations'
import type { CreateStudentDto } from '../types'

export function CreateStudentPage() {
  const { mutate: createStudent, isPending } = useCreateStudent()

  const handleSubmit = (data: CreateStudentDto) => {
    createStudent(data)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="space-y-4">
        <Link
          to="/students"
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-brand-orange transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Students
        </Link>

        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
            <UserPlus className="w-10 h-10 text-brand-orange" />
            Add New Student
          </h1>
          <p className="text-gray-500 font-semibold italic">
            Enrolling a new creative mind into The Atelier.
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 p-10 shadow-xl shadow-orange-50/50">
        <StudentForm onSubmit={handleSubmit} isLoading={isPending} />
      </div>
    </div>
  )
}
