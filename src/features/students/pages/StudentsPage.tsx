import { useState, useEffect } from "react";

import { Plus, Search, Filter, Loader2, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { StudentTable } from '../components/StudentTable'
import { useStudents } from '../api/queries'
import { Link } from '@tanstack/react-router'
import { useAuthStore } from '@/features/auth/store'
import { Role } from '@/features/auth/types'
import { useClasses, useClassesByTeacher } from '@/features/classes/api/queries'
import { Pagination } from '@/components/ui/Pagination'

export function StudentsPage() {
  const user = useAuthStore((state) => state.user)
  const isAdmin = user?.role === Role.ADMIN
  const isTeacher = user?.role === Role.TEACHER

  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery)
      setPage(1)
    }, 500)
    return () => clearTimeout(timer)
  }, [searchQuery])

  const [selectedClassId, setSelectedClassId] = useState('')

  const { data: adminClassesResponse, isLoading: adminClassesLoading } =
    useClasses({ limit: 100 }, { enabled: isAdmin })
  const { data: teacherClassesResponse, isLoading: teacherClassesLoading } =
    useClassesByTeacher(isTeacher ? user?.id : undefined, { limit: 100 })

  const adminClasses = adminClassesResponse?.data || []
  const teacherClasses = teacherClassesResponse?.data || []
  const classes = isAdmin ? adminClasses : teacherClasses

  useEffect(() => {
    if (classes.length > 0 && !selectedClassId) {
      setSelectedClassId(classes[0].id)
    }
  }, [classes, selectedClassId])

  const {
    data: studentsResponse,
    isLoading: studentsLoading,
    error: studentsError,
  } = useStudents(
    { search: debouncedSearch, page, classId: selectedClassId },
    { enabled: !!selectedClassId },
  )

  const students = studentsResponse?.data || []
  const meta = studentsResponse?.meta

  const isLoading =
    studentsLoading || (isAdmin ? adminClassesLoading : teacherClassesLoading)
  const error = studentsError

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center space-y-4">
        <div className="p-4 bg-red-50 rounded-full">
          <Filter className="w-10 h-10 text-red-500 opacity-50" />
        </div>
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-gray-900">
            Error loading students
          </h3>
          <p className="text-red-500 font-semibold font-sans">
            {error instanceof Error ? error.message : 'Please try again later.'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
            {isAdmin ? 'Students' : 'My Students'}
            <span className="text-sm font-bold bg-brand-peach text-brand-orange px-3 py-1 rounded-full uppercase tracking-widest">
              {meta?.total || 0} {isAdmin ? 'Total' : 'Assigned'}
            </span>
          </h1>
          <p className="text-gray-500 font-semibold font-sans">
            {isAdmin
              ? "Manage your atelier's student roster and academic records."
              : 'View and manage records for students in your assigned classes.'}
          </p>
        </div>

        {(isAdmin || isTeacher) && (
          <div className="flex items-center gap-3">
            <Link
              to={isAdmin ? '/students/create' : '/teacher/students/create'}
            >
              <Button
                variant="brand"
                className="gap-2 shadow-xl shadow-orange-100 font-bold"
              >
                <Plus className="w-5 h-5" /> Add New Student
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        <div className="relative flex-1 group w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-brand-orange transition-colors" />
          <Input
            placeholder="Search by name or admission number..."
            className="pl-12 h-14 rounded-3xl border-gray-100 bg-white shadow-sm focus:ring-brand-orange/10 font-sans"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <div className="relative min-w-[200px] w-full sm:w-auto">
            <select
              value={selectedClassId}
              onChange={(e) => {
                setSelectedClassId(e.target.value)
                setPage(1)
              }}
              className="w-full h-14 pl-5 pr-10 rounded-3xl border border-gray-100 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/10 font-bold text-gray-700 appearance-none cursor-pointer hover:border-brand-orange/30 transition-all"
            >
              <option value="">Select Class</option>
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} {c.section ?? ''}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>

          <Button
            variant="outline"
            className="h-14 rounded-3xl gap-2 font-bold text-gray-600 bg-white shadow-sm px-8"
          >
            <Filter className="w-5 h-5 text-gray-400" /> Filters
          </Button>
        </div>
      </div>

      {/* Loading state or Table */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-brand-orange" />
        </div>
      ) : (
        <div className="space-y-4">
          <StudentTable students={students} />
          {meta && meta.lastPage > 1 && (
            <Pagination
              currentPage={meta.page}
              lastPage={meta.lastPage}
              total={meta.total}
              limit={meta.limit}
              onPageChange={setPage}
            />
          )}
        </div>
      )}
    </div>
  )
}
