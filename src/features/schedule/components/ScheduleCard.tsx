import { Edit2, Trash2 } from 'lucide-react';
import type { ScheduleItem } from '../types';

interface ScheduleCardProps {
  item: ScheduleItem;
  viewMode: 'class' | 'teacher';
  onEdit: (item: ScheduleItem) => void;
  onDelete: (id: string) => void;
}

export const ScheduleCard = ({ item, viewMode, onEdit, onDelete }: ScheduleCardProps) => {
  return (
    <div className="relative group bg-brand-peach/30 hover:bg-brand-peach/60 transition-colors border border-brand-orange/20 rounded-xl p-3 shadow-sm h-full flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-1">
          <h4 className="font-bold text-gray-900 text-sm truncate">{item.subject}</h4>
          <span className="text-xs font-bold text-brand-orange bg-white px-1.5 py-0.5 rounded shadow-sm">
            {item.room}
          </span>
        </div>
        <p className="text-xs text-gray-500 font-medium mb-2">
          {item.startTime} - {item.endTime}
        </p>
        
        <div className="flex items-center gap-1.5 mt-auto">
          <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600">
            {viewMode === 'class' ? item.teacherName?.charAt(0) : item.className?.charAt(0)}
          </div>
          <span className="text-xs font-semibold text-gray-700 truncate">
            {viewMode === 'class' ? item.teacherName : item.className}
          </span>
        </div>
      </div>

      {/* Quick Actions (visible on hover) */}
      <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={(e) => { e.stopPropagation(); onEdit(item); }}
          className="p-1.5 bg-white text-gray-600 hover:text-brand-orange rounded shadow-md transition-colors"
          title="Edit"
        >
          <Edit2 size={12} />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}
          className="p-1.5 bg-white text-red-500 hover:text-red-700 rounded shadow-md transition-colors"
          title="Delete"
        >
          <Trash2 size={12} />
        </button>
      </div>
    </div>
  );
};
