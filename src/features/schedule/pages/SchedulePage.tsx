import { useSchedulesByMe } from '@/features/schedule/api/queries'
import { WeeklyTimetable } from '@/features/schedule/components/WeeklyTimetable'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuthStore } from '@/features/auth/store'
import { Role } from '@/features/auth/types'

export function SchedulePage() {
  const { data: schedules, isLoading, isError } = useSchedulesByMe()
  const user = useAuthStore((state) => state.user)

  const title = user?.role === Role.TEACHER ? 'Professional Timetable' : 'My Academic Schedule'
  const subtitle = user?.role === Role.TEACHER 
    ? 'Manage and view your academic commitments for the week.'
    : 'View your weekly class timetable and subject sessions.'

  return (
    <div className="bg-[#FDFBF9] min-h-screen">
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-500">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight leading-none text-left">
            {title}
          </h1>
          <p className="text-gray-500 font-bold mt-2 italic text-left">
            {subtitle}
          </p>
        </div>

        {isLoading ? (
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
            <Skeleton className="h-10 w-48 rounded-xl" />
            <div className="grid grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5].map(i => (
                <Skeleton key={i} className="h-[400px] rounded-2xl" />
              ))}
            </div>
          </div>
        ) : isError ? (
          <div className="text-center py-20 bg-red-50 rounded-[2.5rem] border border-red-100">
            <p className="text-xl font-black text-red-500">Failed to load schedule. Please try again.</p>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <WeeklyTimetable
              schedules={schedules || []}
              viewMode={user?.role === Role.TEACHER ? 'teacher' : 'class'}
            />
          </div>
        )}
      </main>
    </div>
  )
}
