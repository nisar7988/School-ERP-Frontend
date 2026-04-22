import React, { useState, useMemo } from 'react'
import {
  ClipboardCheck,
  ArrowLeft,
  Loader2,
  Save,
  Calendar as CalendarIcon,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useClassesByTeacher } from '@/features/classes/queries/useClassesByTeacher'
import { useStudents } from '@/features/students/queries/useStudents'
import { useAttendanceMutations } from '../hooks/useAttendanceMutations'
import { useAuthStore } from '@/features/auth/store'
import { AttendanceStatus } from '../types'
import { toast } from '@/lib/stores/toast.store'
import { useNavigate } from '@tanstack/react-router'

interface TakeAttendanceProps {
  onBack: () => void
  initialClassId?: string
}

export function TakeAttendancePage({
  onBack,
  initialClassId,
}: TakeAttendanceProps) {
  const user = useAuthStore((state) => state.user)
  const teacherId = user?.id
  const navigate = useNavigate()

  const [selectedClassId, setSelectedClassId] = useState<string>(
    initialClassId || '',
  )
  const [attendanceDate, setAttendanceDate] = useState<string>(
    new Date().toISOString().split('T')[0],
  )
  const [studentStatuses, setStudentStatuses] = useState<
    Record<string, AttendanceStatus>
  >({})
  const [remarks, setRemarks] = useState<Record<string, string>>({})

  // Fetch data
  const { data: classes, isLoading: isLoadingClasses } =
    useClassesByTeacher(teacherId)
  const { data: allStudents = [], isLoading: isLoadingStudents } = useStudents(
    { classId: selectedClassId },
    { enabled: !!selectedClassId },
  )
  const { bulkCreateAttendance, isBulkCreating } = useAttendanceMutations()

  React.useEffect(() => {
    const initialStatuses: Record<string, AttendanceStatus> = {}
    allStudents.forEach((student) => {
      initialStatuses[student.id] = AttendanceStatus.PRESENT
    })
    setStudentStatuses(initialStatuses)
  }, [allStudents])

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setStudentStatuses((prev) => ({ ...prev, [studentId]: status }))
  }

  const handleRemarkChange = (studentId: string, remark: string) => {
    setRemarks((prev) => ({ ...prev, [studentId]: remark }))
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
    } catch (error) {
      // Error handled in mutation toast
    }
  }

  if (isLoadingClasses || isLoadingStudents) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-brand-orange" />
        <p className="text-gray-500 font-medium">
          Loading class and student data...
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 font-sans pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-bold text-brand-orange hover:text-brand-orange/80 transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to History
          </button>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
            Take Attendance
            <ClipboardCheck className="w-8 h-8 text-brand-orange" />
          </h1>
          <p className="text-gray-500 font-semibold">
            Mark daily attendance for your students.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
              Select Class
            </label>
            <select
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              className="h-12 px-4 rounded-2xl border-gray-100 bg-white shadow-sm focus:ring-brand-orange/10 font-bold text-gray-700 min-w-[200px]"
            >
              <option value="">Choose Class</option>
              {classes?.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} - {c.section}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
              Date
            </label>
            <input
              type="date"
              value={attendanceDate}
              onChange={(e) => setAttendanceDate(e.target.value)}
              className="h-12 px-4 rounded-2xl border-gray-100 bg-white shadow-sm focus:ring-brand-orange/10 font-bold text-gray-700"
            />
          </div>
        </div>
      </div>

      {!selectedClassId ? (
        <div className="bg-white rounded-[2.5rem] p-12 text-center border-2 border-dashed border-gray-100 space-y-4">
          <div className="w-16 h-16 bg-brand-peach/30 rounded-full flex items-center justify-center mx-auto">
            <Users className="w-8 h-8 text-brand-orange" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">No Class Selected</h3>
          <p className="text-gray-500 max-w-xs mx-auto">
            Please select a class from the dropdown above to start taking
            attendance.
          </p>
        </div>
      ) : allStudents.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] p-12 text-center border-2 border-dashed border-gray-100 space-y-4">
          <h3 className="text-xl font-bold text-gray-900">No Students Found</h3>
          <p className="text-gray-500">
            This class doesn't seem to have any students assigned to it yet.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 overflow-hidden border border-gray-50">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-8 py-6 text-left text-xs font-extrabold text-gray-400 uppercase tracking-[0.2em]">
                    Student
                  </th>
                  <th className="px-8 py-6 text-center text-xs font-extrabold text-gray-400 uppercase tracking-[0.2em]">
                    Status
                  </th>
                  <th className="px-8 py-6 text-left text-xs font-extrabold text-gray-400 uppercase tracking-[0.2em]">
                    Remarks
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {allStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-gray-50/30 transition-colors group"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-brand-peach flex items-center justify-center font-bold text-brand-orange">
                          {student.user?.firstName?.[0] || '?'}
                          {student.user?.lastName?.[0] || ''}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 group-hover:text-brand-orange transition-colors">
                            {student.user?.firstName || 'Unknown'} {student.user?.lastName || 'Student'}
                          </p>
                          <p className="text-xs font-bold text-gray-400">
                            Roll: {student.rollNo || 'N/A'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-center gap-2 bg-gray-50 p-1.5 rounded-2xl w-fit mx-auto">
                        {Object.values(AttendanceStatus).map((status) => (
                          <button
                            key={status}
                            onClick={() =>
                              handleStatusChange(student.id, status)
                            }
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                              studentStatuses[student.id] === status
                                ? status === AttendanceStatus.PRESENT
                                  ? 'bg-green-500 text-white shadow-lg shadow-green-100'
                                  : status === AttendanceStatus.ABSENT
                                    ? 'bg-red-500 text-white shadow-lg shadow-red-100'
                                    : 'bg-orange-500 text-white shadow-lg shadow-orange-100'
                                : 'text-gray-400 hover:text-gray-600 hover:bg-white'
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <input
                        type="text"
                        placeholder="Add a note..."
                        value={remarks[student.id] || ''}
                        onChange={(e) =>
                          handleRemarkChange(student.id, e.target.value)
                        }
                        className="w-full bg-gray-50 border-transparent focus:border-brand-orange focus:bg-white rounded-xl h-10 px-4 text-sm font-medium transition-all"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-8 bg-gray-50/50 border-t border-gray-100 flex justify-between items-center">
            <div className="text-sm font-bold text-gray-500">
              Total Students:{' '}
              <span className="text-gray-900">{allStudents.length}</span>
            </div>
            <Button
              variant="brand"
              size="lg"
              onClick={handleSubmit}
              disabled={isBulkCreating}
              className="gap-2 h-14 px-10 rounded-2xl shadow-xl shadow-orange-100 font-bold text-base"
            >
              {isBulkCreating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Finalize Attendance
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
