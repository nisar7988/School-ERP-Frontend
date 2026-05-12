import { useState } from 'react'
import {
  ShieldCheck,
  Calendar as CalendarIcon,
  FileText,
  Download,
  ArrowRight,
  Info,
  CheckCircle2,
  X,
  Clock,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuthStore } from '@/features/auth/store'
import {
  useStudentFees,
  useStudentPaymentSummary,
  useStudentPayments,
  useCreatePayment,
} from '@/features/fees/api/queries'
import { Input } from '@/components/ui/input'
import { Dialog } from '@/components/ui/Dialog'
import { PaymentMethod } from '@/features/fees/types'

export function FeeDetailsPage() {
  const user = useAuthStore((state) => state.user)
  const studentId =
    user?.studentProfile?.id || (user as any)?.id || 'mock-student-id'
  const [showNotification, setShowNotification] = useState(false)
  const [isPayModalOpen, setIsPayModalOpen] = useState(false)

  const { data: fees = [], isLoading: isLoadingFees } =
    useStudentFees(studentId)
  const { data: summary, isLoading: isLoadingSummary } =
    useStudentPaymentSummary(studentId)
  const { data: paymentsRes, isLoading: isLoadingPayments } =
    useStudentPayments(studentId)
  const createPaymentMutation = useCreatePayment()

  const payments = paymentsRes?.data || []

  const [payFormData, setPayFormData] = useState({
    studentFeeId: '',
    amount: '',
    method: PaymentMethod.CARD,
  })

  const isLoading = isLoadingFees || isLoadingSummary || isLoadingPayments

  if (isLoading) {
    return <FeeDetailsLoading />
  }

  const handlePay = () => {
    if (!payFormData.studentFeeId || !payFormData.amount) return
    createPaymentMutation.mutate(
      {
        studentFeeId: payFormData.studentFeeId,
        amount: Number(payFormData.amount),
        method: payFormData.method,
        paidAt: new Date().toISOString(),
      },
      {
        onSuccess: () => {
          setIsPayModalOpen(false)
          setShowNotification(true)
        },
      },
    )
  }

  const nextDueFee = fees.find(
    (f: any) => f.status === 'PENDING' || f.status === 'PARTIAL',
  )

  return (
    <div className="bg-[#FAF9F7] min-h-screen p-10 font-sans text-gray-900 animate-in fade-in duration-700">
      {/* ── HEADER ── */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-[40px] font-bold tracking-tight display-title text-gray-900 leading-tight">
            Financial Overview
          </h1>
          <p className="text-gray-500 font-semibold mt-1 max-w-[480px]">
            Manage your tuition, track payments, and download invoices.
          </p>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-1">
            Next Payment Due
          </div>
          <div className="text-xl font-bold text-gray-900">
            {nextDueFee
              ? new Date(nextDueFee.dueDate).toLocaleDateString()
              : 'No Pending Dues'}
          </div>
        </div>
      </div>

      {/* ── TOP CARDS ── */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        {/* Balance Card */}
        <div className="bg-brand-orange/5 rounded-[32px] p-8 border border-brand-orange/10 relative overflow-hidden group">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-orange/10 blur-[80px] rounded-full transition-colors duration-500 group-hover:bg-brand-orange/20" />

          <div className="relative z-10">
            <div className="text-[10px] font-black text-brand-orange uppercase tracking-[0.2em] mb-4">
              Current Balance
            </div>
            <div className="text-5xl font-bold tracking-tighter text-gray-900 mb-2">
              ${summary?.remainingAmount || 0}
            </div>
            <div className="text-gray-400 font-semibold text-sm mb-8">
              Total outstanding balance for this academic year.
            </div>
            <div className="flex gap-4">
              <Button
                variant="brand"
                className="px-8 h-12 shadow-brand-orange/20"
                onClick={() => setIsPayModalOpen(true)}
              >
                Pay Now
              </Button>
              <Button
                variant="outline"
                className="px-8 h-12 bg-white/50 backdrop-blur-sm"
              >
                Download Invoice
              </Button>
            </div>
          </div>
        </div>

        {/* Financial Status Card */}
        <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-8 flex-1">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 bg-brand-orange/5 rounded-2xl flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-brand-orange" />
              </div>
              <Badge className="bg-emerald-50 text-emerald-600 border-none font-bold text-[10px] px-3 py-1">
                {summary?.status || 'Good Standing'}
              </Badge>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              Financial Status
            </h3>
            <p className="text-gray-400 font-semibold text-sm leading-relaxed">
              Your account is up to date and in good standing. Thank you for
              your prompt payments.
            </p>
          </div>

          <div className="bg-brand-orange p-8">
            <div className="text-[10px] font-black text-white/60 uppercase tracking-[0.2em] mb-2">
              Total Paid (YTD)
            </div>
            <div className="text-3xl font-bold text-white tracking-tight mb-4">
              ${summary?.paidAmount || 0}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/70 text-xs font-bold uppercase tracking-widest">
                Total Fees
              </span>
              <Badge className="bg-white/20 text-white border-none font-bold">
                ${summary?.totalFee || 0}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* ── PAYMENT HISTORY ── */}
      <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm mb-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-gray-900">Payment History</h2>
          <Button
            variant="ghost"
            className="text-brand-orange font-bold hover:bg-brand-orange/5 gap-2"
          >
            View All Records
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-50">
                {['Date', 'Method', 'Amount', 'Status', 'Ref No.'].map(
                  (h, i) => (
                    <th
                      key={h}
                      className={cn(
                        'text-[10px] font-black text-gray-300 uppercase tracking-widest pb-4 text-left',
                        i >= 2 && 'text-center',
                      )}
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {payments.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-8 text-center text-gray-400 font-bold"
                  >
                    No payments found.
                  </td>
                </tr>
              ) : (
                payments.map((p: any) => (
                  <tr
                    key={p.id}
                    className="group hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="py-6 text-sm text-gray-400 font-semibold">
                      {new Date(p.paidAt).toLocaleDateString()}
                    </td>
                    <td className="py-6">
                      <div className="font-bold text-gray-900">{p.method}</div>
                    </td>
                    <td className="py-6 text-center">
                      <span className="text-base font-bold text-gray-900 tracking-tight">
                        ${p.amount}
                      </span>
                    </td>
                    <td className="py-6 text-center">
                      <Badge className="font-bold text-[10px] px-3 py-1 border-none bg-emerald-50 text-emerald-600">
                        • PAID
                      </Badge>
                    </td>
                    <td className="py-6 text-center">
                      <code className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
                        {p.referenceNo || 'N/A'}
                      </code>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── BOTTOM PANELS ── */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        {/* Fees Assigned */}
        <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-brand-orange/5 rounded-xl flex items-center justify-center">
              <CalendarIcon className="w-5 h-5 text-brand-orange" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Assigned Fees</h2>
          </div>

          <div className="space-y-6">
            {fees.length === 0 ? (
              <div className="text-gray-400 font-bold text-center">
                No fees assigned
              </div>
            ) : (
              fees.map((fee: any) => (
                <div
                  key={fee.id}
                  className="flex items-center justify-between group"
                >
                  <div>
                    <div className="font-bold text-gray-900 mb-1 transition-colors group-hover:text-brand-orange flex items-center gap-2">
                      {fee.feeStructure?.title || 'Fee'}
                      <Badge
                        variant="secondary"
                        className={`text-[10px] ${fee.status === 'PAID' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}
                      >
                        {fee.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400 font-bold">
                      <Clock className="w-3.5 h-3.5" />
                      Due: {new Date(fee.dueDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-lg font-bold text-gray-900 tracking-tight">
                    ${fee.amount}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Documents */}
        <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-brand-orange/5 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-brand-orange" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Documents</h2>
          </div>

          {showNotification && (
            <div className="mb-6 bg-gray-900 text-white rounded-2xl p-4 flex items-center gap-4 animate-in slide-in-from-top-4 duration-300">
              <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
              <p className="text-xs font-bold flex-1">
                Payment processed successfully.
              </p>
              <button
                onClick={() => setShowNotification(false)}
                className="text-white/40 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl group cursor-pointer hover:bg-brand-orange/5 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-xl border border-gray-100 flex items-center justify-center group-hover:border-brand-orange/20">
                  <FileText className="w-5 h-5 text-gray-400 group-hover:text-brand-orange" />
                </div>
                <div>
                  <div className="font-bold text-sm text-gray-900 group-hover:text-brand-orange transition-colors">
                    Annual Fee Receipt
                  </div>
                  <div className="text-[10px] text-gray-300 font-black uppercase tracking-widest mt-0.5">
                    PDF • 1.2MB
                  </div>
                </div>
              </div>
              <Download className="w-5 h-5 text-gray-300 group-hover:text-brand-orange transition-colors" />
            </div>
          </div>
        </div>
      </div>

      {/* ── FOOTER BANNER ── */}
      <div className="bg-brand-orange/5 border border-brand-orange/10 rounded-[24px] p-6 flex items-center justify-between gap-8 group">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-brand-orange/10 rounded-full flex items-center justify-center shrink-0">
            <Info className="w-5 h-5 text-brand-orange" />
          </div>
          <p className="text-sm text-gray-500 font-semibold leading-relaxed">
            Need financial assistance? Contact the{' '}
            <strong className="text-brand-orange font-bold">
              Finance Office
            </strong>{' '}
            for scholarship inquiries or installment extensions.
          </p>
        </div>
        <Button
          variant="ghost"
          className="text-brand-orange font-bold uppercase tracking-widest text-[10px] h-10 px-6 border border-brand-orange/20 rounded-full hover:bg-brand-orange hover:text-white transition-all whitespace-nowrap"
        >
          Contact Support <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      <Dialog
        isOpen={isPayModalOpen}
        onClose={() => setIsPayModalOpen(false)}
        title="Make a Payment"
        onConfirm={handlePay}
        confirmText={
          createPaymentMutation.isPending ? 'Processing...' : 'Submit Payment'
        }
        cancelText="Cancel"
        variant="default"
      >
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">
              Select Fee
            </label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              value={payFormData.studentFeeId}
              onChange={(e) => {
                const fee = fees.find((f: any) => f.id === e.target.value)
                setPayFormData({
                  ...payFormData,
                  studentFeeId: e.target.value,
                  amount: fee
                    ? String(Number(fee.amount) - Number(fee.paidAmount))
                    : '',
                })
              }}
            >
              <option value="">Select a pending fee...</option>
              {fees
                .filter(
                  (f: any) => f.status === 'PENDING' || f.status === 'PARTIAL',
                )
                .map((f: any) => (
                  <option key={f.id} value={f.id}>
                    {f.feeStructure?.title} (Due: $
                    {Number(f.amount) - Number(f.paidAmount)})
                  </option>
                ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Amount</label>
            <Input
              type="number"
              placeholder="0.00"
              value={payFormData.amount}
              onChange={(e) =>
                setPayFormData({ ...payFormData, amount: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">
              Payment Method
            </label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              value={payFormData.method}
              onChange={(e) =>
                setPayFormData({
                  ...payFormData,
                  method: e.target.value as PaymentMethod,
                })
              }
            >
              <option value="CARD">Credit / Debit Card</option>
              <option value="BANK_TRANSFER">Bank Transfer</option>
              <option value="UPI">UPI</option>
            </select>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

function FeeDetailsLoading() {
  return (
    <div className="bg-[#FAF9F7] min-h-screen p-10 font-sans text-gray-900">
      <div className="flex items-start justify-between mb-8">
        <div className="space-y-3">
          <Skeleton className="h-12 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="text-right space-y-2">
          <Skeleton className="h-3 w-32 ml-auto" />
          <Skeleton className="h-6 w-40 ml-auto" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8 mb-8">
        <Skeleton className="h-64 rounded-[32px]" />
        <Skeleton className="h-64 rounded-[32px]" />
      </div>
      <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm mb-8">
        <div className="flex items-center justify-between mb-8">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <Skeleton className="h-80 rounded-[32px]" />
        <Skeleton className="h-80 rounded-[32px]" />
      </div>
    </div>
  )
}
