import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTeacherService, updateTeacherService, deleteTeacherService } from './services'
import type { UpdateTeacherDto } from '../types'
import { toast } from '@/lib/stores/toast.store'

export const useCreateTeacher = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: createTeacherService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teachers'] })
      toast.success('Teacher profile created')
    },
  })
}

export const useUpdateTeacher = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTeacherDto }) =>
      updateTeacherService(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['teachers'] })
      queryClient.invalidateQueries({ queryKey: ['teachers', variables.id] })
      toast.success('Teacher profile updated')
    },
  })
}

export const useDeleteTeacher = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: deleteTeacherService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teachers'] })
      toast.success('Teacher profile deleted')
    },
  })
}
