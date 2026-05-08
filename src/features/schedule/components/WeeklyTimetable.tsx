import React from 'react';
import { Plus } from 'lucide-react';
import type { ScheduleItem } from '../types';
import { ScheduleCard } from './ScheduleCard';

interface WeeklyTimetableProps {
  schedules: ScheduleItem[];
  viewMode: 'class' | 'teacher';
  onAddSchedule: (day: string, time: string) => void;
  onEditSchedule: (item: ScheduleItem) => void;
  onDeleteSchedule: (id: string) => void;
}

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
const START_HOUR = 8;
const END_HOUR = 16;
const HOURS = Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, i) => START_HOUR + i);

export const WeeklyTimetable = ({
  schedules,
  viewMode,
  onAddSchedule,
  onEditSchedule,
  onDeleteSchedule
}: WeeklyTimetableProps) => {

  const getPositionStyles = (startTime: string, endTime: string) => {
    const toMinutes = (t: string) => {
      const [h, m] = t.split(':').map(Number);
      return h * 60 + m;
    };
    
    const startMins = toMinutes(startTime);
    const endMins = toMinutes(endTime);
    const dayStartMins = START_HOUR * 60;
    
    const top = ((startMins - dayStartMins) / 60) * 80; // 80px per hour
    const height = ((endMins - startMins) / 60) * 80;
    
    return { top: `${top}px`, height: `${height}px` };
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-6 overflow-x-auto">
      <div className="min-w-[800px]">
        {/* Header (Days) */}
        <div className="flex pl-16 border-b border-gray-100 pb-4 mb-4">
          {DAYS.map(day => (
            <div key={day} className="flex-1 text-center font-black text-gray-500 text-xs tracking-widest">
              {day}
            </div>
          ))}
        </div>

        {/* Grid Body */}
        <div className="relative">
          {/* Background Grid Lines & Hour Labels */}
          {HOURS.map(hour => (
            <div key={hour} className="flex items-start h-[80px] group relative">
              <div className="w-16 text-right pr-4 text-xs font-bold text-gray-400 -mt-2">
                {hour === 12 ? '12:00 PM' : hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`}
              </div>
              <div className="flex-1 border-t border-gray-100 flex relative h-full">
                {DAYS.map(day => (
                  <div 
                    key={day} 
                    className="flex-1 border-l border-gray-50 border-dashed first:border-l-0 relative group/slot cursor-pointer hover:bg-orange-50/50 transition-colors"
                    onClick={() => onAddSchedule(day, `${hour.toString().padStart(2, '0')}:00`)}
                  >
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/slot:opacity-100 transition-opacity">
                      <div className="bg-white text-brand-orange text-[10px] font-bold px-2 py-1 rounded shadow-sm flex items-center gap-1 pointer-events-none">
                        <Plus size={10} /> Add
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Schedule Cards Overlay */}
          <div className="absolute top-0 left-16 right-0 bottom-0 pointer-events-none flex">
            {DAYS.map(day => {
              const daySchedules = schedules.filter(s => s.dayOfWeek === day);
              return (
                <div key={day} className="flex-1 relative border-l border-transparent first:border-l-0">
                  {daySchedules.map(item => {
                    const styles = getPositionStyles(item.startTime, item.endTime);
                    return (
                      <div 
                        key={item.id} 
                        className="absolute left-1 right-1 pointer-events-auto z-10"
                        style={styles}
                      >
                        <ScheduleCard 
                          item={item} 
                          viewMode={viewMode}
                          onEdit={onEditSchedule}
                          onDelete={onDeleteSchedule}
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
