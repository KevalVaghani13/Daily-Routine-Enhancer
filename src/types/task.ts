
export type TaskCategory = 'Health' | 'Work' | 'Personal' | 'Relax' | 'Learning' | 'Social' | 'Study' | 'Family' | 'Finance' | 'Misc';

export type Priority = 'low' | 'medium' | 'high';

export type RepeatOption = 'daily' | 'weekly' | 'weekdays' | 'weekends' | 'custom' | 'none';

export interface Task {
  id: string;
  name: string;
  time: string;
  category: TaskCategory;
  priority: Priority;
  icon: string;
  completed: boolean;
  streak?: number;
  repeat: RepeatOption;
  order: number;
  notes?: string;
  goal?: number;
  duration?: number; // in minutes
}

export interface RoutineTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  tasks: Omit<Task, 'id' | 'completed' | 'streak' | 'order'>[];
}

export interface Mood {
  id: string;
  date: string;
  mood: 'excellent' | 'good' | 'okay' | 'poor' | 'terrible';
  color: string;
  emoji: string;
  notes?: string;
}
