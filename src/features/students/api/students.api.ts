import { apiClient as http } from '@/lib/http/client'
import type {
  Student,
  StudentWithRelations,
  CreateStudentDto,
  UpdateStudentDto,
  PaginatedResponse,
  SingleResponse,
  StudentQuery,
} from '../types'

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
