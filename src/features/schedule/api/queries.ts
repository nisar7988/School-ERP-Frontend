import { useQuery } from '@tanstack/react-query';
import { getSchedulesService } from './services';
import type { ScheduleQueryFilters } from '../types';

export const useSchedules = (params?: ScheduleQueryFilters) => {
  return useQuery({
    queryKey: ['schedules', params],
    queryFn: async () => {
      const response = await getSchedulesService(params);
      return response.data.data;
    },
  });
};
