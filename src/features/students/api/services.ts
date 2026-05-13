import { apiClient as http } from '@/lib/http/client'
import { STUDENT_ROUTES } from './routes'
import type {
  StudentWithRelations,
  CreateStudentDto,
  UpdateStudentDto,
  StudentQuery,
} from '../types'
import type {
  Student,
  PaginatedResponse,
  SingleResponse,
} from '@/types/base.types'

export const getStudentsService = (params?: StudentQuery) =>
  http.get<PaginatedResponse<StudentWithRelations>>(STUDENT_ROUTES.BASE, {
    params,
  })

export const getStudentService = (id: string) =>
  http.get<SingleResponse<StudentWithRelations>>(STUDENT_ROUTES.BY_ID(id))

export const createStudentService = (data: CreateStudentDto) =>
  http.post<SingleResponse<Student>>(STUDENT_ROUTES.BASE, data)

export const updateStudentService = (id: string, data: UpdateStudentDto) =>
  http.patch<SingleResponse<Student>>(STUDENT_ROUTES.BY_ID(id), data)

export const deleteStudentService = (id: string) =>
  http.delete(STUDENT_ROUTES.BY_ID(id))

