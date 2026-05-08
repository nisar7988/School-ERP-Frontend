import type { ScheduleItem, CreateScheduleDto, UpdateScheduleDto, ScheduleQueryFilters } from '../types';

// Initial mock data
let MOCK_SCHEDULES: ScheduleItem[] = [
  {
    id: 's1',
    subject: 'Advanced Math',
    teacherId: 't1',
    teacherName: 'Dr. Sterling',
    classId: 'c1',
    className: 'Grade 11 - Alpha',
    room: 'Rm 302',
    dayOfWeek: 'MON',
    startTime: '08:00',
    endTime: '09:30',
  },
  {
    id: 's2',
    subject: 'Physics Lab',
    teacherId: 't2',
    teacherName: 'Prof. Chen',
    classId: 'c1',
    className: 'Grade 11 - Alpha',
    room: 'Lab A',
    dayOfWeek: 'WED',
    startTime: '08:00',
    endTime: '10:00',
  },
  {
    id: 's3',
    subject: 'Art History',
    teacherId: 't3',
    teacherName: 'J. Doe',
    classId: 'c1',
    className: 'Grade 11 - Alpha',
    room: 'Rm 105',
    dayOfWeek: 'THU',
    startTime: '08:00',
    endTime: '09:00',
  },
  {
    id: 's4',
    subject: 'Literature',
    teacherId: 't4',
    teacherName: 'A. Wright',
    classId: 'c1',
    className: 'Grade 11 - Alpha',
    room: 'Lib A',
    dayOfWeek: 'THU',
    startTime: '10:00',
    endTime: '11:30',
  },
];

// Helper to check for time overlap
const checkOverlap = (day: string, start: string, end: string, schedules: ScheduleItem[]) => {
  const toMinutes = (timeStr: string) => {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
  };
  const newStart = toMinutes(start);
  const newEnd = toMinutes(end);

  return schedules.some(s => {
    if (s.dayOfWeek !== day) return false;
    const sStart = toMinutes(s.startTime);
    const sEnd = toMinutes(s.endTime);
    // Overlap condition: start1 < end2 && start2 < end1
    return newStart < sEnd && sStart < newEnd;
  });
};

export const getSchedulesService = async (params?: ScheduleQueryFilters) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  let filtered = [...MOCK_SCHEDULES];
  if (params?.classId) {
    filtered = filtered.filter(s => s.classId === params.classId);
  }
  if (params?.teacherId) {
    filtered = filtered.filter(s => s.teacherId === params.teacherId);
  }

  // Wrapping in an axios-like structure to follow rules.md unwrapping
  return { data: { data: filtered } };
};

export const createScheduleService = async (data: CreateScheduleDto) => {
  await new Promise(resolve => setTimeout(resolve, 300));

  // Check class overlap
  const classSchedules = MOCK_SCHEDULES.filter(s => s.classId === data.classId);
  if (checkOverlap(data.dayOfWeek, data.startTime, data.endTime, classSchedules)) {
    throw new Error('This class already has a schedule during this time.');
  }

  // Check teacher overlap
  const teacherSchedules = MOCK_SCHEDULES.filter(s => s.teacherId === data.teacherId);
  if (checkOverlap(data.dayOfWeek, data.startTime, data.endTime, teacherSchedules)) {
    throw new Error('This teacher is already booked during this time.');
  }

  const newItem: ScheduleItem = {
    ...data,
    id: `s${Date.now()}`,
    // Mocking the names for display purposes since we don't have the full relation here
    teacherName: data.teacherId === 't1' ? 'Dr. Sterling' : 'Unknown Teacher',
    className: data.classId === 'c1' ? 'Grade 11 - Alpha' : 'Unknown Class',
  };

  MOCK_SCHEDULES.push(newItem);
  
  return { data: { data: newItem } };
};

export const updateScheduleService = async (id: string, data: UpdateScheduleDto) => {
  await new Promise(resolve => setTimeout(resolve, 300));

  const index = MOCK_SCHEDULES.findIndex(s => s.id === id);
  if (index === -1) throw new Error('Schedule not found');

  const existing = MOCK_SCHEDULES[index];
  const updated = { ...existing, ...data };

  // Validate overlap if time/day/teacher/class changed
  const checkTimeChanged = existing.dayOfWeek !== updated.dayOfWeek || 
                           existing.startTime !== updated.startTime || 
                           existing.endTime !== updated.endTime;

  if (checkTimeChanged || existing.classId !== updated.classId || existing.teacherId !== updated.teacherId) {
    // Filter out current schedule from check
    const otherSchedules = MOCK_SCHEDULES.filter(s => s.id !== id);
    
    if (checkOverlap(updated.dayOfWeek, updated.startTime, updated.endTime, otherSchedules.filter(s => s.classId === updated.classId))) {
       throw new Error('This class already has a schedule during this time.');
    }
    if (checkOverlap(updated.dayOfWeek, updated.startTime, updated.endTime, otherSchedules.filter(s => s.teacherId === updated.teacherId))) {
       throw new Error('This teacher is already booked during this time.');
    }
  }

  MOCK_SCHEDULES[index] = updated;
  return { data: { data: updated } };
};

export const deleteScheduleService = async (id: string) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  MOCK_SCHEDULES = MOCK_SCHEDULES.filter(s => s.id !== id);
  return { data: { message: 'Deleted successfully' } };
};
