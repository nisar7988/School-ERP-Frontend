import { Calendar as CalendarIcon, MapPin, Video, Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useSchedulesByMe } from '@/features/schedule/api/queries'
import { Link } from '@tanstack/react-router'
import { Skeleton } from '@/components/ui/skeleton'
import { format, parseISO } from 'date-fns'

// Helper to convert startTime/endTime to a comparable number of minutes
const toMinutes = (t: string) => {
  if (!t) return 0
  let hours = 0
  let minutes = 0

  if (t.includes('T')) {
    const date = new Date(t)
    hours = date.getHours()
    minutes = date.getMinutes()
  } else {
    const [h, m] = t.split(':').map(Number)
    hours = h
    minutes = m
  }

  return hours * 60 + minutes
}

export function TodaySchedule() {
  const { data: schedules = [], isLoading } = useSchedulesByMe()

  const now = new Date()
  const currentDayName = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][
    now.getDay()
  ]
  const currentTotalMins = now.getHours() * 60 + now.getMinutes()

  // Filter for today's upcoming schedules and sort them by start time
  const upcomingSchedules = (Array.isArray(schedules) ? schedules : [])
    .filter((s: any) => s.dayOfWeek === currentDayName)
    .filter((s: any) => toMinutes(s.startTime) > currentTotalMins)
    .sort((a: any, b: any) => toMinutes(a.startTime) - toMinutes(b.startTime))
    .slice(0, 2)

  const formatDisplayTime = (timeStr: string) => {
    if (!timeStr) return { time: '--:--', period: '' }

    if (timeStr.includes('T')) {
      try {
        const date = parseISO(timeStr)
        return {
          time: format(date, 'h:mm'),
          period: format(date, 'a'),
        }
      } catch (e) {
        return { time: '--:--', period: '' }
      }
    }

    const [h, m] = timeStr.split(':').map(Number)
    if (isNaN(h) || isNaN(m)) return { time: '--:--', period: '' }

    const period = h >= 12 ? 'PM' : 'AM'
    const displayH = h % 12 || 12
    return {
      time: `${displayH}:${m.toString().padStart(2, '0')}`,
      period,
    }
  }

  if (isLoading) {
    return (
      <div className="bg-brand-taupe/10 border border-brand-taupe/20 rounded-[32px] p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-brand-orange">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <Skeleton className="h-6 w-32" />
          </div>
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-24 w-full rounded-2xl" />
          <Skeleton className="h-24 w-full rounded-2xl" />
        </div>
      </div>
    )
  }

  return (
    <div className="bg-brand-taupe/10 border border-brand-taupe/20 rounded-[32px] p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-brand-orange">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 display-title">
            Today's Schedule
          </h3>
        </div>
        <Link
          to="/student/schedule"
          className="text-sm font-bold text-brand-orange hover:underline underline-offset-4"
        >
          View Full Calendar
        </Link>
      </div>

      <div className="space-y-4">
        {upcomingSchedules.length > 0 ? (
          upcomingSchedules.map((item: any) => {
            const { time, period } = formatDisplayTime(item.startTime)
            const minsLeft = toMinutes(item.startTime) - currentTotalMins
            const statusLabel =
              minsLeft < 60
                ? `IN ${minsLeft} MINS`
                : `IN ${Math.floor(minsLeft / 60)} HRS`

            return (
              <div
                key={item.id}
                className="group flex items-center bg-white rounded-2xl p-6 shadow-sm border border-transparent hover:border-brand-taupe transition-all duration-300"
              >
                <div className="w-20 pr-6 border-r border-gray-100 flex flex-col items-center justify-center text-center">
                  <p className="text-lg font-extrabold text-gray-900 leading-none">
                    {time}
                  </p>
                  <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">
                    {period}
                  </p>
                </div>

                <div className="flex-1 pl-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h4 className="text-lg font-bold text-gray-900 group-hover:text-brand-orange transition-colors">
                        {item.subjectName ||
                          item.subject?.name ||
                          'Unnamed Class'}
                      </h4>
                      <div className="flex items-center gap-2 text-gray-400 font-medium">
                        {item.room?.toLowerCase().includes('online') ||
                        item.room?.toLowerCase().includes('virtual') ? (
                          <Video className="w-3.5 h-3.5 text-brand-orange" />
                        ) : (
                          <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                        )}
                        <span className="text-xs">{item.room || 'TBD'}</span>
                      </div>
                    </div>
                    {minsLeft < 180 && (
                      <Badge className="bg-brand-orange/10 text-brand-orange border-none font-extrabold text-[9px] px-3 py-1 rounded-full uppercase tracking-wider animate-pulse">
                        {statusLabel}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <div className="bg-white/50 rounded-2xl p-8 border border-dashed border-brand-taupe/30 flex flex-col items-center justify-center text-center space-y-2">
            <Clock className="w-8 h-8 text-brand-taupe/40" />
            <p className="text-sm font-bold text-gray-500">
              No more lectures for today
            </p>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">
              Great job! You're all caught up.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
