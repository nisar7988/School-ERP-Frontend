import { useQuery } from '@tanstack/react-query'
import { getMeService } from './services'
import { useAuthStore } from '../store'
// eslint-disable-next-line no-restricted-imports
import { useEffect } from 'react'

export const useMe = () => {
  const token = useAuthStore((state) => state.token)
  const query = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: getMeService,
    staleTime: Infinity,
    enabled: !!token,
  })

  const updateUser = useAuthStore((state) => state.updateUser)

  useEffect(() => {
    const serverUser = query.data
    const localUser = useAuthStore.getState().user

    if (serverUser && JSON.stringify(serverUser) !== JSON.stringify(localUser)) {
      updateUser(serverUser)
    }
  }, [query.data, updateUser])

  return query
}
