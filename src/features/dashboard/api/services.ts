import type { ScheduleData } from '../types'

const MOCK_SCHEDULE_DATA: ScheduleData = {
  today: 'Monday, October 14th, 2024',
  calendar: {
    month: 'October 2024',
    days: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    dates: [12, 13, 14, 15, 16, 17, 18],
    currentDate: 14,
  },
  timeline: [
    {
      id: 1,
      time: '08:00',
      type: 'class',
      label: 'ARCHITECTURE STUDIO',
      title: 'Advanced Structural Systems',
      timeRange: '8:30 – 10:00 AM',
      professor: 'Prof. Elena Vance',
      location: 'Studio A, Floor 4',
      variant: 'default',
    },
    {
      id: 2,
      time: '10:42 AM',
      type: 'class',
      label: 'WORKSHOP',
      title: 'Design Thinking & Materiality',
      timeRange: '10:30 – 12:00 PM',
      professor: 'Dr. Marcus Thorne',
      location: 'Workshop Lab 2',
      variant: 'active',
      isCurrent: true,
      ongoing: true,
    },
    {
      id: 3,
      time: '12:30',
      type: 'break',
      title: 'Academic Lunch Break',
    },
    {
      id: 4,
      time: '14:00',
      type: 'class',
      label: 'THEORY',
      title: 'Contemporary Urbanism',
      timeRange: '2:00 – 3:30 PM',
      professor: 'Prof. Sarah Jenkins',
      location: 'Lecture Hall 3B',
      variant: 'default',
    },
  ],
  officeHours: {
    professor: 'Dr. Marcus Thorne',
    time: '1:00 PM — 3:00 PM',
    location: 'Room 402',
  },
};

export const getScheduleService = async (): Promise<ScheduleData> => {
  // In a real app:
  // const { data } = await apiClient.get<ScheduleData>(DASHBOARD_ROUTES.GET_SCHEDULE);
  // return data;
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_SCHEDULE_DATA);
    }, 800);
  });
};
