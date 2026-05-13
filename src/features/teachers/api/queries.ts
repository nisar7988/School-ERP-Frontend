import { useQuery } from '@tanstack/react-query'
import type { UseQueryOptions } from '@tanstack/react-query'
import { getTeachersService, getTeacherService } from './services'
import type { TeacherQuery, TeacherWithRelations } from '../types'
import type { PaginatedData, PaginatedMeta } from '@/types/base.types'

export const useTeachers = (
  params?: TeacherQuery,
  options?: Omit<
    UseQueryOptions<PaginatedData<TeacherWithRelations>, Error>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery<PaginatedData<TeacherWithRelations>, Error>({
    queryKey: ['teachers', params],
    queryFn: async () => {
      const response = await getTeachersService(params)
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
      const response = await getTeacherService(id)
      return response.data.data
    },
    enabled: !!id,
  })
}

