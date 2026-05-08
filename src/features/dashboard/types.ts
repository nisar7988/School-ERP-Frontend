export interface ScheduleEvent {
  id: number;
  time: string;
  type: 'class' | 'break';
  label?: string;
  title: string;
  timeRange?: string;
  professor?: string;
  location?: string;
  variant?: 'default' | 'active';
  isCurrent?: boolean;
  ongoing?: boolean;
}

export interface ScheduleData {
  today: string;
  calendar: {
    month: string;
    days: string[];
    dates: number[];
    currentDate: number;
  };
  timeline: ScheduleEvent[];
  officeHours: {
    professor: string;
    time: string;
    location: string;
  };
}
