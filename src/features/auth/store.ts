import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from './types'

interface AuthState {
  isAuthenticated: boolean
  token: string | null
  user: User | null
  _hasHydrated: boolean
  setAuth: (token: string, user: User) => void
  setHasHydrated: (state: boolean) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      user: null,
      _hasHydrated: false,
      setAuth: (token, user) => {
        set({ token, user, isAuthenticated: true })
      },
      setHasHydrated: (state) => {
        set({ _hasHydrated: state })
      },
      logout: () => {
        set({ token: null, user: null, isAuthenticated: false })
      },
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    },
  ),
)
