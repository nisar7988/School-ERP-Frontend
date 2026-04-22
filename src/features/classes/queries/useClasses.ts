import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import { classesApi } from '../api/classes.api'
import type { SchoolClassWithRelations } from '../types'

export const useClasses = (
  options?: Partial<UseQueryOptions<SchoolClassWithRelations[]>>,
) => {
  return useQuery<SchoolClassWithRelations[]>({
    queryKey: ['classes'],
    queryFn: async () => {
      const response = await classesApi.getClasses()
      return response.data.data.data
    },
    ...options,
  })
}
