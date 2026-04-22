import { useMutation, useQueryClient } from '@tanstack/react-query';
import { studentsApi } from '../api/students.api';
import { useNavigate } from '@tanstack/react-router';
import { toast } from '@/lib/stores/toast.store';

export const useCreateStudent = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: studentsApi.createStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      toast.success('Student enrolled successfully');
      navigate({ to: '/students' });
    },
  });
};

export const useUpdateStudent = (id: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: any) => studentsApi.updateStudent(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      queryClient.invalidateQueries({ queryKey: ['students', id] });
      toast.success('Student details updated');
      navigate({ to: '/students' });
    },
  });
};

export const useDeleteStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: studentsApi.deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      toast.success('Student record removed');
    },
  });
};
