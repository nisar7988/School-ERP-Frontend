import { apiClient as http } from '@/lib/http/client'
import type {
  TeacherWithRelations,
  CreateTeacherDto,
  UpdateTeacherDto,
  TeacherQuery,
} from '../types'
import type { Teacher, PaginatedResponse, SingleResponse } from '@/types/base.types'
import type { SchoolClassWithRelations } from '@/features/classes/types'

export const teachersApi = {
  getTeachers: (params?: TeacherQuery) =>
    http.get<PaginatedResponse<TeacherWithRelations>>('/teachers', { params }),
  getTeacher: (id: string) =>
    http.get<SingleResponse<TeacherWithRelations>>(`/teachers/${id}`),
  createTeacher: (data: CreateTeacherDto) =>
    http.post<SingleResponse<Teacher>>('/teachers', data),
  updateTeacher: (id: string, data: UpdateTeacherDto) =>
    http.patch<SingleResponse<Teacher>>(`/teachers/${id}`, data),
  deleteTeacher: (id: string) => http.delete(`/teachers/${id}`),
  getClassesByTeacher: () =>
    http.get<PaginatedResponse<SchoolClassWithRelations>>(`/teachers/classes`),
}
