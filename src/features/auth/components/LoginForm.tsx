import { useState } from 'react'
import {
  GraduationCap,
  Mail,
  Lock,
  Building2,
  KeyRound,
  Loader2,
  Eye,
  EyeOff,
} from 'lucide-react'
import { useLogin } from '../queries/useLogin'
import { toast } from '@/lib/stores/toast.store'

export const LoginForm = () => {
  const { mutate, isPending, error } = useLogin()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim() || !password.trim()) {
      toast.error('Please enter both email and password')
      return
    }

    mutate({ email, password })
  }

  return (
    <div className="flex h-[100vh] flex-col items-center justify-center w-full max-w-lg px-4 mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header section */}
      <div className="flex flex-col items-center space-y-3 text-center">
        <div className="flex items-center space-x-3">
          <GraduationCap
            className="w-10 h-10 text-brand-orange"
            strokeWidth={2.5}
          />
          <h1 className="display-title text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Academic Atelier
          </h1>
        </div>
        <p className="text-gray-600 font-medium">
          Sign in to your scholarly sanctuary.
        </p>
      </div>

      {/* Main Form Card */}
      <div className="w-full p-8 bg-white border border-gray-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] rounded-[2.5rem] sm:p-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-gray-700 ml-1">
              Email address
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none transition-colors group-focus-within:text-brand-orange text-gray-400">
                <Mail className="w-5 h-5" />
              </div>
              <input
                type="email"
                className="block w-full pl-11 pr-4 py-3.5 bg-brand-peach border-transparent rounded-2xl text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-brand-orange focus:bg-white transition-all outline-none text-base border"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-gray-700 ml-1">
              Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none transition-colors group-focus-within:text-brand-orange text-gray-400">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                className="block w-full pl-11 pr-12 py-3.5 bg-brand-peach border-transparent rounded-2xl text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-brand-orange focus:bg-white transition-all outline-none text-base border"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-brand-orange transition-colors cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between px-1">
            <label className="flex items-center space-x-2 cursor-pointer group">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  className="peer appearance-none w-5 h-5 border-2 border-brand-peach bg-brand-peach rounded-full checked:bg-brand-orange checked:border-brand-orange transition-all cursor-pointer"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 pointer-events-none">
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                    <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                  </svg>
                </div>
              </div>
              <span className="text-sm font-semibold text-gray-600 group-hover:text-gray-900 transition-colors">
                Remember me
              </span>
            </label>
            <a
              href="#"
              className="text-sm font-bold text-brand-orange hover:text-brand-orange-hover transition-colors"
            >
              Forgot your password?
            </a>
          </div>

          {error && (
            <div className="p-3 text-sm font-medium text-red-600 bg-red-50 rounded-xl border border-red-100">
              {error.message}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="group relative w-full flex items-center justify-center py-4 px-6 bg-brand-orange hover:bg-brand-orange-hover disabled:bg-opacity-70 text-white text-base font-bold rounded-2xl shadow-lg shadow-orange-200 active:scale-[0.98] transition-all cursor-pointer overflow-hidden"
          >
            {isPending ? (
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
            ) : null}
            {isPending ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-4 text-gray-400 font-bold tracking-widest">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center space-x-2 px-4 py-3.5 bg-brand-taupe hover:bg-brand-taupe-hover text-gray-800 font-bold rounded-2xl transition-all active:scale-95 cursor-pointer">
            <Building2 className="w-5 h-5 text-brand-orange" />
            <span>Institution</span>
          </button>
          <button className="flex items-center justify-center space-x-2 px-4 py-3.5 bg-brand-taupe hover:bg-brand-taupe-hover text-gray-800 font-bold rounded-2xl transition-all active:scale-95 cursor-pointer">
            <KeyRound className="w-5 h-5 text-brand-orange" />
            <span>SSO Portal</span>
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-500 font-medium">
        Need access?{' '}
        <a href="#" className="text-brand-orange font-bold hover:underline">
          Contact your administrator
        </a>
      </p>
    </div>
  )
}
