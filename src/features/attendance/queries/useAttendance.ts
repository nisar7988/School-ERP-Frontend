import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import { attendanceApi } from '../api/attendance.api'
import type { AttendanceFilters, AttendanceWithStudent } from '../types'
import type { PaginatedMeta } from '../../students/types'

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
      const response = await attendanceApi.getAttendance(params)
      return response.data.data
    },
    ...options,
  })
}

export const useAttendanceDetail = (id: string) => {
  return useQuery({
    queryKey: ['attendance', id],
    queryFn: async () => {
      const response = await attendanceApi.getAttendanceById(id)
      return response.data.data
    },
    enabled: !!id,
  })
}
