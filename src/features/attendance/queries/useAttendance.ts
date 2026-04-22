import { useQuery } from '@tanstack/react-query'
import { attendanceApi } from '../api/attendance.api'
import type { AttendanceFilters } from '../types'

export const useAttendance = (params?: AttendanceFilters) => {
  return useQuery({
    queryKey: ['attendance', params],
    queryFn: async () => {
      const response = await attendanceApi.getAttendance(params)
      return response.data.data.data
    },
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
