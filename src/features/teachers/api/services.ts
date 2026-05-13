import { apiClient as http } from '@/lib/http/client'
import { TEACHER_ROUTES } from './routes'
import type {
  TeacherWithRelations,
  CreateTeacherDto,
  UpdateTeacherDto,
  TeacherQuery,
} from '../types'
import type {
  Teacher,
  PaginatedResponse,
  SingleResponse,
} from '@/types/base.types'
import type { SchoolClassWithRelations } from '@/features/classes/types'

export const getTeachersService = (params?: TeacherQuery) =>
  http.get<PaginatedResponse<TeacherWithRelations>>(TEACHER_ROUTES.BASE, {
    params,
  })

export const getTeacherService = (id: string) =>
  http.get<SingleResponse<TeacherWithRelations>>(TEACHER_ROUTES.BY_ID(id))

export const createTeacherService = (data: CreateTeacherDto) =>
  http.post<SingleResponse<Teacher>>(TEACHER_ROUTES.BASE, data)

export const updateTeacherService = (id: string, data: UpdateTeacherDto) =>
  http.patch<SingleResponse<Teacher>>(TEACHER_ROUTES.BY_ID(id), data)

export const deleteTeacherService = (id: string) =>
  http.delete(TEACHER_ROUTES.BY_ID(id))

export const getClassesByTeacherService = (params?: any) =>
  http.get<PaginatedResponse<SchoolClassWithRelations>>(TEACHER_ROUTES.CLASSES, { params })

