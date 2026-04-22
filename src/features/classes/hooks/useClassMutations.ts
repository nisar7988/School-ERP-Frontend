import { useMutation, useQueryClient } from '@tanstack/react-query';
import { classesApi } from '../api/classes.api';
import { useNavigate } from '@tanstack/react-router';
import type { CreateClassDto, UpdateClassDto } from '../types';
import { toast } from '@/lib/stores/toast.store';

export const useCreateClass = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: CreateClassDto) => classesApi.createClass(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] });
      toast.success('Class created successfully');
      // We can either navigate or just close a modal. 
      // For now, let's just invalidate and let the UI handle the rest.
    },
  });
};

export const useUpdateClass = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateClassDto) => classesApi.updateClass(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] });
      queryClient.invalidateQueries({ queryKey: ['classes', id] });
      toast.success('Class updated successfully');
    },
  });
};

export const useDeleteClass = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => classesApi.deleteClass(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] });
      toast.success('Class deleted successfully');
    },
  });
};
