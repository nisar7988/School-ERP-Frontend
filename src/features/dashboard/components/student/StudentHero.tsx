import { Button } from "@/components/ui/button"

export function StudentHero() {
  return (
    <div className="flex items-center justify-between mb-10">
      <div className="space-y-1">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
          Welcome back, Alex.
        </h1>
        <p className="text-gray-500 font-medium">
          Your next class begins in <span className="font-bold text-brand-orange">45 minutes</span>. 
          You have <span className="font-bold text-gray-900">2 assignments</span> due this week.
        </p>
      </div>
      <Button variant="brand" className="h-12 px-6 gap-2 shadow-lg shadow-orange-100 font-bold">
        <span className="bg-white/20 p-1 rounded-md">
           <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
             <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
             <path d="M16 6l-4-4-4 4" />
             <path d="M12 2v13" />
           </svg>
        </span>
        Submit Assignment
      </Button>
    </div>
  )
}
