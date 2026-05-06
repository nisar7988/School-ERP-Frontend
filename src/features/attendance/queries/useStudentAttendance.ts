import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import { attendanceApi } from '../api/attendance.api'
import type { AttendanceFilters, StudentAttendanceResponse } from '../types'

export function useStudentAttendance(
  studentId: string, 
  params?: AttendanceFilters,
  options?: Omit<UseQueryOptions<StudentAttendanceResponse, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ['attendance', 'student', studentId, params],
    queryFn: async () => {
      const response = await attendanceApi.getStudentAttendance(studentId, params)
      return response.data
    },
    enabled: !!studentId,
    ...options,
  })
}
