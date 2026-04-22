import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import { studentsApi } from '../api/students.api'
import type { StudentQuery, StudentWithRelations } from '../types'

export const useStudents = (
  params?: StudentQuery,
  options?: Omit<
    UseQueryOptions<StudentWithRelations[], Error>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery<StudentWithRelations[], Error>({
    queryKey: ['students', params],
    queryFn: async () => {
      const response = await studentsApi.getStudents(params)
      return response.data.data.data
    },
    ...options,
  })
}
