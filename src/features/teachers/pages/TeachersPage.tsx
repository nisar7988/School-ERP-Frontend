import React from 'react'
import { Plus, Search, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TeacherTable } from '../components/TeacherTable'
import { useTeachers } from '../hooks/useTeacherMutations'
import { Link } from '@tanstack/react-router'

export function TeachersPage() {
  const { data: teachersResponse, isLoading, error } = useTeachers()
  const [searchQuery, setSearchQuery] = React.useState('')

  const teachers = teachersResponse?.data?.data || []

  const filteredTeachers = React.useMemo(() => {
    return teachers.filter(
      (t) =>
        `${t.user.firstName} ${t.user.lastName}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        t.employeeId.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [teachers, searchQuery])

  if (error) {
    return (
      <div className="flex items-center justify-center h-96 text-red-500 font-semibold bg-red-50/50 rounded-[2.5rem] border border-red-100 italic">
        Error loading faculty data. Please check your connection and try again.
      </div>
    )
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
            Faculty
            <span className="text-sm font-bold bg-brand-peach text-brand-orange px-3 py-1 rounded-full uppercase tracking-widest">
              {teachers.length} Total
            </span>
          </h1>
          <p className="text-gray-500 font-semibold italic">
            Manage your atelier's expert educators and academic staff.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/faculty/create">
            <Button
              variant="brand"
              className="gap-2 shadow-xl shadow-orange-100 h-12 px-6 rounded-2xl font-bold"
            >
              <Plus className="w-5 h-5" /> Onboard Faculty
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-brand-orange transition-colors" />
          <Input
            placeholder="Search by name, email, or employee ID..."
            className="pl-12 h-14 rounded-3xl border-gray-100 bg-white shadow-sm focus:ring-brand-orange/10 font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          className="h-14 rounded-3xl gap-2 font-bold text-gray-600 bg-white shadow-sm px-6 border-gray-100 hover:border-brand-taupe transition-all"
        >
          <Filter className="w-5 h-5" /> Filters
        </Button>
      </div>

      {/* Loading state or Table */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-24 bg-gray-50/50 rounded-[2rem] animate-pulse border border-gray-100 shadow-sm"
            />
          ))}
        </div>
      ) : (
        <TeacherTable teachers={filteredTeachers} />
      )}
    </div>
  )
}
