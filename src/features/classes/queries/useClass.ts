import { useQuery } from '@tanstack/react-query';
import { classesApi } from '../api/classes.api';

export const useClass = (id: string, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ['classes', id],
    queryFn: async () => {
      const response = await classesApi.getClass(id);
      return response.data.data;
    },
    enabled: options?.enabled !== false && !!id,
  });
};
