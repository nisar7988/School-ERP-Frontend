import { useState, useEffect } from 'react';
import { Plus, Clock } from 'lucide-react';
import type { ScheduleItem } from '../types';
import { ScheduleCard } from './ScheduleCard';

interface WeeklyTimetableProps {
  schedules: ScheduleItem[];
  viewMode: 'class' | 'teacher';
  onAddSchedule?: (day: string, time: string) => void;
  onEditSchedule?: (item: ScheduleItem) => void;
  onDeleteSchedule?: (id: string) => void;
}

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const START_HOUR = 7;
const END_HOUR = 21;
const HOURS = Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, i) => START_HOUR + i);

export const WeeklyTimetable = ({
  schedules,
  viewMode,
  onAddSchedule,
  onEditSchedule,
  onDeleteSchedule
}: WeeklyTimetableProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const toMinutes = (t: string) => {
    if (!t) return 0;
    let hours = 0;
    let minutes = 0;

    if (t.includes('T')) {
      const date = new Date(t);
      hours = date.getHours();
      minutes = date.getMinutes();
    } else {
      const [h, m] = t.split(':').map(Number);
      hours = h;
      minutes = m;
    }
    
    return hours * 60 + minutes;
  };

  const getPositionStyles = (startTime: string, endTime: string) => {
    const startMins = toMinutes(startTime);
    const endMins = toMinutes(endTime);
    const dayStartMins = START_HOUR * 60;
    
    const top = ((startMins - dayStartMins) / 60) * 80; // 80px per hour
    const height = ((endMins - startMins) / 60) * 80;
    
    return { top: `${top}px`, height: `${height}px` };
  };

  const currentDayName = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][currentTime.getDay()];
  const currentTotalMins = currentTime.getHours() * 60 + currentTime.getMinutes();
  
  const isCurrentlyHappening = (item: ScheduleItem) => {
    if (item.dayOfWeek !== currentDayName) return false;
    const start = toMinutes(item.startTime);
    const end = toMinutes(item.endTime);
    return currentTotalMins >= start && currentTotalMins <= end;
  };

  const getTimeIndicatorStyles = () => {
    const dayStartMins = START_HOUR * 60;
    const top = ((currentTotalMins - dayStartMins) / 60) * 80;
    return { top: `${top}px` };
  };

  return (
    <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 p-8 overflow-x-auto">
      <div className="min-w-[900px]">
        {/* Header (Days) */}
        <div className="flex pl-20 border-b border-gray-100 pb-6 mb-6">
          {DAYS.map(day => (
            <div key={day} className={`flex-1 text-center font-black text-xs tracking-[0.2em] uppercase transition-colors ${day === currentDayName ? 'text-brand-orange' : 'text-gray-400'}`}>
              {day}
              {day === currentDayName && (
                <div className="w-1.5 h-1.5 bg-brand-orange rounded-full mx-auto mt-2 animate-pulse" />
              )}
            </div>
          ))}
        </div>

        {/* Grid Body */}
        <div className="relative">
          {/* Background Grid Lines & Hour Labels */}
          {HOURS.map(hour => (
            <div key={hour} className="flex items-start h-[80px] group relative">
              <div className="w-20 text-right pr-6 text-[10px] font-black text-gray-400 -mt-2 tracking-widest">
                {hour === 12 ? '12:00 PM' : hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`}
              </div>
              <div className="flex-1 border-t border-gray-100 flex relative h-full">
                {DAYS.map(day => (
                  <div 
                    key={day} 
                    className={`flex-1 border-l border-gray-50 border-dashed first:border-l-0 relative group/slot transition-colors ${day === currentDayName ? 'bg-orange-50/10' : ''} ${onAddSchedule ? 'cursor-pointer hover:bg-orange-50/50' : ''}`}
                    onClick={() => onAddSchedule?.(day, `${hour.toString().padStart(2, '0')}:00`)}
                  >
                    {onAddSchedule && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/slot:opacity-100 transition-opacity">
                        <div className="bg-white text-brand-orange text-[10px] font-bold px-2 py-1 rounded shadow-sm flex items-center gap-1 pointer-events-none">
                          <Plus size={10} /> Add
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Time Indicator Line */}
          {DAYS.includes(currentDayName) && currentTotalMins >= START_HOUR * 60 && currentTotalMins <= END_HOUR * 60 && (
            <div 
              className="absolute left-20 right-0 z-20 pointer-events-none border-t-2 border-brand-orange/40 flex items-center"
              style={getTimeIndicatorStyles()}
            >
              <div className="absolute -left-16 bg-brand-orange text-white text-[9px] font-black px-1.5 py-0.5 rounded flex items-center gap-1 shadow-md shadow-orange-100">
                <Clock size={8} className="animate-pulse" /> NOW
              </div>
            </div>
          )}

          {/* Schedule Cards Overlay */}
          <div className="absolute top-0 left-20 right-0 bottom-0 pointer-events-none flex">
            {DAYS.map(day => {
              const daySchedules = schedules.filter(s => s.dayOfWeek === day);
              return (
                <div key={day} className="flex-1 relative border-l border-transparent first:border-l-0">
                  {daySchedules.map(item => {
                    const styles = getPositionStyles(item.startTime, item.endTime);
                    const isCurrent = isCurrentlyHappening(item);
                    return (
                      <div 
                        key={item.id} 
                        className={`absolute left-1.5 right-1.5 pointer-events-auto transition-all duration-500 ${isCurrent ? 'z-30 scale-[1.02]' : 'z-10'}`}
                        style={styles}
                      >
                        <ScheduleCard 
                          item={item} 
                          viewMode={viewMode}
                          onEdit={onEditSchedule}
                          onDelete={onDeleteSchedule}
                          isCurrent={isCurrent}
                        />
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
