import { useQuery } from '@tanstack/react-query'
import type { UseQueryOptions } from '@tanstack/react-query'
import { getAttendanceService, getStudentAttendanceService } from './services'
import type {
  AttendanceFilters,
  AttendanceWithStudent,
  PaginatedAttendanceData,
} from '../types'
import type { PaginatedData } from '@/types/base.types'

export const useAttendance = (
  params?: AttendanceFilters,
  options?: Omit<
    UseQueryOptions<PaginatedData<AttendanceWithStudent>, Error>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery<PaginatedData<AttendanceWithStudent>, Error>({
    queryKey: ['attendance', params],
    queryFn: async () => {
      const response = await getAttendanceService(params)
      return response.data.data
    },
    ...options,
  })
}

export const useStudentAttendance = (
  userId: string | undefined,
  params?: AttendanceFilters,
  options?: Omit<
    UseQueryOptions<PaginatedAttendanceData | null, Error>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery<PaginatedAttendanceData | null, Error>({
    queryKey: ['attendance', 'student', userId, params],
    queryFn: async () => {
      if (!userId) return null
      const response = await getStudentAttendanceService(userId, params)
      return response.data.data
    },
    enabled: !!userId,
    ...options,
  })
}
