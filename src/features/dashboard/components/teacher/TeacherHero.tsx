import { Calendar, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/features/auth/store'

export function TeacherHero() {
  const user = useAuthStore((state) => state.user)

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
          Welcome Back!, {user?.firstName || 'Teacher'}.
        </h1>
        <p className="text-lg font-medium text-gray-500">
          Here is an overview of your schedule and classes for today.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          className="h-12 px-6 rounded-2xl border-2 border-brand-peach bg-brand-peach/5 hover:bg-brand-peach/10 text-gray-900 font-bold transition-all"
        >
          <Calendar className="w-5 h-5 mr-2 text-brand-orange" />
          View Calendar
        </Button>
        <Button
          variant="brand"
          className="h-12 px-6 rounded-2xl shadow-lg shadow-orange-100 font-bold"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Announcement
        </Button>
      </div>
    </div>
  )
}
