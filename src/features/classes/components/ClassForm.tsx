import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Trash2, UserPlus, Users } from 'lucide-react'
import { CreateClassSchema, ClassRole } from '../types'
import type { AcademicYear, CreateClassDto } from '../types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTeachers } from '@/features/teachers/queries/useTeachers'
import { useAcademicYears } from '../queries/useAcademicYears'
import type { TeacherWithRelations } from '#/features/students/types'

interface ClassFormProps {
  onSubmit: (data: CreateClassDto) => void
  isLoading: boolean
  defaultValues?: Partial<CreateClassDto>
}

export function ClassForm({
  onSubmit,
  isLoading,
  defaultValues,
}: ClassFormProps) {
  const { data: teachers, isLoading: isLoadingTeachers } = useTeachers()
  const { data: academicYears, isLoading: isLoadingYears } = useAcademicYears()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateClassDto>({
    resolver: zodResolver(CreateClassSchema),
    defaultValues: {
      ...defaultValues,
      staff: defaultValues?.staff || [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'staff',
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Class Name */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-gray-700 ml-1">
            Class Name
          </label>
          <div className="relative group">
            <Input
              {...register('name')}
              placeholder="e.g. 10th Grade, Primary 5"
              className={`h-14 rounded-2xl border-gray-100 bg-gray-50/50 shadow-inner focus:bg-white transition-all duration-300 ${errors.name ? 'border-red-500 ring-4 ring-red-50' : 'focus:ring-4 focus:ring-brand-orange/10'}`}
            />
          </div>
          {errors.name && (
            <p className="text-xs text-red-500 font-bold ml-1 animate-in slide-in-from-top-1">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Section */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-gray-700 ml-1">
            Section / Division
          </label>
          <Input
            {...register('section')}
            placeholder="e.g. A, B, Ruby, Emerald"
            className={`h-14 rounded-2xl border-gray-100 bg-gray-50/50 shadow-inner focus:bg-white transition-all duration-300 ${errors.section ? 'border-red-500 ring-4 ring-red-50' : 'focus:ring-4 focus:ring-brand-orange/10'}`}
          />
          {errors.section && (
            <p className="text-xs text-red-500 font-bold ml-1 animate-in slide-in-from-top-1">
              {errors.section.message}
            </p>
          )}
        </div>

        {/* Academic Year Selection */}
        <div className="space-y-3 col-span-1 md:col-span-2">
          <label className="text-sm font-bold text-gray-700 ml-1">
            Academic Year
          </label>
          <select
            {...register('academicYearId')}
            disabled={isLoadingYears}
            className={`w-full h-14  px-4 rounded-2xl border border-gray-100 bg-gray-50/50 text-sm font-bold focus:outline-none focus:bg-white focus:ring-4 focus:ring-brand-orange/10 transition-all ${errors.academicYearId ? 'border-red-500 ring-4 ring-red-50' : ''}`}
          >
            <option value="">Select Academic Year</option>
            {academicYears?.map((year: AcademicYear) => (
              <option key={year.id} value={year.id}>
                {year.year}
              </option>
            ))}
          </select>
          {errors.academicYearId && (
            <p className="text-xs text-red-500 font-bold ml-1 animate-in slide-in-from-top-1">
              {errors.academicYearId.message}
            </p>
          )}
        </div>

        {/* Staff Assignments */}
        <div className="space-y-6 col-span-1 md:col-span-2">
          <div className="flex items-center justify-between ml-1">
            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
              <Users className="w-5 h-5 text-brand-orange" />
              Staff Assignments
              <span className="text-[10px] text-gray-400 font-normal italic uppercase tracking-widest ml-2">
                Optional
              </span>
            </label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                append({ teacherId: '', role: ClassRole.SUBJECT_TEACHER })
              }
              className="rounded-xl h-9 border-gray-200 text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-brand-orange hover:border-brand-orange/30 group"
            >
              <UserPlus className="w-3.5 h-3.5 mr-1.5 group-hover:scale-110 transition-transform" />
              Add Staff member
            </Button>
          </div>

          <div className="space-y-4">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex flex-col sm:flex-row gap-4 p-6 rounded-[2rem] bg-gray-50/50 border border-gray-100 group animate-in fade-in slide-in-from-top-2 duration-300 relative"
              >
                <div className="flex-1 space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Teacher
                  </label>
                  <select
                    {...register(`staff.${index}.teacherId`)}
                    disabled={isLoadingTeachers}
                    className="w-full h-12 px-4 rounded-xl border border-gray-100 bg-white text-sm font-bold focus:outline-none focus:ring-4 focus:ring-brand-orange/10 transition-all font-sans"
                  >
                    <option value="">Select a Faculty Member</option>
                    {teachers?.map((teacher: TeacherWithRelations) => (
                      <option key={teacher.id} value={teacher.id}>
                        {teacher.user.firstName} {teacher.user.lastName} (
                        {teacher.employeeId})
                      </option>
                    ))}
                  </select>
                  {errors.staff?.[index]?.teacherId && (
                    <p className="text-[10px] text-red-500 font-bold ml-1">
                      {errors.staff[index]?.teacherId?.message}
                    </p>
                  )}
                </div>

                <div className="w-full sm:w-64 space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Role
                  </label>
                  <select
                    {...register(`staff.${index}.role`)}
                    className="w-full h-12 px-4 rounded-xl border border-gray-100 bg-white text-sm font-bold focus:outline-none focus:ring-4 focus:ring-brand-orange/10 transition-all"
                  >
                    <option value={ClassRole.INCHARGE}>Class In-charge</option>
                    <option value={ClassRole.SUBJECT_TEACHER}>
                      Subject Teacher
                    </option>
                  </select>
                </div>

                <div className="flex items-end justify-end pb-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                    className="h-10 w-10 rounded-xl text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            ))}

            {fields.length === 0 && (
              <div className="text-center py-12 rounded-[2.5rem] border-2 border-dashed border-gray-100 bg-gray-50/30">
                <p className="text-sm font-bold text-gray-400 italic">
                  No staff assigned to this class yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-end gap-4">
        <Button
          variant="ghost"
          type="button"
          disabled={isLoading}
          className="h-14 px-8 rounded-2xl font-bold text-gray-500 hover:bg-gray-50/80"
        >
          Cancel
        </Button>
        <Button
          variant="brand"
          type="submit"
          disabled={isLoading}
          className="h-14 px-10 rounded-2xl font-extrabold shadow-xl shadow-orange-100 flex items-center gap-2 group"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          )}
          {isLoading
            ? 'Saving...'
            : defaultValues?.name
              ? 'Update Class'
              : 'Launch Class'}
        </Button>
      </div>
    </form>
  )
}
