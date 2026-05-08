import { useState } from 'react'
import { User, MapPin, Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils/cn'
import { Calendar as ShadCalendar } from '@/components/ui/calendar'
import { useSchedule } from '../api/queries'
import { Skeleton } from '@/components/ui/skeleton'

export function SchedulePage() {
  const [view, setView] = useState<'daily' | 'weekly'>('daily')
  const [date, setDate] = useState<Date | undefined>(new Date(2024, 9, 14))
  
  const { data, isLoading } = useSchedule()

  if (isLoading || !data) {
    return <ScheduleLoading />
  }

  return (
    <div className="flex gap-8 p-10 bg-[#FAF9F7] min-h-screen font-sans text-gray-900 animate-in fade-in duration-700">
      {/* ── LEFT: Timeline ── */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-[40px] font-bold tracking-tight display-title text-gray-900 leading-tight">
              Academic Timeline
            </h1>
            <p className="text-gray-500 font-semibold mt-1">
              Today is {data.today}
            </p>
          </div>
          {/* Toggle */}
          <div className="flex bg-white rounded-full p-1 border border-gray-200 shadow-sm gap-1">
            {(['daily', 'weekly'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={cn(
                  'px-6 py-2 rounded-full text-sm font-bold transition-all duration-200 capitalize',
                  view === v
                    ? 'bg-brand-orange text-white shadow-md'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50',
                )}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="flex flex-col gap-0">
          {data.timeline.map((event) => (
            <TimeRow
              key={event.id}
              time={event.time}
              isCurrent={event.isCurrent}
            >
              {event.type === 'class' ? (
                <EventCard
                  label={event.label!}
                  title={event.title}
                  timeRange={event.timeRange!}
                  professor={event.professor!}
                  location={event.location!}
                  variant={event.variant as 'default' | 'active'}
                  ongoing={event.ongoing}
                />
              ) : (
                <div className="bg-gray-50 border border-dashed border-gray-200 rounded-2xl py-6 px-8 text-center text-gray-400 font-bold tracking-[0.2em] text-[10px] uppercase">
                  {event.title}
                </div>
              )}
            </TimeRow>
          ))}
        </div>
      </div>

      {/* ── RIGHT: Sidebar panels ── */}
      <div className="w-[340px] shrink-0 flex flex-col gap-8">
        {/* Mini Calendar */}
        <div className="bg-white rounded-[32px] p-4 border border-gray-100 shadow-sm flex justify-center">
          <ShadCalendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border-none w-full"
            classNames={{
              months: 'w-full',
              month: 'w-full space-y-4',
              caption: 'flex justify-center pt-1 relative items-center mb-4',
              caption_label: 'text-sm font-bold display-title',
              nav: 'space-x-1 flex items-center',
              nav_button: cn(
                'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 transition-opacity',
              ),
              nav_button_previous: 'absolute left-1',
              nav_button_next: 'absolute right-1',
              table: 'w-full border-collapse space-y-1',
              head_row: 'flex w-full justify-between',
              head_cell:
                'text-gray-400 rounded-md w-9 font-black text-[10px] uppercase tracking-widest',
              row: 'flex w-full mt-2 justify-between',
              cell: 'text-center text-sm p-0 relative focus-within:relative focus-within:z-20',
              day: cn(
                'h-9 w-9 p-0 font-bold aria-selected:opacity-100 rounded-full transition-all hover:bg-brand-orange/10 hover:text-brand-orange',
              ),
              day_selected:
                'bg-brand-orange text-white hover:bg-brand-orange hover:text-white focus:bg-brand-orange focus:text-white shadow-lg shadow-brand-orange/20',
              day_today: 'bg-brand-taupe/10 text-gray-900',
              day_outside: 'text-gray-300 opacity-50',
              day_disabled: 'text-gray-300 opacity-50',
              day_range_middle:
                'aria-selected:bg-accent aria-selected:text-accent-foreground',
              day_hidden: 'invisible',
            }}
          />
        </div>
      </div>
    </div>
  )
}

function ScheduleLoading() {
  return (
    <div className="flex gap-8 p-10 bg-[#FAF9F7] min-h-screen font-sans">
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between mb-8">
          <div className="space-y-3">
            <Skeleton className="h-12 w-64" />
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="h-10 w-48 rounded-full" />
        </div>

        <div className="space-y-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-6">
              <Skeleton className="h-6 w-16 mt-4" />
              <div className="flex flex-col items-center pt-5 shrink-0">
                <Skeleton className="w-3 h-3 rounded-full" />
                <Skeleton className="w-[2px] flex-1 mt-2 min-h-[40px]" />
              </div>
              <Skeleton className="flex-1 h-32 rounded-[24px]" />
            </div>
          ))}
        </div>
      </div>
      <div className="w-[340px] shrink-0">
        <Skeleton className="h-[350px] rounded-[32px]" />
      </div>
    </div>
  )
}

function TimeRow({
  time,
  isCurrent = false,
  children,
}: {
  time: string
  isCurrent?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex gap-6 mb-2 group">
      {/* Time label */}
      <div className="w-20 shrink-0 pt-4 text-right">
        {isCurrent ? (
          <Badge className="bg-brand-orange text-white border-none font-bold">
            {time}
          </Badge>
        ) : (
          <span className="text-gray-400 text-sm font-bold tracking-tight">
            {time}
          </span>
        )}
      </div>

      {/* Vertical line + dot */}
      <div className="flex flex-col items-center pt-5 shrink-0">
        <div
          className={cn(
            'w-3 h-3 rounded-full border-2 transition-all duration-300',
            isCurrent
              ? 'bg-brand-orange border-brand-orange ring-4 ring-brand-orange/20'
              : 'border-gray-200 bg-white',
          )}
        />
        <div
          className={cn(
            'w-[2px] flex-1 mt-2 min-h-[40px] transition-colors duration-300',
            isCurrent
              ? 'bg-gradient-to-b from-brand-orange to-gray-200'
              : 'bg-gray-200',
          )}
        />
      </div>

      {/* Card container */}
      <div className="flex-1 pb-10">{children}</div>
    </div>
  )
}

function EventCard({
  label,
  title,
  timeRange,
  professor,
  location,
  variant,
  ongoing,
}: {
  label: string
  title: string
  timeRange: string
  professor: string
  location: string
  variant: 'default' | 'active'
  ongoing?: boolean
}) {
  const isActive = variant === 'active'

  return (
    <div
      className={cn(
        'rounded-[24px] p-6 transition-all duration-300 cursor-pointer group/card',
        isActive
          ? 'bg-brand-orange text-white shadow-xl shadow-brand-orange/25'
          : 'bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-brand-taupe',
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <span
          className={cn(
            'text-[10px] font-extrabold tracking-[0.2em] uppercase',
            isActive ? 'text-white/80' : 'text-brand-orange',
          )}
        >
          {label}
        </span>
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'flex items-center gap-1.5 text-xs font-bold',
              isActive ? 'text-white/90' : 'text-gray-500',
            )}
          >
            <Clock className="w-3.5 h-3.5" />
            {timeRange}
          </div>
          {ongoing && (
            <Badge className="bg-white/20 text-white border-none text-[9px] font-black uppercase tracking-widest animate-pulse">
              Ongoing
            </Badge>
          )}
        </div>
      </div>

      <h3 className="text-xl font-bold mb-6 leading-tight">{title}</h3>

      <div className="flex items-center gap-6 text-sm font-semibold">
        <div
          className={cn(
            'flex items-center gap-2',
            isActive ? 'text-white/80' : 'text-gray-400',
          )}
        >
          <User className="w-4 h-4" />
          {professor}
        </div>
        <div
          className={cn(
            'flex items-center gap-2',
            isActive ? 'text-white/80' : 'text-gray-400',
          )}
        >
          <MapPin className="w-4 h-4" />
          {location}
        </div>
      </div>
    </div>
  )
}
