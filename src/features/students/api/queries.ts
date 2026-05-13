import { useQuery  } from '@tanstack/react-query'
import type {UseQueryOptions} from '@tanstack/react-query';
import { getStudentsService, getStudentService } from './services'
import type { StudentQuery, StudentWithRelations } from '../types'
import type { PaginatedData, PaginatedMeta } from '@/types/base.types'

export const useStudents = (
  params?: StudentQuery,
  options?: Omit<
    UseQueryOptions<PaginatedData<StudentWithRelations>, Error>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery<PaginatedData<StudentWithRelations>, Error>({
    queryKey: ['students', params],
    queryFn: async () => {
      const response = await getStudentsService(params)
      return response.data.data
    },
    ...options,
  })
}

export const useStudent = (id: string | undefined) => {
  return useQuery({
    queryKey: ['students', id],
    queryFn: async () => {
      if (!id) return null
      const response = await getStudentService(id)
      return response.data.data
    },
    enabled: !!id,
  })
}
