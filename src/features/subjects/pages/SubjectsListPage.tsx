import { useEffect, useState } from 'react'
import { BookOpen, Plus, Search, Filter, Edit2, Trash2 } from 'lucide-react'
import { useSubjects, useDeleteSubject } from '../api/queries'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SubjectModal } from '../components/SubjectModal'
import { Badge } from '@/components/ui/badge'
import type { SubjectWithClass } from '../types'

export function SubjectsListPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSubject, setSelectedSubject] =
    useState<SubjectWithClass | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery)
    }, 500)
    return () => clearTimeout(timer)
  }, [searchQuery])

  const { data: subjectsData, isLoading } = useSubjects({
    search: debouncedSearch,
  })
  const subjects = subjectsData?.data || []
  const { mutate: deleteSubject } = useDeleteSubject()

  const handleEdit = (subject: SubjectWithClass) => {
    setSelectedSubject(subject)
    setIsModalOpen(true)
  }

  const handleAdd = () => {
    setSelectedSubject(null)
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this subject?')) {
      deleteSubject(id)
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
            <BookOpen className="w-10 h-10 text-brand-orange" />
            Subjects
          </h1>
          <p className="text-gray-500 font-semibold italic">
            Manage your school's curriculum and academic courses.
          </p>
        </div>

        <Button
          onClick={handleAdd}
          className="h-14 px-8 rounded-2xl font-black text-lg bg-brand-orange hover:bg-orange-600 text-white shadow-xl shadow-orange-100 transition-all flex items-center gap-2 group"
        >
          <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
          Add Subject
        </Button>
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 space-y-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search subjects by name or code..."
              className="pl-12 h-14 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all text-sm font-bold"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            className="h-14 w-14 rounded-2xl border-gray-100 text-gray-400"
          >
            <Filter className="w-6 h-6" />
          </Button>
        </div>

        <div className="overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-50">
                <th className="pb-4 font-black text-gray-400 text-[10px] tracking-widest uppercase">
                  Subject
                </th>
                <th className="pb-4 font-black text-gray-400 text-[10px] tracking-widest uppercase">
                  Code
                </th>
                <th className="pb-4 font-black text-gray-400 text-[10px] tracking-widest uppercase">
                  Class
                </th>
                <th className="pb-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="py-6">
                      <div className="h-4 w-32 bg-gray-100 rounded" />
                    </td>
                    <td className="py-6">
                      <div className="h-4 w-20 bg-gray-100 rounded" />
                    </td>
                    <td className="py-6">
                      <div className="h-4 w-24 bg-gray-100 rounded" />
                    </td>
                    <td className="py-6" />
                  </tr>
                ))
              ) : subjects?.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="py-20 text-center text-gray-400 font-bold italic"
                  >
                    No subjects found.
                  </td>
                </tr>
              ) : (
                subjects?.map((subject: SubjectWithClass) => (
                  <tr
                    key={subject.id}
                    className="group hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="py-6">
                      <span className="font-black text-gray-900">
                        {subject.name}
                      </span>
                    </td>
                    <td className="py-6">
                      <Badge
                        variant="secondary"
                        className="bg-brand-peach/30 text-brand-orange border-none font-bold"
                      >
                        {subject.code}
                      </Badge>
                    </td>
                    <td className="py-6">
                      <span className="text-sm font-bold text-gray-500 italic">
                        {subject.class?.name} - {subject.class?.section}
                      </span>
                    </td>
                    <td className="py-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(subject)}
                          className="h-10 w-10 p-0 rounded-xl hover:bg-white hover:text-brand-orange hover:shadow-sm"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(subject.id)}
                          className="h-10 w-10 p-0 rounded-xl hover:bg-white hover:text-red-500 hover:shadow-sm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <SubjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        subject={selectedSubject}
      />
    </div>
  )
}
