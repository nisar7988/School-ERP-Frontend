import { z } from 'zod'
import {
  AttendanceStatus,
  type Attendance,
  type Student,
  type PaginatedMeta,
} from '@/types/base.types'

export { AttendanceStatus }

export interface AttendanceWithStudent extends Attendance {
  student: Student & {
    user: {
      firstName: string
      lastName: string
      email: string
    }
  }
}

export const CreateAttendanceSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  status: z.nativeEnum(AttendanceStatus),
  remarks: z.string().optional().nullable(),
  studentId: z.string().min(1, 'Student ID is required'),
  classId: z.string().min(1, 'Class ID is required').uuid(),
})

export const UpdateAttendanceSchema = CreateAttendanceSchema.partial()

export type CreateAttendanceDto = z.infer<typeof CreateAttendanceSchema>
export type UpdateAttendanceDto = z.infer<typeof UpdateAttendanceSchema>

export interface StudentAttendanceResponse {
  success: boolean
  message: string
  data: {
    data: Attendance[]
    meta: PaginatedMeta
    stats: {
      total: number
      present: number
      absent: number
      late: number
      excused: number
      percentage: number
    }
  }
}

export interface AttendanceFilters {
  page?: number
  limit?: number
  search?: string
  sortBy?: string
  order?: 'asc' | 'desc'
  status?: AttendanceStatus
  date?: string
  month?: string
  classId?: string
}
