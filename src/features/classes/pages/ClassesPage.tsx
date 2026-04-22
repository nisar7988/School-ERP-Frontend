import React from 'react'
import { Plus, Search, Filter, Loader2, GraduationCap } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ClassTable } from '../components/ClassTable'
import { useClasses } from '../queries/useClasses'
import { useAuthStore } from '@/features/auth/store'
import { Role } from '@/features/auth/types'
import { useClassesByTeacher } from '../queries/useClassesByTeacher'
import type { SchoolClassWithRelations } from '../types'

export function ClassesPage() {
  const user = useAuthStore((state) => state.user)
  const isAdmin = user?.role === Role.ADMIN
  const isTeacher = user?.role === Role.TEACHER
  console.log('teacher', isTeacher)

  const {
    data: adminClasses,
    isLoading: adminLoading,
    error: adminError,
  } = useClasses({ enabled: isAdmin })

  const {
    data: teacherClasses,
    isLoading: teacherLoading,
    error: teacherError,
  } = useClassesByTeacher(isTeacher ? user?.id : undefined)
  const [searchQuery, setSearchQuery] = React.useState('')

  const classesResponse = isAdmin ? adminClasses : teacherClasses
  const isLoading = isAdmin ? adminLoading : teacherLoading
  const error = adminError || teacherError

  const filteredClasses = React.useMemo(() => {
    if (!classesResponse) return []

    return classesResponse.filter(
      (cls: SchoolClassWithRelations) =>
        cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cls.section.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [classesResponse, searchQuery])

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center space-y-4">
        <div className="p-4 bg-red-50 rounded-full">
          <Filter className="w-10 h-10 text-red-500 opacity-50" />
        </div>
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-gray-900">
            Error loading classes
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
            {isAdmin ? 'Classes' : 'My Assigned Classes'}
            <span className="text-sm font-bold bg-brand-peach text-brand-orange px-3 py-1 rounded-full uppercase tracking-widest">
              {filteredClasses.length} {isAdmin ? 'Total' : 'Assigned'}
            </span>
          </h1>
          <p className="text-gray-500 font-semibold font-sans">
            {isAdmin
              ? 'Define and manage academic classes, sections, and class teachers.'
              : 'Overview of the classes and sections you are currently managing.'}
          </p>
        </div>

        {isAdmin && (
          <div className="flex items-center gap-3">
            <Link to="/classes/create">
              <Button
                variant="brand"
                className="gap-2 shadow-xl shadow-orange-100 font-bold"
              >
                <Plus className="w-5 h-5" /> Add New Class
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-brand-orange transition-colors" />
          <Input
            placeholder="Search classes by name or section..."
            className="pl-12 h-14 rounded-3xl border-gray-100 bg-white shadow-sm focus:ring-brand-orange/10 font-sans"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          className="h-14 rounded-3xl gap-2 font-bold text-gray-600 bg-white shadow-sm"
        >
          <Filter className="w-5 h-5 text-gray-400" /> Filters
        </Button>
      </div>

      {/* Loading state or Table */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-brand-orange" />
        </div>
      ) : (
        <ClassTable classes={filteredClasses} />
      )}
    </div>
  )
}
