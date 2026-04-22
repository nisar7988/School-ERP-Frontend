import { MapPin, Loader2, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useClassesByTeacher } from '../../../classes/queries/useClassesByTeacher'
import { useAuthStore } from '@/features/auth/store'

// Mock schedule times for demo — in real life these come from the schedule API
const classSchedules = [
  { time: '09:00', period: 'AM', room: 'Room 4B, Science Wing', urgency: 'In 30 mins' },
  { time: '11:30', period: 'AM', room: 'Lab 2, Research Center', urgency: null },
]

export function TodaysClasses() {
  const user = useAuthStore((state) => state.user)
  const { data: myClasses = [], isLoading } = useClassesByTeacher(user?.id)

  if (isLoading) {
    return (
      <Card className="h-full border border-gray-100 shadow-sm bg-white rounded-2xl p-6 flex items-center justify-center">
        <Loader2 className="w-7 h-7 animate-spin text-brand-orange" />
      </Card>
    )
  }

  const displayClasses = myClasses.length > 0 ? myClasses : []

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
        {displayClasses.length === 0 ? (
          /* Fallback: show demo cards from the design */
          <>
            {classSchedules.map((sched, i) => (
              <DemoClassCard key={i} schedule={sched} showButtons={i === 0} />
            ))}
          </>
        ) : (
          displayClasses.map((cls, idx) => {
            const sched = classSchedules[idx] || classSchedules[0]
            return (
              <div
                key={cls.id}
                className="bg-gray-50/60 rounded-xl p-4 hover:shadow-sm transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex gap-3">
                    {/* Time block */}
                    <div className="w-14 h-14 bg-white rounded-xl flex flex-col items-center justify-center border border-gray-100 shrink-0">
                      <span className="text-sm font-bold text-gray-900 leading-none">{sched.time}</span>
                      <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-tight mt-0.5">{sched.period}</span>
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="font-bold text-gray-900 text-base leading-tight">{cls.name}</h3>
                      <div className="flex items-center gap-1.5 text-gray-500 text-xs font-medium">
                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                        {sched.room}
                      </div>
                    </div>
                  </div>
                  {sched.urgency && (
                    <Badge className="bg-orange-50 text-brand-orange border border-orange-100 px-2.5 py-1 font-semibold text-[11px] rounded-lg shrink-0">
                      {sched.urgency}
                    </Badge>
                  )}
                </div>
                {idx === 0 && (
                  <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
                    <Button
                      size="sm"
                      className="rounded-lg font-semibold bg-brand-orange text-white hover:bg-brand-orange/90 h-8 px-4 text-xs shadow-sm shadow-orange-100"
                    >
                      Take Attendance
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-lg font-semibold bg-white text-gray-600 border-gray-200 hover:bg-gray-50 h-8 px-4 text-xs"
                    >
                      Resources
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

function DemoClassCard({
  schedule,
  showButtons,
}: {
  schedule: { time: string; period: string; room: string; urgency: string | null }
  showButtons: boolean
}) {
  const className = showButtons ? 'Advanced Physics 301' : 'Quantum Mechanics 405'
  return (
    <div className="bg-gray-50/60 rounded-xl p-4 hover:shadow-sm transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex gap-3">
          <div className="w-14 h-14 bg-white rounded-xl flex flex-col items-center justify-center border border-gray-100 shrink-0">
            <span className="text-sm font-bold text-gray-900 leading-none">{schedule.time}</span>
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-tight mt-0.5">{schedule.period}</span>
          </div>
          <div className="space-y-0.5">
            <h3 className="font-bold text-gray-900 text-base leading-tight">{className}</h3>
            <div className="flex items-center gap-1.5 text-gray-500 text-xs font-medium">
              <MapPin className="w-3.5 h-3.5 text-gray-400" />
              {schedule.room}
            </div>
          </div>
        </div>
        {schedule.urgency && (
          <Badge className="bg-orange-50 text-brand-orange border border-orange-100 px-2.5 py-1 font-semibold text-[11px] rounded-lg shrink-0">
            <Clock className="w-3 h-3 mr-1 inline-block" />
            {schedule.urgency}
          </Badge>
        )}
      </div>
      {showButtons && (
        <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
          <Button
            size="sm"
            className="rounded-lg font-semibold bg-brand-orange text-white hover:bg-brand-orange/90 h-8 px-4 text-xs shadow-sm shadow-orange-100"
          >
            Take Attendance
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-lg font-semibold bg-white text-gray-600 border-gray-200 hover:bg-gray-50 h-8 px-4 text-xs"
          >
            Resources
          </Button>
        </div>
      )}
    </div>
  )
}
