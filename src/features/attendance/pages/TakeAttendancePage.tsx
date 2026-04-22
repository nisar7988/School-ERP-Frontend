import React, { useState, useMemo, useRef, useEffect } from 'react'
import {
  ArrowLeft,
  Loader2,
  Save,
  ChevronDown,
  MessageSquare,
  CheckSquare,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useClassesByTeacher } from '@/features/classes/queries/useClassesByTeacher'
import { useStudents } from '@/features/students/queries/useStudents'
import { useAttendanceMutations } from '../hooks/useAttendanceMutations'
import { useAuthStore } from '@/features/auth/store'
import { AttendanceStatus } from '../types'
import { toast } from '@/lib/stores/toast.store'

interface TakeAttendanceProps {
  onBack: () => void
  initialClassId?: string
}

// Initials + color helper
const AVATAR_COLORS = [
  '#F28B50', '#5B9BD5', '#6CC070', '#9B72CF', '#E88ABB', '#4BC5B8',
]
function getAvatarColor(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + (hash << 5) - hash
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}
function getInitials(first: string, last: string) {
  return `${first?.[0] ?? ''}${last?.[0] ?? ''}`.toUpperCase()
}

// Toggle Switch component
function AttendanceToggle({
  checked,
  onChange,
}: {
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-200 focus:outline-none ${
        checked ? 'bg-green-500' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-200 ${
          checked ? 'translate-x-8' : 'translate-x-1'
        }`}
      />
    </button>
  )
}

// Dropdown for Late / Excused
function StatusDropdown({
  studentId,
  currentStatus,
  onSelect,
}: {
  studentId: string
  currentStatus: AttendanceStatus
  onSelect: (status: AttendanceStatus) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const isSpecial =
    currentStatus === AttendanceStatus.LATE ||
    currentStatus === AttendanceStatus.EXCUSED

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
          isSpecial
            ? 'bg-orange-100 text-orange-500 border border-orange-200'
            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
        }`}
      >
        <ChevronDown className="w-4 h-4" />
      </button>

      {open && (
        <div className="absolute right-0 top-10 z-50 w-28 bg-white rounded-xl shadow-xl border border-gray-100 py-1 overflow-hidden">
          {[AttendanceStatus.LATE, AttendanceStatus.EXCUSED].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                onSelect(s)
                setOpen(false)
              }}
              className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-50 ${
                currentStatus === s ? 'text-orange-500 font-bold' : 'text-gray-700'
              }`}
            >
              {s.charAt(0) + s.slice(1).toLowerCase()}
            </button>
          ))}
          {isSpecial && (
            <button
              type="button"
              onClick={() => {
                onSelect(AttendanceStatus.ABSENT)
                setOpen(false)
              }}
              className="w-full text-left px-4 py-2 text-sm font-medium text-gray-400 hover:bg-gray-50 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      )}
    </div>
  )
}

// Remark modal
function RemarkModal({
  studentName,
  value,
  onSave,
  onClose,
}: {
  studentName: string
  value: string
  onSave: (v: string) => void
  onClose: () => void
}) {
  const [text, setText] = useState(value)
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm space-y-4 mx-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-gray-900">Add Remark</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-sm text-gray-500">{studentName}</p>
        <textarea
          autoFocus
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a remark..."
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 resize-none"
        />
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={() => { onSave(text); onClose() }}
            className="px-4 py-2 text-sm font-bold bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export function TakeAttendancePage({
  onBack,
  initialClassId,
}: TakeAttendanceProps) {
  const user = useAuthStore((state) => state.user)
  const teacherId = user?.id

  const [selectedClassId, setSelectedClassId] = useState<string>(initialClassId || '')
  const [attendanceDate, setAttendanceDate] = useState<string>(
    new Date().toISOString().split('T')[0],
  )
  const [studentStatuses, setStudentStatuses] = useState<Record<string, AttendanceStatus>>({})
  const [remarks, setRemarks] = useState<Record<string, string>>({})
  const [remarkModal, setRemarkModal] = useState<{ id: string; name: string } | null>(null)

  const { data: classes, isLoading: isLoadingClasses } = useClassesByTeacher(teacherId)
  const { data: allStudents = [], isLoading: isLoadingStudents } = useStudents(
    { classId: selectedClassId },
    { enabled: !!selectedClassId },
  )
  const { bulkCreateAttendance, isBulkCreating } = useAttendanceMutations()

  // Init statuses when students load
  useEffect(() => {
    const init: Record<string, AttendanceStatus> = {}
    allStudents.forEach((s) => { init[s.id] = AttendanceStatus.PRESENT })
    setStudentStatuses(init)
  }, [allStudents])

  const selectedClass = useMemo(
    () => classes?.find((c) => c.id === selectedClassId),
    [classes, selectedClassId],
  )

  const markedPresentCount = useMemo(
    () => Object.values(studentStatuses).filter((s) => s === AttendanceStatus.PRESENT).length,
    [studentStatuses],
  )

  const formattedDate = useMemo(() => {
    const d = new Date(attendanceDate + 'T00:00:00')
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '/')
  }, [attendanceDate])

  const handleToggle = (studentId: string, isPresent: boolean) => {
    setStudentStatuses((prev) => ({
      ...prev,
      [studentId]: isPresent ? AttendanceStatus.PRESENT : AttendanceStatus.ABSENT,
    }))
  }

  const handleSpecialStatus = (studentId: string, status: AttendanceStatus) => {
    setStudentStatuses((prev) => ({ ...prev, [studentId]: status }))
  }

  const handleMarkAllPresent = () => {
    const all: Record<string, AttendanceStatus> = {}
    allStudents.forEach((s) => { all[s.id] = AttendanceStatus.PRESENT })
    setStudentStatuses(all)
  }

  const handleSubmit = async () => {
    if (!selectedClassId) {
      toast.error('Please select a class')
      return
    }
    const attendanceData = allStudents.map((student) => ({
      studentId: student.id,
      classId: selectedClassId,
      date: attendanceDate,
      status: studentStatuses[student.id] || AttendanceStatus.PRESENT,
      remarks: remarks[student.id] || '',
    }))
    try {
      await bulkCreateAttendance(attendanceData)
      onBack()
    } catch {
      // handled in mutation
    }
  }

  // Loading state
  if (isLoadingClasses) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
        <p className="text-gray-400 font-medium">Loading classes...</p>
      </div>
    )
  }

  return (
    <>
      {remarkModal && (
        <RemarkModal
          studentName={remarkModal.name}
          value={remarks[remarkModal.id] || ''}
          onSave={(v) => setRemarks((prev) => ({ ...prev, [remarkModal.id]: v }))}
          onClose={() => setRemarkModal(null)}
        />
      )}

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 font-sans pb-24 space-y-6">
        {/* ── Top bar ── */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          {/* Left: back + title */}
          <div className="space-y-1">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to History
            </button>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              {selectedClass
                ? `Attendance - ${selectedClass.name} ${selectedClass.section ?? ''} | ${formattedDate}`
                : 'Attendance'}
            </h1>
            <p className="text-sm text-gray-500">Mark presence for the class.</p>
          </div>

          {/* Right: class selector + date */}
          <div className="flex items-end gap-4 flex-shrink-0">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Select Class</span>
              <select
                value={selectedClassId}
                onChange={(e) => setSelectedClassId(e.target.value)}
                className="h-10 px-3 rounded-lg border border-gray-200 bg-white text-sm font-semibold text-gray-700 focus:outline-none focus:border-orange-400 min-w-[140px] shadow-sm"
              >
                <option value="">Choose Class</option>
                {classes?.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} {c.section ?? ''}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Date</span>
              <input
                type="date"
                value={attendanceDate}
                onChange={(e) => setAttendanceDate(e.target.value)}
                className="h-10 px-3 rounded-lg border border-gray-200 bg-white text-sm font-semibold text-gray-700 focus:outline-none focus:border-orange-400 shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* ── No class selected ── */}
        {!selectedClassId ? (
          <div className="bg-white rounded-2xl border-2 border-dashed border-gray-100 p-16 text-center space-y-3">
            <p className="text-gray-400 font-medium">Select a class above to start marking attendance.</p>
          </div>
        ) : isLoadingStudents ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
          </div>
        ) : allStudents.length === 0 ? (
          <div className="bg-white rounded-2xl border-2 border-dashed border-gray-100 p-16 text-center space-y-3">
            <p className="text-gray-600 font-semibold">No students found in this class.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* ── Mark All + Counter row ── */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <button
                type="button"
                onClick={handleMarkAllPresent}
                className="flex items-center gap-2 text-sm font-semibold text-gray-600 border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors"
              >
                <CheckSquare className="w-4 h-4 text-gray-500" />
                Mark All Present
              </button>
              <span className="text-sm font-semibold text-gray-500">
                Marked:{' '}
                <span className="text-gray-800 font-bold">
                  {markedPresentCount} of {allStudents.length}
                </span>
              </span>
            </div>

            {/* ── Student rows ── */}
            <ul className="divide-y divide-gray-100">
              {allStudents.map((student, idx) => {
                const firstName = student.user?.firstName ?? 'Unknown'
                const lastName = student.user?.lastName ?? ''
                const fullName = `${firstName} ${lastName}`.trim()
                const initials = getInitials(firstName, lastName)
                const avatarColor = getAvatarColor(fullName)
                const status = studentStatuses[student.id] ?? AttendanceStatus.PRESENT
                const isPresent = status === AttendanceStatus.PRESENT
                const isAbsent = status === AttendanceStatus.ABSENT
                const isSpecial = status === AttendanceStatus.LATE || status === AttendanceStatus.EXCUSED
                const hasRemark = !!remarks[student.id]

                return (
                  <li
                    key={student.id}
                    className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50/60 transition-colors"
                  >
                    {/* Avatar */}
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                      style={{ backgroundColor: avatarColor }}
                    >
                      {initials}
                    </div>

                    {/* Name + Roll */}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm leading-tight">{fullName}</p>
                      <p className="text-xs text-gray-400 font-medium">Roll {student.rollNo ?? idx + 1}</p>
                    </div>

                    {/* Present / Absent toggle */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span
                        className={`text-sm font-semibold transition-colors ${
                          isPresent || isSpecial ? 'text-gray-800' : 'text-gray-400'
                        }`}
                      >
                        Present
                      </span>

                      <AttendanceToggle
                        checked={isPresent || isSpecial}
                        onChange={(checked) => {
                          if (checked) {
                            handleToggle(student.id, true)
                          } else {
                            handleToggle(student.id, false)
                          }
                        }}
                      />

                      <span
                        className={`text-sm font-semibold transition-colors ${
                          isAbsent ? 'text-red-500' : 'text-gray-400'
                        }`}
                      >
                        Absent
                      </span>
                    </div>

                    {/* Late / Excused dropdown */}
                    <StatusDropdown
                      studentId={student.id}
                      currentStatus={status}
                      onSelect={(s) => handleSpecialStatus(student.id, s)}
                    />

                    {/* Remark icon */}
                    <button
                      type="button"
                      onClick={() => setRemarkModal({ id: student.id, name: fullName })}
                      title="Add remark"
                      className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
                        hasRemark
                          ? 'text-orange-500 bg-orange-50 border border-orange-200'
                          : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        )}

        {/* ── Sticky save button ── */}
        {selectedClassId && allStudents.length > 0 && (
          <div className="fixed bottom-6 right-6 z-40">
            <Button
              variant="brand"
              size="lg"
              onClick={handleSubmit}
              disabled={isBulkCreating}
              className="gap-2 h-13 px-8 rounded-2xl shadow-2xl shadow-orange-200 font-bold text-base"
            >
              {isBulkCreating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Attendance
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
