import { useState } from 'react';
import { useClasses } from '@/features/classes/api/queries';
import { useFeeStructureByClass, usePendingFeesByClass } from '@/features/fees/api/queries';
import { DollarSign, AlertCircle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

export function TeacherFeesPage() {
  const { data: classesResponse, isLoading: isLoadingClasses } = useClasses({ limit: 100 });
  const classes = classesResponse?.data || [];
  
  const [selectedClassId, setSelectedClassId] = useState<string>('');
  
  const { data: structure, isLoading: isLoadingStructure } = useFeeStructureByClass(selectedClassId);
  const { data: pendingFees = [], isLoading: isLoadingPending } = usePendingFeesByClass(selectedClassId);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
            <DollarSign className="w-10 h-10 text-brand-orange" />
            Class Fees Overview
          </h1>
          <p className="text-gray-500 font-semibold italic">
            Monitor the fee structure and pending payments for your assigned classes.
          </p>
        </div>
        
        <div>
          <select 
            className="h-14 rounded-2xl border-gray-100 bg-white px-6 text-sm font-bold focus:bg-white transition-all outline-none border shadow-sm w-64"
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            disabled={isLoadingClasses}
          >
            <option value="">Select a class to view fees</option>
            {classes.map((cls: any) => (
              <option key={cls.id} value={cls.id}>{cls.name} - {cls.section}</option>
            ))}
          </select>
        </div>
      </div>

      {!selectedClassId ? (
        <div className="bg-white rounded-[2.5rem] p-12 shadow-sm border border-gray-100 text-center flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <DollarSign className="w-10 h-10 text-gray-300" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Select a Class</h2>
          <p className="text-gray-400 font-semibold max-w-md">
            Please select a class from the dropdown menu above to view its fee structure and monitor pending student payments.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Fee Structure Summary */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              Current Fee Structure
            </h2>
            <div className="bg-brand-orange/5 rounded-[2.5rem] p-8 border border-brand-orange/10 relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-orange/10 blur-[80px] rounded-full" />
              
              <div className="relative z-10">
                {isLoadingStructure ? (
                  <div className="space-y-4">
                    <Skeleton className="h-4 w-24 bg-brand-orange/20" />
                    <Skeleton className="h-12 w-32 bg-brand-orange/20" />
                  </div>
                ) : structure ? (
                  <>
                    <div className="text-[10px] font-black text-brand-orange uppercase tracking-[0.2em] mb-4">
                      {structure.title}
                    </div>
                    <div className="text-5xl font-bold tracking-tighter text-gray-900 mb-2">
                      ${structure.amount}
                    </div>
                    <div className="text-gray-500 font-semibold text-sm mb-4">
                      Standard fee for the selected class.
                    </div>
                    {structure.mandatory && (
                      <Badge className="bg-brand-orange text-white border-none font-bold">Mandatory Fee</Badge>
                    )}
                  </>
                ) : (
                  <div className="text-gray-500 font-semibold">No fee structure found for this class.</div>
                )}
              </div>
            </div>
            
            <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Pending Dues</h3>
                <p className="text-sm font-semibold text-gray-400">{pendingFees.length} students have pending payments</p>
              </div>
            </div>
          </div>

          {/* Pending Fees Table */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-brand-orange" />
                  Pending Student Payments
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-50">
                      <th className="text-[10px] font-black text-gray-300 uppercase tracking-widest pb-4 text-left">Student</th>
                      <th className="text-[10px] font-black text-gray-300 uppercase tracking-widest pb-4 text-left">Fee Type</th>
                      <th className="text-[10px] font-black text-gray-300 uppercase tracking-widest pb-4 text-center">Amount Due</th>
                      <th className="text-[10px] font-black text-gray-300 uppercase tracking-widest pb-4 text-center">Due Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {isLoadingPending ? (
                      <tr><td colSpan={4} className="py-8 text-center text-gray-400 font-bold">Loading...</td></tr>
                    ) : pendingFees.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-12 text-center">
                          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <DollarSign className="w-8 h-8 text-green-500" />
                          </div>
                          <p className="text-gray-900 font-bold">All caught up!</p>
                          <p className="text-gray-400 font-semibold text-sm">No pending fees for this class.</p>
                        </td>
                      </tr>
                    ) : pendingFees.map((fee: any) => (
                      <tr key={fee.id} className="group hover:bg-gray-50/50 transition-colors">
                        <td className="py-4">
                          <div className="font-bold text-gray-900">{fee.student?.firstName} {fee.student?.lastName}</div>
                          <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">ID: {fee.studentId.slice(0, 8)}</div>
                        </td>
                        <td className="py-4">
                          <div className="font-semibold text-gray-700">{fee.feeStructure?.title || 'Fee'}</div>
                          <Badge variant="secondary" className={`mt-1 text-[10px] ${fee.status === 'OVERDUE' ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'}`}>
                            {fee.status}
                          </Badge>
                        </td>
                        <td className="py-4 text-center">
                          <span className="text-base font-bold text-gray-900">${Number(fee.amount) - Number(fee.paidAmount)}</span>
                        </td>
                        <td className="py-4 text-center text-sm font-semibold text-gray-400">
                          {new Date(fee.dueDate).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
