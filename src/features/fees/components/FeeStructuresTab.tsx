import { useState, useEffect } from 'react'
import {
  useFeeStructures,
  useCreateFeeStructure,
  useUpdateFeeStructure,
  useDeleteFeeStructure,
} from '../api/queries'
import { useClasses } from '@/features/classes/api/queries'
import { Button } from '@/components/ui/button'
import {
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  Search,
  Filter,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Dialog } from '@/components/ui/Dialog'
import { Pagination } from '@/components/ui/Pagination'

export function FeeStructuresTab() {
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [selectedClassId, setSelectedClassId] = useState<string>('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery)
      setPage(1)
    }, 500)
    return () => clearTimeout(timer)
  }, [searchQuery])

  const { data: response, isLoading } = useFeeStructures({
    search: debouncedSearch,
    page,
    classId: selectedClassId,
  })
  const structures = (response as any)?.data?.data
  const meta = (response as any)?.data?.meta

  const { data: classesResponse } = useClasses({ limit: 100 })
  const classes = classesResponse?.data || []

  const handleResetFilters = () => {
    setSearchQuery('')
    setSelectedClassId('')
    setPage(1)
  }

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingStructure, setEditingStructure] = useState<any>(null)

  const [formData, setFormData] = useState({
    classId: '',
    title: '',
    amount: '',
    mandatory: true,
  })

  const createMutation = useCreateFeeStructure()
  const updateMutation = useUpdateFeeStructure()
  const deleteMutation = useDeleteFeeStructure()

  const handleOpenDialog = (structure?: any) => {
    if (structure) {
      setEditingStructure(structure)
      setFormData({
        classId: structure.classId,
        title: structure.title,
        amount: String(structure.amount),
        mandatory: structure.mandatory,
      })
    } else {
      setEditingStructure(null)
      setFormData({ classId: '', title: '', amount: '', mandatory: true })
    }
    setIsDialogOpen(true)
  }

  const handleSubmit = () => {
    const payload = {
      ...formData,
      amount: Number(formData.amount),
    }
    if (editingStructure) {
      updateMutation.mutate(
        { id: editingStructure.id, data: payload },
        {
          onSuccess: () => setIsDialogOpen(false),
        },
      )
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => setIsDialogOpen(false),
      })
    }
  }

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this fee structure?')) {
      deleteMutation.mutate(id)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Fee Structures</h2>
          <p className="text-gray-500 font-semibold">
            Manage fee templates for classes
          </p>
        </div>
        <Button
          onClick={() => handleOpenDialog()}
          className="bg-brand-orange hover:bg-brand-orange/90 text-white rounded-xl shadow-lg font-bold h-12 px-6"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Structure
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-brand-orange transition-colors" />
            <Input
              placeholder="Search structures by title..."
              className="pl-12 h-14 rounded-2xl border-gray-100 bg-white shadow-sm focus:ring-brand-orange/10 font-sans"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <div className="space-y-2">
              <select
                className="w-full h-12 rounded-xl border-gray-100 bg-white shadow-sm px-4 font-bold text-gray-600 focus:ring-brand-orange/10 outline-none"
                value={selectedClassId}
                onChange={(e) => {
                  setSelectedClassId(e.target.value)
                  setPage(1)
                }}
              >
                <option value="">All Classes</option>
                {classes.map((c: any) => (
                  <option key={c.id} value={c.id}>
                    {c.name} - {c.section}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-50">
                <th className="pb-4 font-black text-gray-400 text-[10px] tracking-widest uppercase">
                  Title
                </th>
                <th className="pb-4 font-black text-gray-400 text-[10px] tracking-widest uppercase">
                  Class
                </th>
                <th className="pb-4 font-black text-gray-400 text-[10px] tracking-widest uppercase">
                  Amount
                </th>
                <th className="pb-4 font-black text-gray-400 text-[10px] tracking-widest uppercase">
                  Mandatory
                </th>
                <th className="pb-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-12 text-center text-gray-400 font-bold"
                  >
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-brand-orange border-t-transparent rounded-full animate-spin" />
                      Loading structures...
                    </div>
                  </td>
                </tr>
              ) : structures?.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-12 text-center text-gray-400 font-bold italic"
                  >
                    No fee structures found matching your search.
                  </td>
                </tr>
              ) : (
                structures?.map((s: any) => (
                  <tr
                    key={s.id}
                    className="group hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="py-6">
                      <span className="font-bold text-gray-900">{s.title}</span>
                    </td>
                    <td className="py-6">
                      <span className="text-sm font-bold text-gray-700 block">
                        {s.class?.name || 'Unknown Class'}
                      </span>
                      <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
                        {s.class?.section || 'No Section'}
                      </span>
                    </td>
                    <td className="py-6">
                      <span className="font-black text-gray-900">
                        ${s.amount}
                      </span>
                    </td>
                    <td className="py-6">
                      {s.mandatory ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-gray-300" />
                      )}
                    </td>
                    <td className="py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          className="h-10 w-10 p-0 rounded-xl text-blue-500 hover:bg-blue-50 transition-all"
                          onClick={() => handleOpenDialog(s)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          className="h-10 w-10 p-0 rounded-xl text-red-500 hover:bg-red-50 transition-all"
                          onClick={() => handleDelete(s.id)}
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

        {meta && meta.lastPage > 1 && (
          <div className="mt-8 pt-8 border-t border-gray-50">
            <Pagination
              currentPage={meta.page}
              lastPage={meta.lastPage}
              total={meta.total}
              limit={meta.limit}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>

      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title={editingStructure ? 'Edit Fee Structure' : 'Add Fee Structure'}
        onConfirm={handleSubmit}
        confirmText={editingStructure ? 'Save Changes' : 'Create'}
        cancelText="Cancel"
        variant="default"
      >
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Class</label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              value={formData.classId}
              onChange={(e) =>
                setFormData({ ...formData, classId: e.target.value })
              }
            >
              <option value="">Select a class</option>
              {classes.map((c: any) => (
                <option key={c.id} value={c.id}>
                  {c.name} - {c.section}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Title</label>
            <Input
              placeholder="e.g. Term 1 Tuition Fee"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Amount</label>
            <Input
              type="number"
              placeholder="e.g. 500"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
            />
          </div>
          <div className="flex items-center space-x-2 pt-2">
            <input
              type="checkbox"
              id="mandatory"
              checked={formData.mandatory}
              onChange={(e) =>
                setFormData({ ...formData, mandatory: e.target.checked })
              }
              className="w-4 h-4 rounded border-gray-300 text-brand-orange focus:ring-brand-orange"
            />
            <label
              htmlFor="mandatory"
              className="text-sm font-bold text-gray-700"
            >
              Mandatory Fee
            </label>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
