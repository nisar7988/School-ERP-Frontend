import { ArrowLeft, Edit3, Loader2, GraduationCap } from 'lucide-react'
import { Link, useNavigate, useParams } from '@tanstack/react-router'
import { TeacherForm } from '../components/TeacherForm'
import { useTeacherMutations } from '../hooks/useTeacherMutations'
import { useTeacher } from '../queries/useTeachers'
import type { CreateTeacherDto } from '../types'

import { Button } from '@/components/ui/button'

export function EditTeacherPage() {
  const { id } = useParams({ from: '/_admin/faculty/$id/edit' })
  const { data: teacherData, isLoading: isTeacherLoading } = useTeacher(id)
  const { updateTeacher } = useTeacherMutations()
  const navigate = useNavigate()

  const handleSubmit = async (values: CreateTeacherDto) => {
    // values now natively contains classId via the updated Schema
    const payload = {
      ...values,
      classId: values.classId || null, // Ensure empty strings are sent as null for unassignment
    }

    updateTeacher.mutate(
      { id, data: payload },
      {
        onSuccess: () => {
          navigate({ to: '/faculty' })
        },
      },
    )
  }

  if (isTeacherLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-10 h-10 animate-spin text-brand-orange" />
      </div>
    )
  }

  if (!teacherData) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-6 text-center bg-gray-50 rounded-[2.5rem] border border-gray-100 p-8">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm">
          <GraduationCap className="w-10 h-10 text-gray-300" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-gray-900 leading-tight">
            Faculty Member Not Found
          </h2>
          <p className="text-gray-500 font-semibold italic">
            This member may have been removed or the ID is incorrect.
          </p>
        </div>
        <Link to="/faculty">
          <Button
            variant="outline"
            className="rounded-2xl h-12 px-8 font-bold border-gray-200"
          >
            Back to Faculty
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="space-y-6">
        <Link
          to="/faculty"
          className="inline-flex items-center gap-2 text-sm font-extrabold text-gray-400 hover:text-brand-orange transition-all group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Faculty Management
        </Link>

        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
            <Edit3 className="w-10 h-10 text-brand-orange" />
            Edit Faculty Profile
          </h1>
          <p className="text-gray-500 font-semibold italic text-lg">
            Updating records for {teacherData.user.firstName}{' '}
            {teacherData.user.lastName}.
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-[3rem] border border-gray-100 p-12 shadow-2xl shadow-orange-50/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="relative z-10">
          <TeacherForm
            onSubmit={handleSubmit}
            isLoading={updateTeacher.isPending}
            defaultValues={{
              firstName: teacherData.user.firstName,
              lastName: teacherData.user.lastName,
              email: teacherData.user.email,
              phone: teacherData.user.phone || '',
              gender: teacherData.user.gender,
              employeeId: teacherData.employeeId,
              qualification: teacherData.qualification,
              joiningDate: teacherData.createdAt
                ? new Date(teacherData.createdAt).toISOString().split('T')[0]
                : '',
              classId: teacherData.classTeacherOf?.id || '',
            }}
          />
        </div>
      </div>
    </div>
  )
}
