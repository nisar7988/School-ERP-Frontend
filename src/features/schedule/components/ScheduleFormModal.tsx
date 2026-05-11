import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Dialog } from '@/components/ui/Dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import type { ScheduleItem, CreateScheduleDto } from '../types'

import { useClasses } from '@/features/classes/api/queries'
import { useTeachers } from '@/features/teachers/api/queries'
import { useSubjectsByClass } from '@/features/subjects/api/queries'

const scheduleSchema = z.object({
  subjectId: z.string().min(1, 'Subject is required'),
  teacherId: z.string().min(1, 'Teacher is required'),
  classId: z.string().min(1, 'Class is required'),
  room: z.string().min(1, 'Room is required'),
  dayOfWeek: z.enum(['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN', 'ALL']),
  startTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format (HH:MM)'),
  endTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format (HH:MM)'),
})

type ScheduleFormData = z.infer<typeof scheduleSchema>

interface ScheduleFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: CreateScheduleDto) => void
  initialData?: ScheduleItem | null
  defaultTime?: { day: string; time: string } | null
  isLoading: boolean
}

export const ScheduleFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  defaultTime,
  isLoading,
}: ScheduleFormModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ScheduleFormData>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      subjectId: '',
      teacherId: '',
      classId: '',
      room: '',
      dayOfWeek: 'MON',
      startTime: '08:00',
      endTime: '09:00',
    },
  })

  const selectedClassId = watch('classId')
  const { data: classesData } = useClasses({ limit: 100 })
  const { data: teachersData } = useTeachers({ limit: 100 })
  const { data: subjectsData } = useSubjectsByClass(selectedClassId)

  const classes = classesData?.data || []
  const teachers = teachersData?.data || []
  const subjects = subjectsData?.data || []

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        const getTime = (t: string) => {
          if (!t) return ''
          if (t.includes('T')) {
            const date = new Date(t)
            return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
          }
          return t
        }

        reset({
          subjectId: initialData.subjectId,
          teacherId: initialData.teacherId,
          classId: initialData.classId,
          room: initialData.room,
          dayOfWeek: initialData.dayOfWeek as any,
          startTime: getTime(initialData.startTime),
          endTime: getTime(initialData.endTime),
        })
      } else if (defaultTime) {
        reset({
          subjectId: '',
          teacherId: '',
          classId: '',
          room: '',
          dayOfWeek: defaultTime.day as any,
          startTime: defaultTime.time,
          endTime: `${(parseInt(defaultTime.time.split(':')[0]) + 1).toString().padStart(2, '0')}:00`,
        })
      } else {
        reset({
          subjectId: '',
          teacherId: '',
          classId: '',
          room: '',
          dayOfWeek: 'MON',
          startTime: '08:00',
          endTime: '09:00',
        })
      }
    }
  }, [isOpen, initialData, defaultTime, reset])

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Schedule' : 'Add Schedule'}
      variant="default"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-700">Subject</label>
          <select
            {...register('subjectId')}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="">Select Subject</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
          {errors.subjectId && (
            <p className="text-xs text-red-500">{errors.subjectId.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">Teacher</label>
            <select
              {...register('teacherId')}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="">Select Teacher</option>
              {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.user?.firstName} {teacher.user?.lastName}
                </option>
              ))}
            </select>
            {errors.teacherId && (
              <p className="text-xs text-red-500">{errors.teacherId.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">Class</label>
            <select
              {...register('classId')}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="">Select Class</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name} - {cls.section}
                </option>
              ))}
            </select>
            {errors.classId && (
              <p className="text-xs text-red-500">{errors.classId.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">Room</label>
            <Input {...register('room')} placeholder="e.g. Rm 302" />
            {errors.room && (
              <p className="text-xs text-red-500">{errors.room.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">Day</label>
            <select
              {...register('dayOfWeek')}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="MON">Monday</option>
              <option value="TUE">Tuesday</option>
              <option value="WED">Wednesday</option>
              <option value="THU">Thursday</option>
              <option value="FRI">Friday</option>
              {!initialData && (
                <option value="ALL">All Weekdays (Mon-Fri)</option>
              )}
            </select>
            {errors.dayOfWeek && (
              <p className="text-xs text-red-500">{errors.dayOfWeek.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">
              Start Time
            </label>
            <Input {...register('startTime')} type="time" />
            {errors.startTime && (
              <p className="text-xs text-red-500">{errors.startTime.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">End Time</label>
            <Input {...register('endTime')} type="time" />
            {errors.endTime && (
              <p className="text-xs text-red-500">{errors.endTime.message}</p>
            )}
          </div>
        </div>

        <div className="flex gap-3 justify-end pt-4">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-brand-orange hover:bg-orange-600 text-white font-bold"
          >
            {isLoading ? 'Saving...' : 'Save Schedule'}
          </Button>
        </div>
      </form>
    </Dialog>
  )
}
