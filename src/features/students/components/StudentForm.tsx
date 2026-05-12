import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateStudentSchema, Gender } from '../types'
import type { CreateStudentDto } from '../types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useClasses, useClassesByTeacher } from '@/features/classes/api/queries'
import { useAuthStore } from '@/features/auth/store'
import { Role } from '@/features/auth/types'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

interface StudentFormProps {
  onSubmit: (data: CreateStudentDto) => void
  isLoading: boolean
  defaultValues?: Partial<CreateStudentDto>
}

export function StudentForm({
  onSubmit,
  isLoading,
  defaultValues,
}: StudentFormProps) {
  const user = useAuthStore((state) => state.user)
  const isAdmin = user?.role === Role.ADMIN
  const isTeacher = user?.role === Role.TEACHER

  const { data: adminClassesResponse, isLoading: isLoadingAdminClasses } =
    useClasses({ limit: 100 }, { enabled: isAdmin })

  const { data: teacherClassesResponse, isLoading: isLoadingTeacherClasses } =
    useClassesByTeacher(isTeacher ? user?.id : undefined, { limit: 100 })

  const classes = isAdmin
    ? adminClassesResponse?.data
    : teacherClassesResponse?.data
  const isLoadingClasses = isAdmin
    ? isLoadingAdminClasses
    : isLoadingTeacherClasses

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateStudentDto>({
    resolver: zodResolver(CreateStudentSchema),
    defaultValues,
  })
  const handleFormSubmit = (data: CreateStudentDto) => {
    onSubmit(data)
    reset()
  }

  const [showPassword, setShowPassword] = useState(false)

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
            Personal Info
          </h3>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">
              First Name
            </label>
            <Input
              {...register('firstName')}
              placeholder="John"
              className={errors.firstName ? 'border-red-500' : ''}
            />
            {errors.firstName && (
              <p className="text-xs text-red-500 font-semibold">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Last Name</label>
            <Input
              {...register('lastName')}
              placeholder="Doe"
              className={errors.lastName ? 'border-red-500' : ''}
            />
            {errors.lastName && (
              <p className="text-xs text-red-500 font-semibold">
                {errors.lastName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">
              Email Address
            </label>
            <Input
              {...register('email')}
              placeholder="john.doe@atelierschool.com"
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="text-xs text-red-500 font-semibold">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">
              Set Password
            </label>
            <Input
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              placeholder="••••••"
              className={errors.password ? 'border-red-500' : ''}
            />

            <div
              onClick={() => setShowPassword(!showPassword)}
              className="relative bottom-10 left-[92%] cursor-pointer"
            >
              {showPassword ? (
                <Eye className="w-5 h-5 text-gray-400" />
              ) : (
                <EyeOff className="w-5 h-5 text-gray-400" />
              )}
            </div>

            {errors.password && (
              <p className="text-xs text-red-500 font-semibold">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Gender</label>
            <select
              {...register('gender')}
              className={`w-full h-11 px-4 rounded-2xl border ${errors.gender ? 'border-red-500' : 'border-gray-200'} bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-orange/20`}
            >
              {Object.values(Gender).map((gender: Gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
            {errors.gender && (
              <p className="text-xs text-red-500 font-semibold">
                {errors.gender.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">
              Phone (Optional)
            </label>
            <Input {...register('phone')} placeholder="+1 234 567 890" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">
              Date of Birth
            </label>
            <Input
              type="date"
              {...register('dateOfBirth')}
              className={errors.dateOfBirth ? 'border-red-500' : ''}
            />
            {errors.dateOfBirth && (
              <p className="text-xs text-red-500 font-semibold">
                {errors.dateOfBirth.message}
              </p>
            )}
          </div>
        </div>

        {/* Academic Information */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
            Academic Info
          </h3>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">
              Admission Number
            </label>
            <Input
              {...register('admissionNo')}
              placeholder="ADM-2024-001"
              className={errors.admissionNo ? 'border-red-500' : ''}
            />
            {errors.admissionNo && (
              <p className="text-xs text-red-500 font-semibold">
                {errors.admissionNo.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">
              Roll Number (Optional)
            </label>
            <Input {...register('rollNo')} placeholder="01" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Class</label>
            <select
              {...register('classId')}
              className={`w-full h-11 px-4 rounded-2xl border ${errors.classId ? 'border-red-500' : 'border-gray-200'} bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-orange/20`}
              disabled={isLoadingClasses}
            >
              <option value="">Select a class</option>
              {classes?.map((c: any) => (
                <option key={c.id} value={c.id}>
                  {c.name} - {c.section}
                </option>
              ))}
            </select>
            {errors.classId && (
              <p className="text-xs text-red-500 font-semibold">
                {errors.classId.message}
              </p>
            )}
          </div>

          <div className="space-y-2 pt-2">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
              Parents Info
            </h3>
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">
                  Father's Name
                </label>
                <Input {...register('fatherName')} placeholder="Robert Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">
                  Mother's Name
                </label>
                <Input {...register('motherName')} placeholder="Amina Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">
                  Emergency Contact
                </label>
                <Input
                  {...register('emergencyContact')}
                  placeholder="+1 987 654 321"
                />
              </div>

              {/* Address */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">
                  Address
                </label>
                <Input {...register('address')} placeholder="123 Main St" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
        <Button variant="outline" type="button" disabled={isLoading}>
          Cancel
        </Button>
        <Button variant="brand" type="submit" disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Save Student'}
        </Button>
      </div>
    </form>
  )
}
