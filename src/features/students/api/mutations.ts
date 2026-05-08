import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createStudentService, updateStudentService, deleteStudentService } from './services'
import type { UpdateStudentDto } from '../types'
import { toast } from '@/lib/stores/toast.store'

export const useCreateStudent = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: createStudentService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
      toast.success('Student profile created')
    },
  })
}

export const useUpdateStudent = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateStudentDto }) =>
      updateStudentService(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
      queryClient.invalidateQueries({ queryKey: ['students', variables.id] })
      toast.success('Student profile updated')
    },
  })
}

export const useDeleteStudent = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: deleteStudentService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
      toast.success('Student profile deleted')
    },
  })
}
