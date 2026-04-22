import { ArrowLeft, BookOpen, Loader2 } from 'lucide-react'
import { Link, useNavigate, useParams } from '@tanstack/react-router'
import { ClassForm } from '../components/ClassForm'
import { useUpdateClass } from '../hooks/useClassMutations'
import { useClass } from '../queries/useClass'
import { Button } from '@/components/ui/button'
import type { CreateClassDto } from '../types'

export function EditClassPage() {
  const { id } = useParams({ from: '/_admin/classes/$id/edit' })
  const { data: classData, isLoading: isClassLoading } = useClass(id)
  const { mutate: updateClass, isPending } = useUpdateClass(id)
  const navigate = useNavigate()

  const handleSubmit = (data: CreateClassDto) => {
    updateClass(data, {
      onSuccess: () => {
        navigate({ to: '/classes' })
      },
    })
  }

  if (isClassLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-10 h-10 animate-spin text-brand-orange" />
      </div>
    )
  }

  if (!classData) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-6 text-center bg-gray-50 rounded-[2.5rem] border border-gray-100 p-8">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm">
          <BookOpen className="w-10 h-10 text-gray-300" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-gray-900 leading-tight">
            Class Not Found
          </h2>
          <p className="text-gray-500 font-semibold italic">
            This class may have been deleted or the ID is incorrect.
          </p>
        </div>
        <Link to="/classes">
          <Button
            variant="outline"
            className="rounded-2xl h-12 px-8 font-bold border-gray-200"
          >
            Back to Classes
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="space-y-4">
        <Link
          to="/classes"
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-brand-orange transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Classes
        </Link>

        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
            <BookOpen className="w-10 h-10 text-brand-orange" />
            Edit Class
          </h1>
          <p className="text-gray-500 font-semibold italic">
            Updating the details of {classData.name} - {classData.section}.
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 p-10 shadow-xl shadow-orange-50/50">
        <ClassForm
          onSubmit={handleSubmit}
          isLoading={isPending}
          defaultValues={{
            name: classData.name,
            section: classData.section,
            academicYearId: classData.academicYearId,
            staff: classData.staff?.map((s) => ({
              teacherId: s.teacherId,
              role: s.role,
            })) || [],
          }}
        />
      </div>
    </div>
  )
}
