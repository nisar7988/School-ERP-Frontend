import { Calendar, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/features/auth/store'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export function TeacherHero() {
  const user = useAuthStore((state) => state.user)
  const greeting = getGreeting()
  const displayName = user?.firstName ? `Dr. ${user.firstName}` : 'Dr. Aris'

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
          {greeting}, {displayName}.
        </h1>
        <p className="text-base font-medium text-gray-500">
          Here is an overview of your schedule and classes for today.
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <Button
          variant="outline"
          className="h-11 px-5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-800 font-semibold transition-all text-sm"
        >
          <Calendar className="w-4 h-4 mr-2 text-gray-500" />
          View Calendar
        </Button>
        <Button
          variant="brand"
          className="h-11 px-5 rounded-xl shadow-md shadow-orange-100 font-semibold text-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Announcement
        </Button>
      </div>
    </div>
  )
}
