import { Info, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FeeStatus() {
  return (
    <div className="bg-brand-taupe/10 border border-brand-taupe/20 rounded-[32px] p-8 space-y-6 h-full flex flex-col group">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900 display-title">Fee Status</h3>
        <Info className="w-5 h-5 text-gray-400 cursor-help hover:text-brand-orange transition-colors" />
      </div>

      <div className="bg-white rounded-3xl p-8 flex-1 flex flex-col items-center justify-center text-center shadow-sm border border-transparent hover:border-brand-taupe transition-all duration-300">
        <div className="w-16 h-16 bg-brand-orange/10 rounded-full flex items-center justify-center mb-6 relative overflow-hidden group-hover:scale-110 transition-transform duration-500">
           <div className="absolute inset-0 bg-brand-orange/20 animate-ping opacity-20" />
           <Check className="w-8 h-8 text-brand-orange" strokeWidth={3} />
        </div>
        
        <div className="space-y-2 mb-8">
          <h4 className="text-2xl font-black text-gray-900 tracking-tight">Fully Paid</h4>
          <p className="text-sm font-medium text-gray-500 leading-relaxed max-w-[180px] mx-auto">
            Fall Semester 2024 tuition and fees are settled.
          </p>
        </div>

        <Button variant="brand" className="w-full bg-brand-peach text-brand-orange hover:bg-brand-orange hover:text-white border-transparent shadow-none font-bold py-6 rounded-2xl transition-all duration-300">
          View Receipt
        </Button>
      </div>
    </div>
  )
}
