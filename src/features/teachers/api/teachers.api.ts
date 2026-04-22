import { apiClient as http } from '@/lib/http/client'
import type {
  Teacher,
  TeacherWithRelations,
  CreateTeacherDto,
  UpdateTeacherDto,
  PaginatedResponse,
  SingleResponse,
} from '../types'
import type { SchoolClassWithRelations } from '#/features/students/types'

export const teachersApi = {
  getTeachers: () =>
    http.get<PaginatedResponse<TeacherWithRelations>>('/teachers'),
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
