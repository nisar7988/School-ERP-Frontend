import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  createClassService,
  updateClassService,
  deleteClassService,
} from './services'
import type { UpdateClassDto } from '../types'
import { toast } from '@/lib/stores/toast.store'

export const useCreateClass = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createClassService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] })
      toast.success('Class created successfully')
    },
  })
}

export const useUpdateClass = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateClassDto }) =>
      updateClassService(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['classes'] })
      queryClient.invalidateQueries({ queryKey: ['classes', variables.id] })
      toast.success('Class updated successfully')
    },
  })
}

export const useDeleteClass = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteClassService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] })
      toast.success('Class deleted successfully')
    },
  })
}
