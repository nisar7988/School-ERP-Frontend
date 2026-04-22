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
import type { AttendanceWithStudent, AttendanceStatus } from '../types'

import { TakeAttendancePage } from './TakeAttendancePage'

import { useSearch } from '@tanstack/react-router'

export function AttendancePage() {
  const user = useAuthStore((state) => state.user)
  const isAdmin = user?.role === Role.ADMIN
  const search = useSearch({ from: '/_teacher/teacher/attendance' })
  const initialClassId = search.classId
  
  const [view, setView] = useState<'history' | 'take'>(initialClassId ? 'take' : 'history')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<AttendanceStatus | undefined>()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState<AttendanceWithStudent | null>(null)

  const { data: records, isLoading } = useAttendance({
    search: searchQuery,
    status: statusFilter,
  })

  const { createAttendance, updateAttendance, deleteAttendance, isCreating, isUpdating } = useAttendanceMutations()

  const handleCreate = (data: any) => {
    createAttendance(data, {
      onSuccess: () => setIsFormOpen(false)
    })
  }

  const handleUpdate = (data: any) => {
    if (selectedRecord) {
      updateAttendance({ id: selectedRecord.id, data }, {
        onSuccess: () => {
          setIsFormOpen(false)
          setSelectedRecord(null)
        }
      })
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

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-brand-orange transition-colors" />
          <Input
            placeholder="Search by student name..."
            className="pl-12 h-14 rounded-3xl border-gray-100 bg-white shadow-sm focus:ring-brand-orange/10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          className="h-14 rounded-3xl gap-2 font-bold text-gray-600 bg-white shadow-sm px-6"
        >
          <Filter className="w-5 h-5 text-gray-400" /> Filters
        </Button>
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
          defaultValues={selectedRecord ? {
            date: new Date(selectedRecord.date).toISOString().split('T')[0],
            status: selectedRecord.status,
            remarks: selectedRecord.remarks,
            studentId: selectedRecord.studentId,
            classId: (selectedRecord as any).student?.classId,
          } : undefined}
        />
      </Dialog>
    </div>
  )
}
