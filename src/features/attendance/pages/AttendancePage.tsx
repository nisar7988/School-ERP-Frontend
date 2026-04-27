import React, { useState } from 'react'
import { ClipboardCheck, Plus, Search, Filter, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AttendanceTable } from '../components/AttendanceTable'
import { useAttendance } from '../queries/useAttendance'
import { useAttendanceMutations } from '../hooks/useAttendanceMutations'
import { useAuthStore } from '@/features/auth/store'
import { Role } from '@/features/auth/types'
import { Dialog } from '@/components/ui/Dialog'
import { AttendanceForm } from '../components/AttendanceForm'
import { type AttendanceWithStudent, AttendanceStatus } from '../types'
import { useClasses } from '@/features/classes/queries/useClasses'

import { TakeAttendancePage } from './TakeAttendancePage'

import { useSearch } from '@tanstack/react-router'

export function AttendancePage() {
  const user = useAuthStore((state) => state.user)
  const isAdmin = user?.role === Role.ADMIN
  const search = useSearch({ from: '/_teacher/teacher/attendance' })
  const initialClassId = search.classId
  const initialView = search.view

  const [view, setView] = useState<'history' | 'take'>(
    initialView || (initialClassId ? 'take' : 'history'),
  )
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<
    AttendanceStatus | undefined
  >(search.status as AttendanceStatus)
  const [classIdFilter, setClassIdFilter] = useState<string | undefined>(
    search.classId,
  )
  const [dateFilter, setDateFilter] = useState<string>('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] =
    useState<AttendanceWithStudent | null>(null)

  const { data: classes } = useClasses()

  const { data: records, isLoading } = useAttendance({
    search: searchQuery,
    status: statusFilter,
    classId: classIdFilter,
    date: dateFilter || undefined,
  })

  const {
    createAttendance,
    updateAttendance,
    deleteAttendance,
    isCreating,
    isUpdating,
  } = useAttendanceMutations()

  const handleCreate = (data: any) => {
    createAttendance(data, {
      onSuccess: () => setIsFormOpen(false),
    })
  }

  const handleUpdate = (data: any) => {
    if (selectedRecord) {
      updateAttendance(
        { id: selectedRecord.id, data },
        {
          onSuccess: () => {
            setIsFormOpen(false)
            setSelectedRecord(null)
          },
        },
      )
    }
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this attendance record?')) {
      deleteAttendance(id)
    }
  }

  if (view === 'take') {
    return (
      <div className="space-y-4">
        <TakeAttendancePage
          onBack={() => setView('history')}
          initialClassId={initialClassId}
        />
      </div>
    )
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
            Attendance
            <span className="text-sm font-bold bg-brand-peach text-brand-orange px-3 py-1 rounded-full uppercase tracking-widest">
              {records?.length || 0} Records
            </span>
          </h1>
          <p className="text-gray-500 font-semibold">
            Track and manage student daily attendance and participation.
          </p>
        </div>

        <Button
          variant="brand"
          onClick={() => setView('take')}
          className="gap-2 shadow-xl shadow-orange-100 font-bold h-12 px-6 rounded-2xl"
        >
          <ClipboardCheck className="w-5 h-5" /> Take Attendance
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative col-span-1 md:col-span-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-brand-orange transition-colors" />
          <Input
            placeholder="Search student..."
            className="pl-12 h-14 rounded-3xl border-gray-100 bg-white shadow-sm focus:ring-brand-orange/10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="relative group">
          <select
            className="w-full h-14 pl-4 pr-10 rounded-3xl border-gray-100 bg-white shadow-sm focus:ring-brand-orange/10 appearance-none font-sans font-medium text-gray-600 outline-none"
            value={classIdFilter || ''}
            onChange={(e) => setClassIdFilter(e.target.value || undefined)}
          >
            <option value="">All Classes</option>
            {classes?.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.name} - {cls.section}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <Filter className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div className="relative group">
          <select
            className="w-full h-14 pl-4 pr-10 rounded-3xl border-gray-100 bg-white shadow-sm focus:ring-brand-orange/10 appearance-none font-sans font-medium text-gray-600 outline-none"
            value={statusFilter || ''}
            onChange={(e) => setStatusFilter(e.target.value as AttendanceStatus || undefined)}
          >
            <option value="">All Statuses</option>
            {Object.values(AttendanceStatus).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <Filter className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div className="relative group">
          <Input
            type="date"
            className="h-14 rounded-3xl border-gray-100 bg-white shadow-sm focus:ring-brand-orange/10 font-sans font-medium text-gray-600"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-brand-orange" />
        </div>
      ) : (
        <AttendanceTable
          records={records || []}
          onEdit={(record) => {
            setSelectedRecord(record)
            setIsFormOpen(true)
          }}
          onDelete={handleDelete}
          isAdmin={isAdmin}
        />
      )}

      {/* Attendance Form Modal */}
      <Dialog
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={selectedRecord ? 'Edit Attendance' : 'Mark New Attendance'}
        variant="default"
      >
        <AttendanceForm
          onSubmit={selectedRecord ? handleUpdate : handleCreate}
          isLoading={isCreating || isUpdating}
          defaultValues={
            selectedRecord
              ? {
                  date: new Date(selectedRecord.date)
                    .toISOString()
                    .split('T')[0],
                  status: selectedRecord.status,
                  remarks: selectedRecord.remarks,
                  studentId: selectedRecord.studentId,
                  classId: (selectedRecord as any).student?.classId,
                }
              : undefined
          }
        />
      </Dialog>
    </div>
  )
}
