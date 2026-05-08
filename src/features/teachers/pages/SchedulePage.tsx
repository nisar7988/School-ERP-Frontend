import { useState } from 'react'
import { Lock, MessageSquare } from 'lucide-react'
import { useSchedule } from '../api/queries'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils/cn'

// ─── Class Card ───────────────────────────────────────────────────────────────
const ClassCard = ({ item }: { item: any }) => (
  <div className="bg-white rounded-[2rem] p-6 flex gap-6 items-start shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
    {/* Time block */}
    <div className="flex flex-col items-center min-w-[60px]">
      <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase">
        {item.label}
      </span>
      <span className="text-4xl font-black leading-none text-brand-orange font-serif">
        {item.startTime}
      </span>
      <span className="text-xs font-bold text-gray-400 uppercase">
        {item.period}
      </span>
    </div>

    {/* Content */}
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-2">
        <Badge
          variant="secondary"
          className="bg-brand-peach text-brand-orange border-none font-black text-[10px] px-3"
        >
          {item.section}
        </Badge>
        <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase">
          {item.room}
        </span>
      </div>
      <h3 className="text-xl font-black text-gray-900 leading-tight">
        {item.title}
      </h3>
      <p className="text-sm text-gray-400 font-medium italic mt-1">
        {item.topic}
      </p>

      {item.status === 'locked' ? (
        <div className="mt-4 flex items-center gap-2 text-gray-400 text-sm font-bold">
          <Lock size={14} />
          <span>Available at {item.lockedUntil}</span>
        </div>
      ) : null}
    </div>

    {/* Duration */}
    <div className="text-right flex-shrink-0">
      <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase block mb-1">
        DURATION
      </span>
      <span className="text-3xl font-black text-gray-800">
        {item.durationMins}
      </span>
      <span className="text-xs font-bold text-gray-400 block">Mins</span>
    </div>
  </div>
)

// ─── Priority Card ────────────────────────────────────────────────────────────
const PriorityCard = ({ item }: { item: any }) => (
  <div className="rounded-[2rem] p-6 flex items-center justify-between gap-6 bg-brand-orange text-white shadow-lg shadow-brand-orange/20 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-2">
        <MessageSquare size={14} className="text-orange-200" />
        <span className="text-[10px] font-black tracking-widest text-orange-200 uppercase">
          {item.label}
        </span>
      </div>
      <h3 className="text-2xl font-black leading-tight">{item.title}</h3>
      <p className="text-sm text-orange-100 mt-2 font-medium italic leading-relaxed">
        {item.topic}
      </p>
    </div>
    <div className="flex flex-col items-center gap-3 flex-shrink-0">
      <div className="text-center">
        <span className="text-[10px] font-bold text-orange-200 tracking-widest uppercase block mb-1">
          SCHEDULED
        </span>
        <span className="text-xl font-black leading-none">
          {item.startTime} —<br />
          {item.endTime}
        </span>
      </div>
    </div>
  </div>
)

// ─── Loading State ────────────────────────────────────────────────────────────
const LoadingState = () => (
  <div className="space-y-6 mt-8">
    <Skeleton className="h-40 w-full rounded-[2rem]" />
    <Skeleton className="h-32 w-full rounded-[2rem]" />
    <Skeleton className="h-36 w-full rounded-[2rem]" />
  </div>
)

export default function SchedulePage() {
  const { data: scheduleItems = [], isLoading, isError } = useSchedule()

  return (
    <div className=" bg-[#F7F3EF] pb-20">
      {/* ── Page Body ── */}
      <main className="max-w-4xl mx-auto px-6 py-10">
        {isLoading ? (
          <LoadingState />
        ) : isError ? (
          <div className="text-red-500 mt-20 text-center font-black text-xl">
            Failed to load timetable. Please try again.
          </div>
        ) : (
          <>
            <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-500">
              <h1 className="text-5xl font-black text-gray-900 tracking-tight leading-none">
                Weekly Schedule
              </h1>
              <p className="text-gray-400 font-bold text-lg italic mt-2">
                Your upcoming classes and meetings
              </p>
            </div>

            {/* Timetable List */}
            <div className="flex flex-col gap-6">
              {scheduleItems.map((item: any) =>
                item.type === 'priority' || item.type === 'meeting' ? (
                  <PriorityCard key={item.id} item={item} />
                ) : (
                  <ClassCard key={item.id} item={item} />
                ),
              )}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
