import React, { useState } from 'react';
import { Filter, Calendar as CalendarIcon, CheckCircle2 } from 'lucide-react';
import { useSchedules } from '../api/queries';
import { useCreateSchedule, useUpdateSchedule, useDeleteSchedule } from '../api/mutations';
import { WeeklyTimetable } from './WeeklyTimetable';
import { ScheduleFormModal } from './ScheduleFormModal';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import type { ScheduleItem } from '../types';

export const ScheduleManagementPage = () => {
  const [viewMode, setViewMode] = useState<'class' | 'teacher'>('class');
  const [selectedClass, setSelectedClass] = useState<string>('c1');
  const [selectedTeacher, setSelectedTeacher] = useState<string>('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ScheduleItem | null>(null);
  const [defaultTime, setDefaultTime] = useState<{ day: string, time: string } | null>(null);

  const filters = viewMode === 'class' ? { classId: selectedClass } : { teacherId: selectedTeacher };
  // If no filter selected, don't fetch or show empty? 
  // We'll pass filters to useSchedules. If value is empty, the service currently returns all, but we could restrict it.
  
  const { data: schedules = [], isLoading } = useSchedules(filters);
  const createMutation = useCreateSchedule();
  const updateMutation = useUpdateSchedule();
  const deleteMutation = useDeleteSchedule();

  const handleAddSchedule = (day: string, time: string) => {
    setEditingItem(null);
    setDefaultTime({ day, time });
    setIsModalOpen(true);
  };

  const handleEditSchedule = (item: ScheduleItem) => {
    setEditingItem(item);
    setDefaultTime(null);
    setIsModalOpen(true);
  };

  const handleDeleteSchedule = async (id: string) => {
    if (confirm('Are you sure you want to delete this schedule?')) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const handleFormSubmit = async (data: any) => {
    try {
      if (editingItem) {
        await updateMutation.mutateAsync({ id: editingItem.id, data });
      } else {
        await createMutation.mutateAsync(data);
      }
      setIsModalOpen(false);
    } catch (error: any) {
      // Toast error is handled in mutation hook, but we can catch to prevent modal close
      console.error(error);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen bg-[#FDFBF9]">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900 display-title">Schedule Management</h1>
          <p className="text-gray-500 font-medium mt-1">Organize and resolve academic timetables across departments.</p>
        </div>
        <div className="flex bg-white rounded-xl p-1.5 border border-gray-200 shadow-sm">
          <button
            onClick={() => setViewMode('class')}
            className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${
              viewMode === 'class' ? 'bg-brand-orange text-white shadow-md' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Class Schedule
          </button>
          <button
            onClick={() => setViewMode('teacher')}
            className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${
              viewMode === 'teacher' ? 'bg-brand-orange text-white shadow-md' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Teacher Schedule
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-6">
          {/* Filters Bar */}
          <div className="flex gap-4 p-4 bg-brand-taupe/30 rounded-2xl border border-brand-taupe">
            <div className="flex items-center gap-2 text-gray-500 font-bold text-sm px-2">
              <Filter size={16} /> FILTERS
            </div>
            
            {viewMode === 'class' ? (
              <select 
                className="bg-white border-none rounded-xl px-4 py-2 text-sm font-bold text-gray-700 shadow-sm focus:ring-2 focus:ring-brand-orange outline-none"
                value={selectedClass}
                onChange={e => setSelectedClass(e.target.value)}
              >
                <option value="">Select Class</option>
                <option value="c1">Grade 11 - Alpha</option>
                <option value="c2">Grade 11 - Beta</option>
              </select>
            ) : (
              <select 
                className="bg-white border-none rounded-xl px-4 py-2 text-sm font-bold text-gray-700 shadow-sm focus:ring-2 focus:ring-brand-orange outline-none"
                value={selectedTeacher}
                onChange={e => setSelectedTeacher(e.target.value)}
              >
                <option value="">Select Teacher</option>
                <option value="t1">Dr. E. Sterling</option>
                <option value="t2">Prof. M. Chen</option>
                <option value="t3">J. Doe</option>
                <option value="t4">A. Wright</option>
              </select>
            )}
            
            <Button onClick={() => handleAddSchedule('MON', '08:00')} className="ml-auto bg-gray-900 text-white rounded-xl shadow-md hover:bg-gray-800">
              <CalendarIcon size={16} className="mr-2" /> Add Schedule
            </Button>
          </div>

          {/* Timetable */}
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-gray-900">Weekly Timetable</h3>
              <div className="text-sm font-bold text-gray-500 flex items-center gap-2">
                <span>&lt; Oct 16 - Oct 20, 2023 &gt;</span>
              </div>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-20 w-full rounded-2xl" />
                <Skeleton className="h-20 w-full rounded-2xl" />
                <Skeleton className="h-20 w-full rounded-2xl" />
              </div>
            ) : (
              <WeeklyTimetable 
                schedules={schedules} 
                viewMode={viewMode}
                onAddSchedule={handleAddSchedule}
                onEditSchedule={handleEditSchedule}
                onDeleteSchedule={handleDeleteSchedule}
              />
            )}
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="w-full lg:w-80 space-y-6">
          <div className="bg-green-50 rounded-[2rem] p-6 border border-green-100">
            <div className="flex items-center gap-3 text-green-700 font-bold mb-2">
              <CheckCircle2 size={20} />
              <h4>Conflict Check</h4>
            </div>
            <p className="text-sm text-green-600 font-medium">All schedules are validated. No overlaps detected.</p>
          </div>

          <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm">
            <h4 className="font-black text-gray-900 mb-4">Teacher Workload</h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                  <span>Dr. E. Sterling</span>
                  <span>14/20 hrs</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-orange w-[70%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                  <span>Prof. M. Chen</span>
                  <span>18/20 hrs</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-800 w-[90%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ScheduleFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingItem}
        defaultTime={defaultTime}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
};
