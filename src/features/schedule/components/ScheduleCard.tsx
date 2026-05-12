import { Edit2, Trash2 } from 'lucide-react'
import type { ScheduleItem } from '../types'

interface ScheduleCardProps {
  item: ScheduleItem
  viewMode: 'class' | 'teacher'
  onEdit?: (item: ScheduleItem) => void
  onDelete?: (id: string) => void
  isCurrent?: boolean
}

export const ScheduleCard = ({
  item,
  viewMode,
  onEdit,
  onDelete,
  isCurrent,
}: ScheduleCardProps) => {
  const formatTime = (timeStr: string) => {
    if (!timeStr) return ''
    if (timeStr.includes('T')) {
      return new Date(timeStr).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
    }
    return timeStr
  }

  const subjectName = item.subject?.name || item.subjectName
  const teacherName = item.teacher
    ? `${item.teacher.user.firstName} ${item.teacher.user.lastName}`
    : item.teacherName
  const className = item.class
    ? `${item.class.name} - ${item.class.section}`
    : item.className

  const secondaryLabel = viewMode === 'class' ? teacherName : className
  const avatarChar = secondaryLabel?.charAt(0) ?? '?'

  return (
    <div
      className={`
        group relative flex flex-col gap-2 rounded-xl p-3 h-full
        border transition-all duration-200
        ${
          isCurrent
            ? 'bg-brand-orange border-brand-orange text-white shadow-md shadow-brand-orange/20'
            : 'bg-white border-gray-100 hover:border-brand-orange/30 hover:shadow-sm'
        }
      `}
    >
      {/* Top row: subject + badge */}
      <div className="flex items-start justify-between gap-2">
        <h4
          className={`text-sm font-bold leading-tight truncate ${
            isCurrent ? 'text-white' : 'text-gray-900'
          }`}
        >
          {subjectName}
        </h4>

        {isCurrent ? (
          <span className="shrink-0 text-[9px] font-bold tracking-wide bg-white/20 text-white px-1.5 py-0.5 rounded-md">
            LIVE
          </span>
        ) : (
          <span className="shrink-0 text-[10px] font-semibold text-brand-orange bg-brand-peach/60 px-1.5 py-0.5 rounded-md">
            {item.room}
          </span>
        )}
      </div>

      {/* Time */}
      <p
        className={`text-[10px] font-medium tabular-nums ${
          isCurrent ? 'text-orange-100' : 'text-gray-400'
        }`}
      >
        {formatTime(item.startTime)} — {formatTime(item.endTime)}
      </p>

      {/* Teacher / Class row */}
      <div className="flex items-center gap-1.5 mt-auto">
        <div
          className={`
            w-5 h-5 rounded-full flex items-center justify-center
            text-[9px] font-bold shrink-0
            ${isCurrent ? 'bg-white/20 text-white' : 'bg-brand-peach text-brand-orange'}
          `}
        >
          {avatarChar}
        </div>
        <span
          className={`text-[10px] font-medium truncate ${
            isCurrent ? 'text-orange-100' : 'text-gray-500'
          }`}
        >
          {secondaryLabel}
        </span>
      </div>

      {/* Hover actions — bottom-right, never overlap content */}
      {(onEdit || onDelete) && (
        <div className="absolute bottom-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          {onEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onEdit(item)
              }}
              title="Edit"
              className="p-1 rounded bg-white shadow text-gray-400 hover:text-brand-orange transition-colors"
            >
              <Edit2 size={11} />
            </button>
          )}
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onDelete(item.id)
              }}
              title="Delete"
              className="p-1 rounded bg-white shadow text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 size={11} />
            </button>
          )}
        </div>
      )}
    </div>
  )
}
