import { Edit2, Trash2 } from 'lucide-react';
import type { ScheduleItem } from '../types';

interface ScheduleCardProps {
  item: ScheduleItem;
  viewMode: 'class' | 'teacher';
  onEdit?: (item: ScheduleItem) => void;
  onDelete?: (id: string) => void;
  isCurrent?: boolean;
}

export const ScheduleCard = ({ item, viewMode, onEdit, onDelete, isCurrent }: ScheduleCardProps) => {
  const formatTime = (timeStr: string) => {
    if (!timeStr) return '';
    if (timeStr.includes('T')) {
      return new Date(timeStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    }
    return timeStr;
  };

  const subjectName = item.subject?.name || item.subjectName;
  const teacherName = item.teacher ? `${item.teacher.user.firstName} ${item.teacher.user.lastName}` : item.teacherName;
  const className = item.class ? `${item.class.name} - ${item.class.section}` : item.className;

  return (
    <div className={`relative group transition-all duration-500 rounded-xl p-3 shadow-sm h-full flex flex-col justify-between border-2 ${
      isCurrent 
        ? 'bg-brand-orange text-white border-brand-orange shadow-lg shadow-brand-orange/20 ring-4 ring-brand-orange/10 scale-[1.02]' 
        : 'bg-brand-peach/30 hover:bg-brand-peach/60 border-brand-orange/10 hover:border-brand-orange/30'
    }`}>
      <div>
        <div className="flex justify-between items-start mb-1">
          <h4 className={`font-black text-sm truncate ${isCurrent ? 'text-white' : 'text-gray-900'}`}>
            {subjectName}
          </h4>
          {isCurrent ? (
            <div className="bg-white text-brand-orange text-[8px] font-black px-1.5 py-0.5 rounded animate-pulse shadow-sm flex items-center gap-1">
              IN SESSION
            </div>
          ) : (
            <span className="text-[10px] font-black text-brand-orange bg-white px-1.5 py-0.5 rounded shadow-sm border border-brand-orange/5">
              {item.room}
            </span>
          )}
        </div>
        <p className={`text-[10px] font-bold mb-2 tracking-tight ${isCurrent ? 'text-orange-100' : 'text-gray-500'}`}>
          {formatTime(item.startTime)} — {formatTime(item.endTime)}
        </p>
        
        <div className="flex items-center gap-2 mt-auto">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black shadow-inner ${
            isCurrent ? 'bg-orange-400 text-white' : 'bg-white text-gray-400'
          }`}>
            {(viewMode === 'class' ? teacherName : className)?.charAt(0)}
          </div>
          <span className={`text-[10px] font-bold truncate ${isCurrent ? 'text-white' : 'text-gray-700'}`}>
            {viewMode === 'class' ? teacherName : className}
          </span>
        </div>
      </div>

      {/* Quick Actions (visible on hover) */}
      {(onEdit || onDelete) && (
        <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {onEdit && (
            <button 
              onClick={(e) => { e.stopPropagation(); onEdit(item); }}
              className="p-1.5 bg-white text-gray-600 hover:text-brand-orange rounded shadow-md transition-colors"
              title="Edit"
            >
              <Edit2 size={12} />
            </button>
          )}
          {onDelete && (
            <button 
              onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}
              className="p-1.5 bg-white text-red-500 hover:text-red-700 rounded shadow-md transition-colors"
              title="Delete"
            >
              <Trash2 size={12} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
