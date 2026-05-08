import { useQuery } from '@tanstack/react-query'
import { getScheduleService } from './services'

export const useSchedule = () => {
  return useQuery({
    queryKey: ['schedule'],
    queryFn: getScheduleService,
  })
}
