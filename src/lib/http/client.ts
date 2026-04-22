import axios from 'axios'
import { useAuthStore } from '@/features/auth/store'
import { toast } from '@/lib/stores/toast.store'

// Base API configuration
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://192.168.1.194:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to attach JWT token
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor for handling global errors (e.g., 401 Unauthorized)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const isLoginRequest = error.config?.url?.includes('/auth/login')
      
      if (!isLoginRequest) {
        useAuthStore.getState().logout()
        // Force redirect to login page only on the client
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/login'
        }
      } else {
        // Still show the error for login failures (e.g. invalid credentials)
        const message = error.response?.data?.message || 'Invalid email or password'
        toast.error(message)
      }
    } else {
      // Handle other errors globally
      const message = error.response?.data?.message || error.message || 'An unexpected error occurred'
      toast.error(message)
    }
    return Promise.reject(error)
  },
)
