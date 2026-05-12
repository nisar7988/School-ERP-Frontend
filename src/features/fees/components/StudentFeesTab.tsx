import { useState } from 'react'
import {
  useStudentFeesList,
  useCreateStudentFee,
  useUpdateStudentFee,
  useDeleteStudentFee,
  useFeeStructures,
} from '../api/queries'
import { useStudents } from '@/features/students/api/queries'
import { Button } from '@/components/ui/button'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Dialog } from '@/components/ui/Dialog'

import { FeeStatus } from '../types'

export function StudentFeesTab() {
  const { data: studentFees, isLoading } = useStudentFeesList()
  const { data: studentsResponse } = useStudents({ limit: 100 })
  const students = studentsResponse?.data || []
  const { data: feeStructures } = useFeeStructures()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingFee, setEditingFee] = useState<any>(null)

  const [formData, setFormData] = useState({
    studentId: '',
    feeStructureId: '',
    amount: '',
    dueDate: '',
    status: FeeStatus.PENDING,
  })

  const createMutation = useCreateStudentFee()
  const updateMutation = useUpdateStudentFee()
  const deleteMutation = useDeleteStudentFee()

  const handleOpenDialog = (fee?: any) => {
    if (fee) {
      setEditingFee(fee)
      setFormData({
        studentId: fee.studentId,
        feeStructureId: fee.feeStructureId,
        amount: String(fee.amount),
        dueDate: new Date(fee.dueDate).toISOString().split('T')[0],
        status: fee.status,
      })
    } else {
      setEditingFee(null)
      setFormData({
        studentId: '',
        feeStructureId: '',
        amount: '',
        dueDate: '',
        status: FeeStatus.PENDING,
      })
    }
    setIsDialogOpen(true)
  }

  const handleSubmit = () => {
    const payload = {
      ...formData,
      amount: Number(formData.amount),
      status: formData.status,
    }
    if (editingFee) {
      updateMutation.mutate(
        { id: editingFee.id, data: payload },
        {
          onSuccess: () => setIsDialogOpen(false),
        },
      )
    } else {
      createMutation.mutate(payload as any, {
        onSuccess: () => setIsDialogOpen(false),
      })
    }
  }

  const handleDelete = (id: string) => {
    if (
      window.confirm('Are you sure you want to delete this student fee record?')
    ) {
      deleteMutation.mutate(id)
    }
  }

  // When structure changes, autofill amount
  const handleStructureChange = (structureId: string) => {
    const struct = feeStructures?.find((s: any) => s.id === structureId)
    setFormData((prev) => ({
      ...prev,
      feeStructureId: structureId,
      amount: struct ? String(struct.amount) : prev.amount,
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Student Fees</h2>
          <p className="text-gray-500 font-semibold">
            Manage billed amounts for students
          </p>
        </div>
        <Button
          onClick={() => handleOpenDialog()}
          className="bg-brand-orange hover:bg-brand-orange/90 text-white rounded-xl shadow-lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Assign Fee
        </Button>
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-50">
              <th className="pb-4 font-black text-gray-400 text-[10px] tracking-widest uppercase">
                Student
              </th>
              <th className="pb-4 font-black text-gray-400 text-[10px] tracking-widest uppercase">
                Fee Type
              </th>
              <th className="pb-4 font-black text-gray-400 text-[10px] tracking-widest uppercase">
                Amount
              </th>
              <th className="pb-4 font-black text-gray-400 text-[10px] tracking-widest uppercase">
                Due Date
              </th>
              <th className="pb-4 font-black text-gray-400 text-[10px] tracking-widest uppercase">
                Status
              </th>
              <th className="pb-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {isLoading ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-6 text-center text-gray-400 font-bold"
                >
                  Loading student fees...
                </td>
              </tr>
            ) : studentFees?.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-6 text-center text-gray-400 font-bold"
                >
                  No student fees found.
                </td>
              </tr>
            ) : (
              studentFees?.map((fee: any) => (
                <tr
                  key={fee.id}
                  className="group hover:bg-gray-50/50 transition-colors"
                >
                  <td className="py-6">
                    <span className="font-bold text-gray-900">
                      {fee.student?.firstName} {fee.student?.lastName}
                    </span>
                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                      ID: {fee.studentId.slice(0, 8)}
                    </span>
                  </td>
                  <td className="py-6">
                    <span className="text-sm font-bold text-gray-700">
                      {fee.feeStructure?.title ||
                        fee.feeStructureId.slice(0, 8)}
                    </span>
                  </td>
                  <td className="py-6">
                    <span className="font-black text-gray-900">
                      ${fee.amount}
                    </span>
                  </td>
                  <td className="py-6 text-sm font-bold text-gray-400">
                    {new Date(fee.dueDate).toLocaleDateString()}
                  </td>
                  <td className="py-6">
                    <Badge
                      variant="secondary"
                      className={`border-none font-bold ${
                        fee.status === 'PAID'
                          ? 'bg-green-50 text-green-600'
                          : fee.status === 'PARTIAL'
                            ? 'bg-blue-50 text-blue-600'
                            : fee.status === 'OVERDUE'
                              ? 'bg-red-50 text-red-600'
                              : 'bg-orange-50 text-orange-600'
                      }`}
                    >
                      {fee.status}
                    </Badge>
                  </td>
                  <td className="py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0 text-blue-500 hover:bg-blue-50"
                        onClick={() => handleOpenDialog(fee)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0 text-red-500 hover:bg-red-50"
                        onClick={() => handleDelete(fee.id)}
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

      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title={editingFee ? 'Edit Student Fee' : 'Assign Student Fee'}
        onConfirm={handleSubmit}
        confirmText={editingFee ? 'Save Changes' : 'Assign Fee'}
        cancelText="Cancel"
        variant="default"
      >
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Student</label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              value={formData.studentId}
              onChange={(e) =>
                setFormData({ ...formData, studentId: e.target.value })
              }
            >
              <option value="">Select a student</option>
              {students.map((s: any) => (
                <option key={s.id} value={s.id}>
                  {s.firstName} {s.lastName}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">
              Fee Structure
            </label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              value={formData.feeStructureId}
              onChange={(e) => handleStructureChange(e.target.value)}
            >
              <option value="">Select a fee structure</option>
              {feeStructures?.map((s: any) => (
                <option key={s.id} value={s.id}>
                  {s.title} (${s.amount})
                </option>
              ))}
            </select>
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
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Due Date</label>
            <Input
              type="date"
              value={formData.dueDate}
              onChange={(e) =>
                setFormData({ ...formData, dueDate: e.target.value })
              }
            />
          </div>
          {editingFee && (
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Status</label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value as FeeStatus })
                }
              >
                <option value="PENDING">PENDING</option>
                <option value="PAID">PAID</option>
                <option value="PARTIAL">PARTIAL</option>
                <option value="OVERDUE">OVERDUE</option>
              </select>
            </div>
          )}
        </div>
      </Dialog>
    </div>
  )
}
