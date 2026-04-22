import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import {
  CreateAttendanceSchema,
  type CreateAttendanceDto,
  AttendanceStatus,
} from '../types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/Textarea'
import { useStudents } from '../../students/queries/useStudents'

interface AttendanceFormProps {
  onSubmit: (data: CreateAttendanceDto) => void
  isLoading: boolean
  defaultValues?: Partial<CreateAttendanceDto>
}

export function AttendanceForm({
  onSubmit,
  isLoading,
  defaultValues,
}: AttendanceFormProps) {
  const { data: students } = useStudents()
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateAttendanceDto>({
    resolver: zodResolver(CreateAttendanceSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      status: AttendanceStatus.PRESENT,
      ...defaultValues,
    },
  })

  // Synchronize classId when student changes
  const watchedStudentId = watch('studentId')
  useEffect(() => {
    if (watchedStudentId && students) {
      const student = students.find((s) => s.id === watchedStudentId)
      if (student?.classId) {
        setValue('classId', student.classId)
      }
    }
  }, [watchedStudentId, students, setValue])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 font-sans">
      <div className="space-y-4">
        {/* Student Selector (only if not pre-selected) */}
        {!defaultValues?.studentId && (
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">
              Select Student
            </label>
            <select
              {...register('studentId')}
              className={`w-full h-11 px-4 rounded-2xl border ${
                errors.studentId ? 'border-red-500' : 'border-gray-200'
              } bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-orange/20`}
            >
              <option value="">Select a student</option>
              {students?.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.user?.firstName || 'Unknown'}{' '}
                  {student.user?.lastName || 'Student'} (
                  {student.admissionNo || 'N/A'})
                </option>
              ))}
            </select>
            {errors.studentId && (
              <p className="text-xs text-red-500 font-semibold">
                {errors.studentId.message}
              </p>
            )}
          </div>
        )}

        {/* Date Field */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">
            Attendance Date
          </label>
          <Input
            type="date"
            {...register('date')}
            className={errors.date ? 'border-red-500' : ''}
          />
          {errors.date && (
            <p className="text-xs text-red-500 font-semibold">
              {errors.date.message}
            </p>
          )}
        </div>

        {/* Status Field */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">Status</label>
          <select
            {...register('status')}
            className={`w-full h-11 px-4 rounded-2xl border ${
              errors.status ? 'border-red-500' : 'border-gray-200'
            } bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-orange/20`}
          >
            {Object.values(AttendanceStatus).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          {errors.status && (
            <p className="text-xs text-red-500 font-semibold">
              {errors.status.message}
            </p>
          )}
        </div>

        {/* Remarks Field */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">
            Remarks (Optional)
          </label>
          <Textarea
            {...register('remarks')}
            placeholder="e.g., Late due to bus delay"
            className={`rounded-2xl min-h-[100px] ${errors.remarks ? 'border-red-500' : ''}`}
          />
          {errors.remarks && (
            <p className="text-xs text-red-500 font-semibold">
              {errors.remarks.message}
            </p>
          )}
        </div>

        {/* Hidden Fields for IDs */}
        <input type="hidden" {...register('studentId')} />
        <input type="hidden" {...register('classId')} />
      </div>

      <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
        <Button
          variant="brand"
          type="submit"
          disabled={isLoading}
          className="w-full font-bold h-12 shadow-md"
        >
          {isLoading ? 'Saving...' : 'Save Attendance'}
        </Button>
      </div>
    </form>
  )
}
