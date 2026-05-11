import { ArrowLeft, BookOpen, Loader2, Plus, Unlink } from 'lucide-react'
import { Link, useNavigate, useParams } from '@tanstack/react-router'
import { ClassForm } from '../components/ClassForm'
import { useUpdateClass } from '../api/mutations'
import { useClass } from '../api/queries'
import { Button } from '@/components/ui/button'
import type { CreateClassDto } from '../types'
import { useState } from 'react'
import { SubjectSelectorModal } from '@/features/subjects/components/SubjectSelectorModal'
import { useUpdateSubject } from '@/features/subjects/api/queries'

export function EditClassPage() {
  const { id } = useParams({ from: '/_admin/classes/$id/edit' })
  const [isSelectorOpen, setIsSelectorOpen] = useState(false)
  const { data: classData, isLoading: isClassLoading } = useClass(id)

  const { mutate: updateClass, isPending } = useUpdateClass()
  const { mutate: updateSubject } = useUpdateSubject()
  const navigate = useNavigate()

  const handleSubmit = (data: CreateClassDto) => {
    updateClass(
      { id, data },
      {
        onSuccess: () => {
          navigate({ to: '/classes' })
        },
      },
    )
  }

  const handleDetach = (subjectId: string) => {
    if (window.confirm('Are you sure you want to detach this subject?')) {
      // Assuming setting classId to null or a placeholder would detach it
      // For now, following the pattern, we might need a specific "unassign" logic
      // But we'll just call updateSubject with an empty classId if allowed
      updateSubject({ id: subjectId, data: { classId: '' } })
    }
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
        <div className="flex justify-between items-center">
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
      </div>

      {/* Main Unified Card */}
      <div className="bg-white rounded-[3rem] border border-gray-100 p-8 md:p-12 shadow-2xl shadow-orange-50/40 space-y-10">
        {/* Subjects Sub-Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                Class Subjects
                <span className="text-xs font-bold bg-brand-peach text-brand-orange px-2 py-0.5 rounded-full uppercase tracking-tighter">
                  {classData.subjects?.length || 0}
                </span>
              </h2>
              <p className="text-xs font-bold text-gray-400 italic">
                Manage curriculum for this class
              </p>
            </div>
            <Button
              variant="brand"
              onClick={() => setIsSelectorOpen(true)}
              className="h-12 px-6 rounded-2xl font-black shadow-lg shadow-orange-100 flex items-center gap-2 group text-sm"
            >
              <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
              Attach Subject
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {classData.subjects?.map((subject) => (
              <div
                key={subject.id}
                className="p-4 rounded-[1.5rem] bg-gray-50/50 border border-gray-100 flex justify-between items-center group hover:bg-white hover:shadow-md transition-all"
              >
                <div>
                  <span className="block font-black text-gray-900 text-sm">
                    {subject.name}
                  </span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    {subject.code}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDetach(subject.id)}
                  className="h-8 w-8 p-0 rounded-xl hover:bg-red-50 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Unlink className="w-3.5 h-3.5" />
                </Button>
              </div>
            ))}
            {(!classData.subjects || classData.subjects.length === 0) && (
              <p className="col-span-full text-center py-6 text-gray-400 font-bold italic text-sm">
                No subjects assigned yet.
              </p>
            )}
          </div>
        </div>

        <div className="relative">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-100"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-4 text-xs font-black text-gray-300 uppercase tracking-[0.3em]">
              Class Metadata
            </span>
          </div>
        </div>

        {/* Form Sub-Section */}
        <ClassForm
          onSubmit={handleSubmit}
          isLoading={isPending}
          defaultValues={{
            name: classData.name,
            section: classData.section,
            academicYearId: classData.academicYearId || '',
            staff:
              classData.staff?.map((s) => ({
                teacherId: s.teacherId,
                role: s.role,
              })) || [],
          }}
        />
      </div>

      <SubjectSelectorModal
        isOpen={isSelectorOpen}
        onClose={() => setIsSelectorOpen(false)}
        classId={id}
      />
    </div>
  )
}
