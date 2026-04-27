import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import type {
  SchoolClassWithRelations,
  PaginatedMeta,
  ClassQuery,
} from '../types'
import { teachersApi } from '#/features/teachers/api/teachers.api'

export const useClassesByTeacher = (
  teacherId: string | undefined,
  params?: ClassQuery,
  options?: Omit<
    UseQueryOptions<
      { data: SchoolClassWithRelations[]; meta: PaginatedMeta },
      Error
    >,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery<
    { data: SchoolClassWithRelations[]; meta: PaginatedMeta },
    Error
  >({
    queryKey: ['classes', 'teacher', teacherId, params],
    queryFn: async () => {
      if (!teacherId)
        return { data: [], meta: { total: 0, page: 1, lastPage: 1, limit: 10 } }
      const response = await teachersApi.getClassesByTeacher()
      // Note: The current API might not support params for this endpoint yet, but we'll include them in the queryKey
      return response.data.data
    },
    enabled: !!teacherId,
    ...options,
  })
}
