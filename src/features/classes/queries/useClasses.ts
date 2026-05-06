import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import { classesApi } from '../api/classes.api'
import type { SchoolClassWithRelations, ClassQuery } from '../types'
import type { PaginatedMeta } from '@/types/base.types'

export const useClasses = (
  params?: ClassQuery,
  options?: Partial<UseQueryOptions<{ data: SchoolClassWithRelations[]; meta: PaginatedMeta }>>,
) => {
  return useQuery<{ data: SchoolClassWithRelations[]; meta: PaginatedMeta }>({
    queryKey: ['classes', params],
    queryFn: async () => {
      const response = await classesApi.getClasses(params)
      return response.data.data
    },
    ...options,
  })
}
