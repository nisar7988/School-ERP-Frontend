import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import { studentsApi } from '../api/students.api'
import type { StudentQuery, StudentWithRelations } from '../types'
import type { PaginatedMeta } from '@/types/base.types'

export const useStudents = (
  params?: StudentQuery,
  options?: Omit<
    UseQueryOptions<{ data: StudentWithRelations[]; meta: PaginatedMeta }, Error>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery<{ data: StudentWithRelations[]; meta: PaginatedMeta }, Error>({
    queryKey: ['students', params],
    queryFn: async () => {
      const response = await studentsApi.getStudents(params)
      return response.data.data
    },
    ...options,
  })
}
