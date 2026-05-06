import { apiClient as http } from '@/lib/http/client'
import type {
  SchoolClassWithRelations,
  CreateClassDto,
  UpdateClassDto,
  ClassQuery,
} from '../types'
import type { SchoolClass, PaginatedResponse, SingleResponse } from '@/types/base.types'

export const classesApi = {
  getClasses: (params?: ClassQuery) =>
    http.get<PaginatedResponse<SchoolClassWithRelations>>('/classes', { params }),
  getClass: (id: string) =>
    http.get<SingleResponse<SchoolClassWithRelations>>(`/classes/${id}`),
  createClass: (data: CreateClassDto) =>
    http.post<SingleResponse<SchoolClass>>('/classes', data),
  updateClass: (id: string, data: UpdateClassDto) =>
    http.put<SingleResponse<SchoolClass>>(`/classes/${id}`, data),
  deleteClass: (id: string) => http.delete(`/classes/${id}`),
}
