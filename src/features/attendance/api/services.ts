import { apiClient as http } from '@/lib/http/client'
import { ATTENDANCE_ROUTES } from './routes'
import type { 
  AttendanceWithStudent, 
  CreateAttendanceDto, 
  UpdateAttendanceDto,
  AttendanceFilters,
  StudentAttendanceResponse
} from '../types'
import type { Attendance, PaginatedResponse, SingleResponse } from '@/types/base.types'

export const getAttendanceService = (params?: AttendanceFilters) =>
  http.get<PaginatedResponse<AttendanceWithStudent>>(ATTENDANCE_ROUTES.BASE, { params });

export const getAttendanceByIdService = (id: string) =>
  http.get<SingleResponse<AttendanceWithStudent>>(ATTENDANCE_ROUTES.BY_ID(id));

export const createAttendanceService = (data: CreateAttendanceDto) =>
  http.post<SingleResponse<Attendance>>(ATTENDANCE_ROUTES.BASE, data);

export const updateAttendanceService = (id: string, data: UpdateAttendanceDto) =>
  http.patch<SingleResponse<Attendance>>(ATTENDANCE_ROUTES.BY_ID(id), data);

export const deleteAttendanceService = (id: string) =>
  http.delete<SingleResponse<void>>(ATTENDANCE_ROUTES.BY_ID(id));

export const getStudentAttendanceService = (studentId: string, params?: AttendanceFilters) =>
  http.get<StudentAttendanceResponse>(
    ATTENDANCE_ROUTES.BY_STUDENT(studentId),
    { params },
  );
