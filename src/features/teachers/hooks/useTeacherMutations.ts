import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { teachersApi } from '../api/teachers.api';
import type { CreateTeacherDto, UpdateTeacherDto } from '../types';
import { toast } from '@/lib/stores/toast.store';

export const useTeacherMutations = () => {
  const queryClient = useQueryClient();

  const createTeacher = useMutation({
    mutationFn: (data: CreateTeacherDto) => teachersApi.createTeacher(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teachers'] });
      toast.success('Teacher profile created');
    },
  });

  const updateTeacher = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTeacherDto }) =>
      teachersApi.updateTeacher(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['teachers'] });
      queryClient.invalidateQueries({ queryKey: ['teachers', variables.id] });
      toast.success('Teacher profile updated');
    },
  });

  const deleteTeacher = useMutation({
    mutationFn: (id: string) => teachersApi.deleteTeacher(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teachers'] });
      toast.success('Teacher profile deleted');
    },
  });

  return {
    createTeacher,
    updateTeacher,
    deleteTeacher,
  };
};
