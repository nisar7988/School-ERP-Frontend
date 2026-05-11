import React, { useState } from 'react';
import { DollarSign, Search, Filter, ArrowUpRight, ArrowDownRight, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { usePayments } from '../api/queries';
import { useClasses } from '@/features/classes/api/queries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export function FeesDashboardPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'PAID' | 'PENDING' | 'PARTIAL' | ''>('');
  const [classFilter, setClassFilter] = useState<string>('');

  const { data: classesResponse } = useClasses({ limit: 100 });
  const classes = classesResponse?.data || [];

  const { data: paymentsResponse, isLoading } = usePayments({ 
    search, 
    status: statusFilter || undefined,
    classId: classFilter || undefined
  } as any);
  
  const payments = paymentsResponse?.data || [];

  const stats = [
    { label: 'Total Collected', value: '$45,200', icon: DollarSign, color: 'bg-green-500', trend: '+12%' },
    { label: 'Pending Dues', value: '$12,800', icon: Clock, color: 'bg-orange-500', trend: '-5%' },
    { label: 'Partial Payments', value: '24 Students', icon: AlertCircle, color: 'bg-blue-500', trend: '+2' },
  ];

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

        <Button
          className="h-14 px-8 rounded-2xl font-black text-lg bg-gray-900 hover:bg-gray-800 text-white shadow-xl transition-all"
        >
          Generate Report
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 flex items-center gap-6 group hover:shadow-md transition-all">
            <div className={`w-16 h-16 ${stat.color} rounded-2xl flex items-center justify-center text-white shadow-lg shadow-gray-100 group-hover:scale-110 transition-transform`}>
              <stat.icon className="w-8 h-8" />
            </div>
            <div>
              <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">{stat.label}</span>
              <div className="flex items-center gap-3">
                <h2 className="text-3xl font-black text-gray-900">{stat.value}</h2>
                <span className={`text-xs font-black px-2 py-1 rounded-lg ${stat.trend.startsWith('+') ? 'text-green-500 bg-green-50' : 'text-red-500 bg-red-50'}`}>
                  {stat.trend}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters & Table */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 space-y-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search by student name, ID or receipt..."
              className="pl-12 h-14 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all text-sm font-bold"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <select 
            className="h-14 rounded-2xl border-gray-100 bg-gray-50/50 px-6 text-sm font-bold focus:bg-white transition-all outline-none border"
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
          >
            <option value="">All Classes</option>
            {classes.map(cls => (
              <option key={cls.id} value={cls.id}>{cls.name} - {cls.section}</option>
            ))}
          </select>

          <select 
            className="h-14 rounded-2xl border-gray-100 bg-gray-50/50 px-6 text-sm font-bold focus:bg-white transition-all outline-none border"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
          >
            <option value="">All Statuses</option>
            <option value="PAID">Paid</option>
            <option value="PENDING">Pending</option>
            <option value="PARTIAL">Partial</option>
          </select>

          <Button variant="outline" className="h-14 w-14 rounded-2xl border-gray-100 text-gray-400">
            <Filter className="w-6 h-6" />
          </Button>
        </div>

        <div className="overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-50">
                <th className="pb-4 font-black text-gray-400 text-[10px] tracking-widest uppercase">Student</th>
                <th className="pb-4 font-black text-gray-400 text-[10px] tracking-widest uppercase">Fee Type</th>
                <th className="pb-4 font-black text-gray-400 text-[10px] tracking-widest uppercase">Amount</th>
                <th className="pb-4 font-black text-gray-400 text-[10px] tracking-widest uppercase">Status</th>
                <th className="pb-4 font-black text-gray-400 text-[10px] tracking-widest uppercase">Date</th>
                <th className="pb-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="py-6"><div className="h-4 w-32 bg-gray-100 rounded" /></td>
                    <td className="py-6"><div className="h-4 w-20 bg-gray-100 rounded" /></td>
                    <td className="py-6"><div className="h-4 w-20 bg-gray-100 rounded" /></td>
                    <td className="py-6"><div className="h-4 w-24 bg-gray-100 rounded" /></td>
                    <td className="py-6"><div className="h-4 w-24 bg-gray-100 rounded" /></td>
                    <td className="py-6" />
                  </tr>
                ))
              ) : (
                payments.map((payment) => (
                  <tr key={payment.id} className="group hover:bg-gray-50/50 transition-colors">
                    <td className="py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center font-black text-gray-400">
                          {payment.student?.firstName?.[0]}
                        </div>
                        <div>
                          <span className="block font-black text-gray-900">{payment.student?.firstName} {payment.student?.lastName}</span>
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">ID: {payment.studentId.slice(0, 8)}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-6">
                      <span className="text-sm font-bold text-gray-700">{payment.fee?.name || 'Tuition Fee'}</span>
                    </td>
                    <td className="py-6">
                      <span className="font-black text-gray-900">${payment.amount}</span>
                    </td>
                    <td className="py-6">
                      <Badge variant="secondary" className={`border-none font-bold ${
                        payment.status === 'PAID' ? 'bg-green-50 text-green-600' :
                        payment.status === 'PARTIAL' ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'
                      }`}>
                        {payment.status}
                      </Badge>
                    </td>
                    <td className="py-6">
                      <span className="text-sm font-bold text-gray-400">{new Date(payment.createdAt).toLocaleDateString()}</span>
                    </td>
                    <td className="py-6 text-right">
                      <Button variant="ghost" className="h-10 w-10 p-0 rounded-xl hover:bg-white hover:text-brand-orange">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
