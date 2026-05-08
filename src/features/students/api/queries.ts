import { useQuery  } from '@tanstack/react-query'
import type {UseQueryOptions} from '@tanstack/react-query';
import { getStudentsService, getStudentService, getFeeDetailsService } from './services'
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

export const useFeeDetails = (studentId: string | undefined) => {
  return useQuery({
    queryKey: ['fees', studentId],
    queryFn: async () => {
      if (!studentId) return null
      const response = await getFeeDetailsService(studentId)
      return response.data.data
    },
    enabled: !!studentId,
  })
}
