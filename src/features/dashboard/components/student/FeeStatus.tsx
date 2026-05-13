import { Info, Check, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/features/auth/store"
import { useStudentPaymentSummary } from "@/features/fees/api/queries"
import { Skeleton } from "@/components/ui/skeleton"
import { Link } from "@tanstack/react-router"

export function FeeStatus() {
  const user = useAuthStore((state) => state.user)
  const studentId = user?.studentProfile?.id
  
  const { data: summary, isLoading } = useStudentPaymentSummary(studentId)

  if (isLoading) {
    return (
      <div className="bg-brand-taupe/10 border border-brand-taupe/20 rounded-[32px] p-8 space-y-6 h-full flex flex-col group">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-32" />
          </div>
          <Skeleton className="h-5 w-5 rounded-full" />
        </div>
        <div className="bg-white rounded-3xl p-8 flex-1 flex flex-col items-center justify-center space-y-4 shadow-sm">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="space-y-2 flex flex-col items-center">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="h-14 w-full rounded-2xl mt-4" />
        </div>
      </div>
    )
  }

  const isPaid = summary && (Number(summary.remainingAmount) <= 0)

  return (
    <div className="bg-brand-taupe/10 border border-brand-taupe/20 rounded-[32px] p-8 space-y-6 h-full flex flex-col group">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900 display-title">Fee Status</h3>
        <Info className="w-5 h-5 text-gray-400 cursor-help hover:text-brand-orange transition-colors" />
      </div>

      <div className="bg-white rounded-3xl p-8 flex-1 flex flex-col items-center justify-center text-center shadow-sm border border-transparent hover:border-brand-taupe transition-all duration-300">
        <div className={`w-16 h-16 ${isPaid ? 'bg-green-50' : 'bg-brand-orange/10'} rounded-full flex items-center justify-center mb-6 relative overflow-hidden group-hover:scale-110 transition-transform duration-500`}>
           <div className={`absolute inset-0 ${isPaid ? 'bg-green-100' : 'bg-brand-orange/20'} animate-ping opacity-20`} />
           {isPaid ? (
             <Check className="w-8 h-8 text-green-600" strokeWidth={3} />
           ) : (
             <AlertCircle className="w-8 h-8 text-brand-orange" strokeWidth={3} />
           )}
        </div>
        
        <div className="space-y-2 mb-8">
          <h4 className="text-2xl font-black text-gray-900 tracking-tight">
            {isPaid ? 'Fully Paid' : `₹${Number(summary?.remainingAmount).toLocaleString()}`}
          </h4>
          <p className="text-sm font-medium text-gray-500 leading-relaxed max-w-[180px] mx-auto">
            {isPaid 
              ? 'All tuition and academic fees are currently settled.' 
              : 'Pending balance for the current academic session.'}
          </p>
        </div>

        <Button 
          variant="brand" 
          asChild
          className="w-full bg-brand-peach text-brand-orange hover:bg-brand-orange hover:text-white border-transparent shadow-none font-bold py-6 rounded-2xl transition-all duration-300"
        >
          <Link to="/student/Fees">
            {isPaid ? 'View Details' : 'Pay Now'}
          </Link>
        </Button>
      </div>
    </div>
  )
}
