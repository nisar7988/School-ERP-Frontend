import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import type { SchoolClassWithRelations } from '../types'
import { teachersApi } from '#/features/teachers/api/teachers.api'

export const useClassesByTeacher = (
  teacherId: string | undefined,
  options?: Omit<
    UseQueryOptions<SchoolClassWithRelations[], Error>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery<SchoolClassWithRelations[], Error>({
    queryKey: ['classes', 'teacher', teacherId],
    queryFn: async () => {
      if (!teacherId) return []
      const response = await teachersApi.getClassesByTeacher()
      return response.data.data
    },
    enabled: !!teacherId,
    ...options,
  })
}
