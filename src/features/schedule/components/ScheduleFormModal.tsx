import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog } from '@/components/ui/Dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { ScheduleItem, CreateScheduleDto } from '../types';

const scheduleSchema = z.object({
  subject: z.string().min(1, 'Subject is required'),
  teacherId: z.string().min(1, 'Teacher is required'),
  classId: z.string().min(1, 'Class is required'),
  room: z.string().min(1, 'Room is required'),
  dayOfWeek: z.enum(['MON', 'TUE', 'WED', 'THU', 'FRI']),
  startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format (HH:MM)'),
  endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format (HH:MM)'),
});

type ScheduleFormData = z.infer<typeof scheduleSchema>;

interface ScheduleFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateScheduleDto) => void;
  initialData?: ScheduleItem | null;
  defaultTime?: { day: string, time: string } | null;
  isLoading: boolean;
}

export const ScheduleFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  defaultTime,
  isLoading
}: ScheduleFormModalProps) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ScheduleFormData>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      subject: '',
      teacherId: '',
      classId: '',
      room: '',
      dayOfWeek: 'MON',
      startTime: '08:00',
      endTime: '09:00',
    }
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        reset({
          subject: initialData.subject,
          teacherId: initialData.teacherId,
          classId: initialData.classId,
          room: initialData.room,
          dayOfWeek: initialData.dayOfWeek as any,
          startTime: initialData.startTime,
          endTime: initialData.endTime,
        });
      } else if (defaultTime) {
        reset({
          subject: '',
          teacherId: '',
          classId: '',
          room: '',
          dayOfWeek: defaultTime.day as any,
          startTime: defaultTime.time,
          endTime: `${(parseInt(defaultTime.time.split(':')[0]) + 1).toString().padStart(2, '0')}:00`,
        });
      } else {
        reset({
          subject: '',
          teacherId: '',
          classId: '',
          room: '',
          dayOfWeek: 'MON',
          startTime: '08:00',
          endTime: '09:00',
        });
      }
    }
  }, [isOpen, initialData, defaultTime, reset]);

  return (
    <Dialog 
      isOpen={isOpen} 
      onClose={onClose} 
      title={initialData ? "Edit Schedule" : "Add Schedule"}
      variant="default"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-700">Subject</label>
          <Input {...register('subject')} placeholder="e.g. Advanced Math" />
          {errors.subject && <p className="text-xs text-red-500">{errors.subject.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">Teacher</label>
            <select {...register('teacherId')} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <option value="">Select Teacher</option>
              <option value="t1">Dr. Sterling</option>
              <option value="t2">Prof. Chen</option>
              <option value="t3">J. Doe</option>
              <option value="t4">A. Wright</option>
            </select>
            {errors.teacherId && <p className="text-xs text-red-500">{errors.teacherId.message}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">Class</label>
            <select {...register('classId')} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <option value="">Select Class</option>
              <option value="c1">Grade 11 - Alpha</option>
              <option value="c2">Grade 11 - Beta</option>
            </select>
            {errors.classId && <p className="text-xs text-red-500">{errors.classId.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">Room</label>
            <Input {...register('room')} placeholder="e.g. Rm 302" />
            {errors.room && <p className="text-xs text-red-500">{errors.room.message}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">Day</label>
            <select {...register('dayOfWeek')} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <option value="MON">Monday</option>
              <option value="TUE">Tuesday</option>
              <option value="WED">Wednesday</option>
              <option value="THU">Thursday</option>
              <option value="FRI">Friday</option>
            </select>
            {errors.dayOfWeek && <p className="text-xs text-red-500">{errors.dayOfWeek.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">Start Time</label>
            <Input {...register('startTime')} type="time" />
            {errors.startTime && <p className="text-xs text-red-500">{errors.startTime.message}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">End Time</label>
            <Input {...register('endTime')} type="time" />
            {errors.endTime && <p className="text-xs text-red-500">{errors.endTime.message}</p>}
          </div>
        </div>

        <div className="flex gap-3 justify-end pt-4">
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={isLoading} className="bg-brand-orange hover:bg-orange-600 text-white font-bold">
            {isLoading ? 'Saving...' : 'Save Schedule'}
          </Button>
        </div>
      </form>
    </Dialog>
  );
};
