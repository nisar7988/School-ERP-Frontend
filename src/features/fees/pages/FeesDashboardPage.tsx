import { useState } from 'react'
import { DollarSign, Clock, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FeeStructuresTab } from '../components/FeeStructuresTab'
import { StudentFeesTab } from '../components/StudentFeesTab'
import { useStudentFeesList } from '../api/queries'
import { calculateFeeStats } from '../utils/fee-utils'

export function FeesDashboardPage() {
  const [activeTab, setActiveTab] = useState('structures')

  const { data: response } = useStudentFeesList({ limit: 1000 })
  const studentFees = response?.data || []

  const { totalCollected, pendingDues, partialCount } =
    calculateFeeStats(studentFees)

  const stats = [
    {
      label: 'Total Collected',
      value: `$${totalCollected.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-green-900',
    },
    {
      label: 'Pending Dues',
      value: `$${pendingDues.toLocaleString()}`,
      icon: Clock,
      color: 'bg-gray-300',
    },
    {
      label: 'Partial Payments',
      value: `${partialCount} Students`,
      icon: AlertCircle,
      color: 'bg-brand-orange',
    },
  ]

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
            <DollarSign className="w-10 h-10 text-brand-orange" />
            Fee Management
          </h1>
          <p className="text-gray-500 font-semibold italic">
            Monitor and manage student payments, dues, and financial reports.
          </p>
        </div>
        <Button className="h-14 px-8 rounded-2xl font-black text-lg bg-gray-900 hover:bg-gray-800 text-white shadow-xl transition-all">
          Generate Report
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 flex items-center gap-6 group hover:shadow-md transition-all"
          >
            <div
              className={`w-16 h-16 ${stat.color} rounded-2xl flex items-center justify-center text-white shadow-lg shadow-gray-100 group-hover:scale-110 transition-transform`}
            >
              <stat.icon className="w-8 h-8" />
            </div>
            <div>
              <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                {stat.label}
              </span>
              <div className="flex items-center gap-3">
                <h2 className="text-3xl font-black text-gray-900">
                  {stat.value}
                </h2>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full">
        <div className="flex gap-2 mb-6 h-14 bg-white border border-gray-100 p-1 rounded-2xl w-fit">
          <button
            onClick={() => setActiveTab('structures')}
            className={`rounded-xl px-6 font-bold text-sm transition-colors ${
              activeTab === 'structures'
                ? 'bg-brand-orange text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Fee Structures
          </button>
          <button
            onClick={() => setActiveTab('student-fees')}
            className={`rounded-xl px-6 font-bold text-sm transition-colors ${
              activeTab === 'student-fees'
                ? 'bg-brand-orange text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Student Fees
          </button>
        </div>

        <div>
          {activeTab === 'structures' && <FeeStructuresTab />}
          {activeTab === 'student-fees' && <StudentFeesTab />}
        </div>
      </div>
    </div>
  )
}
