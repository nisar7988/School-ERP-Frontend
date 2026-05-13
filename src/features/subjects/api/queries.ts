import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getSubjectsService,
  createSubjectService,
  updateSubjectService,
  deleteSubjectService,
} from './services'
import type { SubjectQuery, UpdateSubjectDto, Subject } from '../types'
import type { PaginatedData } from '@/types/base.types'
import { toast } from '@/lib/stores/toast.store'

export const useSubjects = (params?: SubjectQuery) => {
  return useQuery<PaginatedData<Subject>, Error>({
    queryKey: ['subjects', params],
    queryFn: async () => {
      const response = await getSubjectsService(params)
      return response.data.data
    },
  })
}

export const useCreateSubject = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createSubjectService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subjects'] })
      queryClient.invalidateQueries({ queryKey: ['classes'] })
      toast.success('Subject created successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create subject')
    },
  })
}

export const useUpdateSubject = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSubjectDto }) =>
      updateSubjectService(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['subjects'] })
      queryClient.invalidateQueries({ queryKey: ['subjects', variables.id] })
      toast.success('Subject updated successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update subject')
    },
  })
}

export const useDeleteSubject = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteSubjectService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subjects'] })
      toast.success('Subject deleted successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete subject')
    },
  })
}
