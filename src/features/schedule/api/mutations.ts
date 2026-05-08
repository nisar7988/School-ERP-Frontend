import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createScheduleService, updateScheduleService, deleteScheduleService } from './services';
import { toast } from '@/lib/stores/toast.store';
import type { UpdateScheduleDto } from '../types';

export const useCreateSchedule = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createScheduleService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
      toast.success('Schedule created successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create schedule');
    }
  });
};

export const useUpdateSchedule = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateScheduleDto }) => updateScheduleService(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
      toast.success('Schedule updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update schedule');
    }
  });
};

export const useDeleteSchedule = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteScheduleService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
      toast.success('Schedule deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete schedule');
    }
  });
};
