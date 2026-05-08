import React from 'react'
import {
  CheckCircle2,
  XCircle,
  Clock,
  Calendar,
  ArrowUpRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface StudentAttendanceStatsProps {
  stats: {
    total: number
    present: number
    absent: number
    late?: number
    excused?: number
    percentage: number
  }
}

export function StudentAttendanceStats({ stats }: StudentAttendanceStatsProps) {
  const percentage = Math.round(stats.percentage || 0)
  const offset = 440 - (440 * percentage) / 100

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Large Progress Card */}
      <div className="lg:col-span-5 bg-brand-peach/50 border border-brand-orange/10 rounded-[2.5rem] p-8 flex items-center justify-between group hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-3xl font-black text-gray-900 tracking-tight">
              Stay On Track
            </h3>
            <p className="text-gray-500 font-medium leading-relaxed max-w-[200px]">
              You have maintained an excellent attendance record this semester.
            </p>
          </div>
          <Button className="bg-brand-orange hover:bg-brand-orange-hover text-white rounded-2xl h-12 px-6 font-bold flex items-center gap-2 group-hover:scale-105 transition-all shadow-lg shadow-orange-100">
            View Trends
            <ArrowUpRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="relative flex items-center justify-center w-40 h-40">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              className="text-white"
            />
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={440}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="text-brand-orange transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-black text-gray-900">
              {percentage}%
            </span>
            <span className="text-[10px] font-black text-brand-orange uppercase tracking-widest">
              Attendance
            </span>
          </div>
        </div>
      </div>

      {/* Small Stats Cards */}
      <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-6">
        <StatCard
          label="Total Classes"
          value={stats.total || 0}
          icon={<Calendar className="w-5 h-5 text-brand-orange" />}
          bgColor="bg-white"
          iconBg="bg-brand-orange/10"
        />
        <StatCard
          label="Present"
          value={stats.present || 0}
          icon={<CheckCircle2 className="w-5 h-5 text-green-600" />}
          bgColor="bg-white"
          iconBg="bg-green-50"
        />
        <StatCard
          label="Absent"
          value={stats.absent || 0}
          icon={<XCircle className="w-5 h-5 text-red-600" />}
          bgColor="bg-white"
          iconBg="bg-red-50"
        />
        <StatCard
          label="Late"
          value={stats.late || 0}
          icon={<Clock className="w-5 h-5 text-amber-600" />}
          bgColor="bg-white"
          iconBg="bg-amber-50"
        />
      </div>
    </div>
  )
}

interface StatCardProps {
  label: string
  value: number | string
  icon: React.ReactNode
  bgColor: string
  iconBg: string
}

function StatCard({ label, value, icon, bgColor, iconBg }: StatCardProps) {
  return (
    <div
      className={`${bgColor} border border-gray-100 rounded-[2.5rem] p-6 flex flex-col items-start justify-between group hover:shadow-xl hover:-translate-y-1 transition-all duration-500`}
    >
      <div
        className={`w-10 h-10 ${iconBg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}
      >
        {icon}
      </div>
      <div className="mt-8 space-y-1">
        <h4 className="text-3xl font-black text-gray-900 tracking-tight">
          {typeof value === 'number' && value < 10 ? `0${value}` : value}
        </h4>
        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">
          {label}
        </p>
      </div>
    </div>
  )
}
