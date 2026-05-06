import { apiClient as http } from '@/lib/http/client'
import type {
  StudentWithRelations,
  CreateStudentDto,
  UpdateStudentDto,
  StudentQuery,
} from '../types'
import type { Student, PaginatedResponse, SingleResponse } from '@/types/base.types'

export const studentsApi = {
  getStudents: (params?: StudentQuery) =>
    http.get<PaginatedResponse<StudentWithRelations>>('/students', { params }),
  getStudent: (id: string) =>
    http.get<SingleResponse<StudentWithRelations>>(`/students/${id}`),
  createStudent: (data: CreateStudentDto) =>
    http.post<SingleResponse<Student>>('/students', data),
  updateStudent: (id: string, data: UpdateStudentDto) =>
    http.patch<SingleResponse<Student>>(`/students/${id}`, data),
  deleteStudent: (id: string) => http.delete(`/students/${id}`),
}
