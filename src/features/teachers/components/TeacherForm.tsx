import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateTeacherSchema, type CreateTeacherDto } from '../types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { UserCircle, GraduationCap, Briefcase } from 'lucide-react'

import { useClasses } from '@/features/classes/queries/useClasses'
import { useClassesByTeacher } from '@/features/classes/queries/useClassesByTeacher'
import { useAuthStore } from '@/features/auth/store'
import { Role } from '@/features/auth/types'
import { Gender } from '#/features/students/types'
import type { SchoolClass } from '#/features/classes/types'
interface TeacherFormProps {
  onSubmit: (data: CreateTeacherDto) => void
  isLoading: boolean
  defaultValues?: Partial<CreateTeacherDto>
}

export function TeacherForm({
  onSubmit,
  isLoading,
  defaultValues,
}: TeacherFormProps) {
  const user = useAuthStore((state) => state.user)
  const isAdmin = user?.role === Role.ADMIN
  const isTeacher = user?.role === Role.TEACHER

  const { data: adminClasses, isLoading: isLoadingAdminClasses } = useClasses({
    enabled: isAdmin,
  })

  const { data: teacherClasses, isLoading: isLoadingTeacherClasses } =
    useClassesByTeacher(isTeacher ? user?.id : undefined)

  const classes = isAdmin ? adminClasses : teacherClasses
  const isLoadingClasses = isAdmin
    ? isLoadingAdminClasses
    : isLoadingTeacherClasses

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTeacherDto>({
    resolver: zodResolver(CreateTeacherSchema),
    defaultValues,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Section 1: Personal Information */}
        <div className="space-y-8">
          <div className="flex items-center gap-3 pb-2 border-b border-gray-50">
            <UserCircle className="w-6 h-6 text-brand-orange" />
            <h3 className="text-lg font-extrabold text-gray-900 tracking-tight uppercase">
              Personal Information
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">
                First Name
              </label>
              <Input
                {...register('firstName')}
                placeholder="John"
                className={`h-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all ${errors.firstName ? 'border-red-500 ring-4 ring-red-50' : 'focus:ring-4 focus:ring-brand-orange/10'}`}
              />
              {errors.firstName && (
                <p className="text-xs text-red-500 font-bold ml-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">
                Last Name
              </label>
              <Input
                {...register('lastName')}
                placeholder="Doe"
                className={`h-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all ${errors.lastName ? 'border-red-500 ring-4 ring-red-50' : 'focus:ring-4 focus:ring-brand-orange/10'}`}
              />
              {errors.lastName && (
                <p className="text-xs text-red-500 font-bold ml-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">
              Email Address
            </label>
            <Input
              {...register('email')}
              placeholder="john.doe@atelierschool.com"
              className={`h-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all ${errors.email ? 'border-red-500 ring-4 ring-red-50' : 'focus:ring-4 focus:ring-brand-orange/10'}`}
            />
            {errors.email && (
              <p className="text-xs text-red-500 font-bold ml-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">
              Set Password
            </label>
            <Input
              type="password"
              {...register('password')}
              placeholder="••••••"
              className={`h-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all ${errors.password ? 'border-red-500 ring-4 ring-red-50' : 'focus:ring-4 focus:ring-brand-orange/10'}`}
            />
            {errors.password && (
              <p className="text-xs text-red-500 font-bold ml-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">
                Gender
              </label>
              <select
                {...register('gender')}
                className={`w-full h-12 px-4 rounded-2xl border ${errors.gender ? 'border-red-500 ring-4 ring-red-50' : 'border-gray-100'} bg-gray-50/50 text-sm font-bold focus:outline-none focus:bg-white focus:ring-4 focus:ring-brand-orange/10 transition-all`}
              >
                <option value="">Select</option>
                {Object.values(Gender).map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
              {errors.gender && (
                <p className="text-xs text-red-500 font-bold ml-1">
                  {errors.gender.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">
                Phone
              </label>
              <Input
                {...register('phone')}
                placeholder="+1 (234) 567-890"
                className="h-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all focus:ring-4 focus:ring-brand-orange/10"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Professional Details */}
        <div className="space-y-8">
          <div className="flex items-center gap-3 pb-2 border-b border-gray-50">
            <Briefcase className="w-6 h-6 text-brand-orange" />
            <h3 className="text-lg font-extrabold text-gray-900 tracking-tight uppercase">
              Professional Details
            </h3>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1 font-mono">
              Employee ID
            </label>
            <Input
              {...register('employeeId')}
              placeholder="FAC-2024-001"
              className={`h-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all font-mono tracking-wider ${errors.employeeId ? 'border-red-500 ring-4 ring-red-50' : 'focus:ring-4 focus:ring-brand-orange/10'}`}
            />
            {errors.employeeId && (
              <p className="text-xs text-red-500 font-bold ml-1">
                {errors.employeeId.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-gray-400" />
              Qualification
            </label>
            <Input
              {...register('qualification')}
              placeholder="e.g. PhD in Computer Science"
              className={`h-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all ${errors.qualification ? 'border-red-500 ring-4 ring-red-50' : 'focus:ring-4 focus:ring-brand-orange/10'}`}
            />
            {errors.qualification && (
              <p className="text-xs text-red-500 font-bold ml-1">
                {errors.qualification.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">
              Joining Date
            </label>
            <Input
              type="date"
              {...register('joiningDate')}
              className="h-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all focus:ring-4 focus:ring-brand-orange/10"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1 flex items-center justify-between">
              Assigned as Class Teacher Of
              <span className="text-[10px] text-gray-400 font-normal italic uppercase tracking-widest">
                Optional
              </span>
            </label>
            <select
              {...register('classId')}
              disabled={isLoadingClasses}
              className="w-full h-12 px-4 rounded-2xl border border-gray-100 bg-gray-50/50 text-sm font-bold focus:outline-none focus:bg-white focus:ring-4 focus:ring-brand-orange/10 transition-all"
            >
              <option value="">None / Not Assigned</option>
              {classes?.map((cls: SchoolClass) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name} - {cls.section}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-gray-100 flex justify-end gap-4">
        <Button
          variant="ghost"
          type="button"
          disabled={isLoading}
          className="h-12 px-8 rounded-2xl font-bold"
        >
          Cancel
        </Button>
        <Button
          variant="brand"
          type="submit"
          disabled={isLoading}
          className="h-12 px-10 rounded-2xl font-extrabold shadow-xl shadow-orange-100"
        >
          {isLoading ? 'Processing...' : 'Save Faculty Member'}
        </Button>
      </div>
    </form>
  )
}
