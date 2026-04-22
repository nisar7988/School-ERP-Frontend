import { Calendar as CalendarIcon, MapPin, Video } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const classes = [
  {
    id: 1,
    time: "10:00",
    period: "AM",
    name: "Data Structures & Algorithms",
    location: "Engineering Hall, Room 304",
    type: "in-person",
    status: "IN 45 MINS"
  },
  {
    id: 2,
    time: "1:30",
    period: "PM",
    name: "Linear Algebra",
    location: "Virtual Lecture",
    type: "virtual",
  }
]

export function TodaySchedule() {
  return (
    <div className="bg-brand-taupe/10 border border-brand-taupe/20 rounded-[32px] p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-brand-orange">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 display-title">Today's Schedule</h3>
        </div>
        <button className="text-sm font-bold text-brand-orange hover:underline underline-offset-4">
          View Full Calendar
        </button>
      </div>

      <div className="space-y-4">
        {classes.map((item) => (
          <div 
            key={item.id} 
            className="group flex items-center bg-white rounded-2xl p-6 shadow-sm border border-transparent hover:border-brand-taupe transition-all duration-300"
          >
            <div className="w-20 pr-6 border-r border-gray-100 flex flex-col items-center justify-center">
              <p className="text-lg font-extrabold text-gray-900 leading-none">{item.time}</p>
              <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">{item.period}</p>
            </div>
            
            <div className="flex-1 pl-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-gray-900 group-hover:text-brand-orange transition-colors">
                    {item.name}
                  </h4>
                  <div className="flex items-center gap-2 text-gray-400 font-medium">
                    {item.type === "virtual" ? (
                      <Video className="w-3.5 h-3.5 text-brand-orange" />
                    ) : (
                      <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                    )}
                    <span className="text-xs">{item.location}</span>
                  </div>
                </div>
                {item.status && (
                  <Badge className="bg-brand-orange/10 text-brand-orange border-none font-extrabold text-[9px] px-3 py-1 rounded-full uppercase tracking-wider animate-pulse">
                    {item.status}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
