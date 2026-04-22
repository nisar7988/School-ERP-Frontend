import { Badge } from "@/components/ui/badge"

export function StudentProfileCard() {
  return (
    <div className="bg-gradient-to-br from-brand-peach/40 to-white border border-brand-taupe/30 rounded-[32px] p-8 relative overflow-hidden group">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 rounded-full -mr-20 -mt-20 blur-3xl transition-all duration-500 group-hover:bg-brand-orange/10" />
      
      <div className="flex items-center gap-8 relative z-10">
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden ring-[6px] ring-white shadow-xl shadow-brand-taupe/50 transition-transform duration-500 group-hover:scale-105">
            <img 
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200" 
              alt="Alex Mercer" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-1 right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
            <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
          </div>
        </div>

        <div className="space-y-4 flex-1">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h2 className="text-3xl font-extrabold text-gray-900 display-title leading-none">Alex Mercer</h2>
              <p className="text-gray-500 font-bold ml-0.5">Computer Science, B.S. · Sophomore</p>
            </div>
            <Badge variant="outline" className="bg-brand-peach text-brand-orange border-brand-orange/20 font-bold px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest shadow-sm">
              Good Standing
            </Badge>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-white/80 backdrop-blur-sm border border-gray-100 p-4 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md hover:border-brand-taupe">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">GPA</p>
              <p className="text-2xl font-extrabold text-gray-900 tracking-tight">3.84</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm border border-gray-100 p-4 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md hover:border-brand-taupe">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Credits</p>
              <p className="text-2xl font-extrabold text-gray-900 tracking-tight">42/120</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm border border-gray-100 p-4 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md hover:border-brand-taupe">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Advisor</p>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-brand-orange flex items-center justify-center text-[10px] text-white font-bold">SR</div>
                <p className="text-sm font-bold text-gray-900">Dr. Sarah Reed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
