import { MoreHorizontal } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const data = [
  { day: "Mon", height: "40%" },
  { day: "Tue", height: "60%" },
  { day: "Wed", height: "95%", active: true },
  { day: "Thu", height: "50%" },
  { day: "Fri", height: "70%" },
]

export function TeacherAttendance() {
  return (
    <Card className="h-full border-none shadow-none bg-brand-peach/10 rounded-[32px] p-8">
      <CardHeader className="p-0 mb-10 flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold text-gray-900">Weekly Attendance</CardTitle>
        <Button variant="ghost" size="icon" className="text-gray-400">
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex items-end justify-between h-56 gap-6 px-4">
          {data.map((item) => (
            <div key={item.day} className="flex-1 flex flex-col items-center gap-6">
              <div 
                className={`w-full max-w-[40px] transition-all duration-500 rounded-full relative group cursor-pointer ${
                  item.active ? "bg-brand-orange shadow-lg shadow-orange-100" : "bg-brand-peach/40 hover:bg-brand-orange/30"
                }`}
                style={{ height: item.height }}
              >
                 {item.active && (
                   <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                     Peak Attendance
                     <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                   </div>
                 )}
              </div>
              <span className={`text-xs font-bold ${item.active ? "text-brand-orange" : "text-gray-400"}`}>
                {item.day}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-12 flex items-center gap-8 justify-center">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-brand-orange" />
            <span className="text-xs font-bold text-gray-500">Present</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-brand-peach/40" />
            <span className="text-xs font-bold text-gray-500">Absent/Late</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
