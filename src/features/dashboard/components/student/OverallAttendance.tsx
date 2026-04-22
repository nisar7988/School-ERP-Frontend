export function OverallAttendance() {
  const percentage = 92
  const strokeWidth = 14
  const radius = 60
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className="bg-brand-taupe/10 border border-brand-taupe/20 rounded-[32px] p-8 flex flex-col items-center justify-center text-center h-full space-y-6 group">
      <h3 className="text-xl font-bold text-gray-900 display-title self-start">Overall Attendance</h3>
      
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Background Track */}
        <svg className="w-full h-full transform -rotate-90 drop-shadow-sm">
          <circle
            cx="96"
            cy="96"
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-gray-100"
          />
          {/* Progress Ring */}
          <circle
            cx="96"
            cy="96"
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="text-brand-orange transition-all duration-1000 ease-out"
          />
        </svg>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-black text-gray-900 tracking-tighter">
            {percentage}<span className="text-2xl text-brand-orange">%</span>
          </span>
        </div>
      </div>

      <p className="text-sm font-medium text-gray-500 max-w-[200px] leading-relaxed">
        You have missed <span className="font-bold text-gray-900">2 classes</span> this semester. 
        Excellent standing.
      </p>
    </div>
  )
}
