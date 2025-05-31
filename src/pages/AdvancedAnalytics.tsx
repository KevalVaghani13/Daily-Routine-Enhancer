
import React from 'react';
import Navigation from '@/components/Navigation';
import ExpandedAnalytics from '@/components/ExpandedAnalytics';
import { Task } from '@/types/task';

const AdvancedAnalytics = () => {
  // In a real app, this would come from your data store
  const sampleTasks: Task[] = [
    {
      id: '1',
      name: 'Morning Meditation',
      time: '07:00',
      category: 'Health',
      priority: 'high',
      icon: '🧘‍♀️',
      completed: true,
      streak: 15,
      repeat: 'daily',
      order: 0,
      duration: 15,
      goal: 1
    },
    {
      id: '2',
      name: 'Exercise',
      time: '07:30',
      category: 'Health',
      priority: 'high',
      icon: '🏃‍♂️',
      completed: true,
      streak: 12,
      repeat: 'daily',
      order: 1,
      duration: 45,
      goal: 1
    },
    {
      id: '3',
      name: 'Read Technical Book',
      time: '19:00',
      category: 'Study',
      priority: 'medium',
      icon: '📚',
      completed: false,
      streak: 8,
      repeat: 'daily',
      order: 2,
      duration: 30,
      goal: 1
    },
    {
      id: '4',
      name: 'Check Emails',
      time: '09:00',
      category: 'Work',
      priority: 'high',
      icon: '📧',
      completed: true,
      streak: 20,
      repeat: 'weekdays',
      order: 3,
      duration: 20,
      goal: 1
    },
    {
      id: '5',
      name: 'Family Dinner',
      time: '18:30',
      category: 'Family',
      priority: 'high',
      icon: '🍽️',
      completed: true,
      streak: 25,
      repeat: 'daily',
      order: 4,
      duration: 60,
      goal: 1
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-800 dark:from-slate-100 dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent mb-3">
            Advanced Analytics
          </h1>
          <p className="text-base lg:text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
            Deep insights into your routine performance, patterns, and progress over time.
          </p>
        </div>

        <ExpandedAnalytics tasks={sampleTasks} />
      </div>
    </div>
  );
};

export default AdvancedAnalytics;
