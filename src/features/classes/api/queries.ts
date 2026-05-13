import { useQuery  } from '@tanstack/react-query'
import type {UseQueryOptions} from '@tanstack/react-query';
import { getClassesService, getClassService, getAcademicYearsService } from './services'
import type { ClassQuery, SchoolClassWithRelations } from '../types'
import type { PaginatedMeta } from '@/types/base.types'
import { getClassesByTeacherService } from '@/features/teachers/api/services'

export const useClasses = (
  params?: ClassQuery,
  options?: Omit<
    UseQueryOptions<{ data: SchoolClassWithRelations[]; meta: PaginatedMeta }, Error>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery<{ data: SchoolClassWithRelations[]; meta: PaginatedMeta }, Error>({
    queryKey: ['classes', params],
    queryFn: async () => {
      const response = await getClassesService(params)
      return response.data.data || response.data
    },
    ...options,
  })
}

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
      const response = await getClassesByTeacherService(params)
      return response.data.data
    },
    enabled: !!teacherId,
    ...options,
  })
}

export const useClass = (id: string | undefined) => {
  return useQuery({
    queryKey: ['classes', id],
    queryFn: async () => {
      if (!id) return null
      const response = await getClassService(id)
      return response.data.data
    },
    enabled: !!id,
  })
}

export const useAcademicYears = () => {
  return useQuery({
    queryKey: ['academic-years'],
    queryFn: async () => {
      const response = await getAcademicYearsService()
      return response.data.data
    },
  })
}
