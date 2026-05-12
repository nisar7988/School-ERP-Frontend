import { MapPin, Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useSchedulesByTeacher } from '@/features/schedule/api/queries'
import { useAuthStore } from '@/features/auth/store'

export function TodaysClasses() {
  const user = useAuthStore((state) => state.user)
  const teacherId = user?.teacherProfile?.id
  const { data: schedules, isLoading } = useSchedulesByTeacher(teacherId || '')

  if (isLoading) {
    return (
      <Card className="h-full border border-gray-100 shadow-sm bg-white rounded-2xl p-6 flex items-center justify-center">
        <Loader2 className="w-7 h-7 animate-spin text-brand-orange" />
      </Card>
    )
  }

  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  const today = days[new Date().getDay()]
  const todaysSchedules = schedules?.filter((s) => s.dayOfWeek === today) || []

  const formatTime = (timeStr: string) => {
    if (!timeStr) return { time: '--:--', period: '' }
    const date = timeStr.includes('T') ? new Date(timeStr) : null

    if (date) {
      const hours = date.getHours()
      const displayHours = hours % 12 || 12
      const period = hours >= 12 ? 'PM' : 'AM'
      const minutes = date.getMinutes().toString().padStart(2, '0')
      return { time: `${displayHours}:${minutes}`, period }
    }

    const [h, m] = timeStr.split(':')
    const hourNum = parseInt(h)
    const displayHour = hourNum % 12 || 12
    const period = hourNum >= 12 ? 'PM' : 'AM'
    return { time: `${displayHour}:${m}`, period }
  }

  return (
    <Card className="h-full border border-gray-100 shadow-sm bg-white rounded-2xl p-6">
      <CardHeader className="p-0 mb-5 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-bold text-gray-900">
          Today's Classes
        </CardTitle>
        <Button
          variant="link"
          className="text-brand-orange font-semibold hover:no-underline px-0 text-sm h-auto"
        >
          View All
        </Button>
      </CardHeader>
      <CardContent className="p-0 space-y-3">
        {todaysSchedules.length === 0 ? (
          <div className="text-center py-10 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
            <p className="text-sm font-bold text-gray-400 italic">
              No classes scheduled for today
            </p>
          </div>
        ) : (
          todaysSchedules.map((item: any, idx: any) => {
            const { time, period } = formatTime(item.startTime)
            return (
              <div
                key={item.id}
                className="bg-gray-50/60 rounded-2xl p-4 hover:shadow-sm transition-all duration-200 border border-gray-100/50 group text-left"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex gap-3">
                    <div className="w-14 h-14 bg-white rounded-xl flex flex-col items-center justify-center border border-gray-100 shrink-0 shadow-sm group-hover:border-brand-orange/30 transition-colors">
                      <span className="text-sm font-black text-gray-900 leading-none">
                        {time}
                      </span>
                      <span className="text-[10px] font-black text-brand-orange uppercase tracking-tight mt-0.5">
                        {period}
                      </span>
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="font-black text-gray-900 text-base leading-tight">
                        {item.subject?.name || item.subjectName}
                      </h3>
                      <p className="text-xs font-bold text-gray-500">
                        {item.class?.name} - {item.class?.section}
                      </p>
                      <div className="flex items-center gap-1.5 text-gray-400 text-[10px] font-bold uppercase tracking-wider mt-1">
                        <MapPin className="w-3 h-3" />
                        {item.room}
                      </div>
                    </div>
                  </div>
                </div>
                {idx === 0 && (
                  <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
                    <Button
                      size="sm"
                      className="rounded-lg font-black bg-brand-orange text-white hover:bg-brand-orange/90 h-8 px-4 text-xs shadow-md shadow-orange-100 transition-all"
                    >
                      Take Attendance
                    </Button>
                  </div>
                )}
              </div>
            )
          })
        )}
      </CardContent>
    </Card>
  )
}
