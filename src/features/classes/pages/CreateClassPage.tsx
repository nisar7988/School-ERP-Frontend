import { ArrowLeft, BookOpen } from 'lucide-react'
import { Link, useNavigate } from '@tanstack/react-router'
import { ClassForm } from '../components/ClassForm'
import { useCreateClass } from '../hooks/useClassMutations'
import type { CreateClassDto } from '../types'

export function CreateClassPage() {
  const { mutate: createClass, isPending } = useCreateClass()
  const navigate = useNavigate()

  const handleSubmit = (data: CreateClassDto) => {
    createClass(data, {
      onSuccess: () => {
        navigate({ to: '/classes' })
      },
    })
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
            Add New Class
          </h1>
          <p className="text-gray-500 font-semibold italic">
            Expanding the academic horizon of The Atelier.
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 p-10 shadow-xl shadow-orange-50/50">
        <ClassForm onSubmit={handleSubmit} isLoading={isPending} />
      </div>
    </div>
  )
}
