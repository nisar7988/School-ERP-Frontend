import React from 'react'
import { ArrowLeft, UserPlus2 } from 'lucide-react'
import { Link, useNavigate } from '@tanstack/react-router'
import { TeacherForm } from '../components/TeacherForm'
import { useTeacherMutations } from '../hooks/useTeacherMutations'
import type { CreateTeacherDto } from '../types'
import { classesApi } from '@/features/classes/api/classes.api'

export function CreateTeacherPage() {
  const { createTeacher } = useTeacherMutations()
  const navigate = useNavigate()

  const handleSubmit = async (values: CreateTeacherDto) => {
    // Ensure empty string is converted to null for unassigned class
    const payload = {
      ...values,
      classId: values.classId || null,
    }
    
    createTeacher.mutate(payload, {
      onSuccess: () => {
        navigate({ to: '/faculty' })
      },
    })
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
            <UserPlus2 className="w-10 h-10 text-brand-orange" />
            Onboard Faculty Member
          </h1>
          <p className="text-gray-500 font-semibold italic text-lg">
            Adding a new mentor and expert to the Academic Atelier community.
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-[3rem] border border-gray-100 p-12 shadow-2xl shadow-orange-50/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="relative z-10">
          <TeacherForm onSubmit={handleSubmit} isLoading={createTeacher.isPending} />
        </div>
      </div>
    </div>
  )
}
