import { useQuery } from '@tanstack/react-query'
import { getMeService } from './services'

export const useMe = () => {
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: getMeService,
    staleTime: Infinity, // Keep user data valid as it usually doesn't change often
  })
}
