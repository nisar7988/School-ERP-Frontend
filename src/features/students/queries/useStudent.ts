import { useQuery } from '@tanstack/react-query';
import { studentsApi } from '../api/students.api';

export const useStudent = (id: string, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ['students', id],
    queryFn: async () => {
      const response = await studentsApi.getStudent(id);
      return response.data.data;
    },
    enabled: options?.enabled !== false && !!id,
  });
};
