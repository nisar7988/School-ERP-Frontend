import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import { teachersApi } from '../api/teachers.api'
import type { TeacherQuery, TeacherWithRelations } from '../types'
import type { PaginatedMeta } from '@/types/base.types'

export const useTeachers = (
  params?: TeacherQuery,
  options?: Omit<
    UseQueryOptions<{ data: TeacherWithRelations[]; meta: PaginatedMeta }, Error>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery<{ data: TeacherWithRelations[]; meta: PaginatedMeta }, Error>({
    queryKey: ['teachers', params],
    queryFn: async () => {
      const response = await teachersApi.getTeachers(params)
      return response.data.data
    },
    ...options,
  })
}

export const useTeacher = (id: string | undefined) => {
  return useQuery({
    queryKey: ['teachers', id],
    queryFn: async () => {
      if (!id) return null
      const response = await teachersApi.getTeacher(id)
      return response.data.data
    },
    enabled: !!id,
  })
}
