import { useQuery  } from '@tanstack/react-query'
import type {UseQueryOptions} from '@tanstack/react-query';
import { getAttendanceService, getAttendanceByIdService, getStudentAttendanceService } from './services'
import type { AttendanceFilters, AttendanceWithStudent  } from '../types'
import type { PaginatedMeta, Attendance  } from '@/types/base.types'

export const useAttendance = (
  params?: AttendanceFilters,
  options?: Omit<
    UseQueryOptions<{ data: AttendanceWithStudent[]; meta: PaginatedMeta }, Error>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery<{ data: AttendanceWithStudent[]; meta: PaginatedMeta }, Error>({
    queryKey: ['attendance', params],
    queryFn: async () => {
      const response = await getAttendanceService(params)
      return response.data.data
    },
    ...options,
  })
}

export const useAttendanceById = (
  id: string | undefined,
  options?: Omit<UseQueryOptions<AttendanceWithStudent | null, Error>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery<AttendanceWithStudent | null, Error>({
    queryKey: ['attendance', id],
    queryFn: async () => {
      if (!id) return null
      const response = await getAttendanceByIdService(id)
      return response.data.data
    },
    enabled: !!id,
    ...options,
  })
}

export const useStudentAttendance = (
  studentId: string | undefined,
  params?: AttendanceFilters,
  options?: Omit<
    UseQueryOptions<
      { data: Attendance[]; meta: PaginatedMeta; stats?: any } | null,
      Error
    >,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery<
    { data: Attendance[]; meta: PaginatedMeta; stats?: any } | null,
    Error
  >({
    queryKey: ['attendance', 'student', studentId, params],
    queryFn: async () => {
      if (!studentId) return null
      const response = await getStudentAttendanceService(studentId, params)
      return response.data.data
    },
    enabled: !!studentId,
    ...options,
  })
}
