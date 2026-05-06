import { apiClient as http } from '@/lib/http/client'
import type { 
  AttendanceWithStudent, 
  CreateAttendanceDto, 
  UpdateAttendanceDto,
  AttendanceFilters,
  StudentAttendanceResponse
} from '../types'
import type { Attendance, PaginatedResponse, SingleResponse } from '@/types/base.types'

export const attendanceApi = {
  getAttendance: (params?: AttendanceFilters) =>
    http.get<PaginatedResponse<AttendanceWithStudent>>('/attendance', { params }),
    
  getAttendanceById: (id: string) =>
    http.get<SingleResponse<AttendanceWithStudent>>(`/attendance/${id}`),
    
  createAttendance: (data: CreateAttendanceDto) =>
    http.post<SingleResponse<Attendance>>('/attendance', data),
    
  updateAttendance: (id: string, data: UpdateAttendanceDto) =>
    http.patch<SingleResponse<Attendance>>(`/attendance/${id}`, data),
    
  deleteAttendance: (id: string) =>
    http.delete<SingleResponse<void>>(`/attendance/${id}`),

  getStudentAttendance: (studentId: string, params?: AttendanceFilters) =>
    http.get<StudentAttendanceResponse>(
      `/attendance/student/${studentId}`,
      { params },
    ),
}
