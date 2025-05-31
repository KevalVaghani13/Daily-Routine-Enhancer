import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Brain, Heart, Target, Home, Sparkles, Plus } from 'lucide-react';
import { Task, TaskCategory, Priority, RepeatOption } from '@/types/task';

interface RoutineTemplatesProps {
  onAddTemplate: (tasks: Omit<Task, 'id' | 'completed' | 'streak' | 'order'>[]) => void;
}

const routineActivities = {
  Learning: {
    icon: BookOpen,
    color: 'bg-purple-100 text-purple-800 dark:bg-purple-800/30 dark:text-purple-300',
    activities: [
      { name: 'Reading', icon: '📚', time: '08:00', duration: 30, category: 'Study' as TaskCategory },
      { name: 'Online Course', icon: '💻', time: '09:00', duration: 45, category: 'Study' as TaskCategory },
      { name: 'Language Practice', icon: '🗣️', time: '19:00', duration: 25, category: 'Study' as TaskCategory },
      { name: 'Journaling', icon: '✍️', time: '21:00', duration: 15, category: 'Personal' as TaskCategory }
    ]
  },
  Mindfulness: {
    icon: Brain,
    color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-800/30 dark:text-indigo-300',
    activities: [
      { name: 'Meditation', icon: '🧘‍♀️', time: '07:00', duration: 15, category: 'Health' as TaskCategory },
      { name: 'Breathing Exercise', icon: '🌬️', time: '12:00', duration: 10, category: 'Health' as TaskCategory },
      { name: 'Stretching', icon: '🤸‍♀️', time: '07:30', duration: 15, category: 'Health' as TaskCategory },
      { name: 'Gratitude Reflection', icon: '🙏', time: '22:00', duration: 10, category: 'Personal' as TaskCategory }
    ]
  },
  Health: {
    icon: Heart,
    color: 'bg-pink-100 text-pink-800 dark:bg-pink-800/30 dark:text-pink-300',
    activities: [
      { name: 'Yoga', icon: '🧘‍♂️', time: '07:00', duration: 30, category: 'Health' as TaskCategory },
      { name: 'Workout', icon: '💪', time: '18:00', duration: 45, category: 'Health' as TaskCategory },
      { name: 'Walk', icon: '🚶‍♀️', time: '17:00', duration: 30, category: 'Health' as TaskCategory },
      { name: 'Water Intake Check', icon: '💧', time: '10:00', duration: 5, category: 'Health' as TaskCategory },
      { name: 'Sleep Reminder', icon: '😴', time: '22:30', duration: 5, category: 'Health' as TaskCategory }
    ]
  },
  Productivity: {
    icon: Target,
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-300',
    activities: [
      { name: 'Top 3 Priority Tasks', icon: '🎯', time: '09:00', duration: 60, category: 'Work' as TaskCategory },
      { name: 'Time Blocking', icon: '⏰', time: '08:30', duration: 15, category: 'Work' as TaskCategory },
      { name: 'Inbox Zero', icon: '📥', time: '16:00', duration: 20, category: 'Work' as TaskCategory },
      { name: 'Task Review', icon: '📋', time: '17:30', duration: 15, category: 'Work' as TaskCategory }
    ]
  },
  'Home/Lifestyle': {
    icon: Home,
    color: 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-300',
    activities: [
      { name: 'Desk Tidy-up', icon: '🗂️', time: '18:30', duration: 10, category: 'Personal' as TaskCategory },
      { name: 'Meal Planning', icon: '🍽️', time: '11:00', duration: 20, category: 'Personal' as TaskCategory },
      { name: 'Plant Watering', icon: '🪴', time: '08:00', duration: 10, category: 'Personal' as TaskCategory },
      { name: 'Laundry', icon: '👕', time: '14:00', duration: 30, category: 'Personal' as TaskCategory }
    ]
  },
  Special: {
    icon: Sparkles,
    color: 'bg-amber-100 text-amber-800 dark:bg-amber-800/30 dark:text-amber-300',
    activities: [
      { name: 'No Social Media Hour', icon: '📵', time: '20:00', duration: 60, category: 'Personal' as TaskCategory },
      { name: 'Digital Detox', icon: '🔌', time: '19:00', duration: 120, category: 'Personal' as TaskCategory },
      { name: 'Mindful Eating', icon: '🍎', time: '12:30', duration: 30, category: 'Health' as TaskCategory },
      { name: 'Music Break', icon: '🎵', time: '15:00', duration: 15, category: 'Relax' as TaskCategory }
    ]
  }
};

const predefinedTemplates = [
  {
    id: 'morning-routine',
    name: 'Energizing Morning',
    description: 'Start your day with focus and energy',
    icon: '🌅',
    activities: ['Meditation', 'Stretching', 'Reading', 'Top 3 Priority Tasks']
  },
  {
    id: 'self-care',
    name: 'Self-Care Day',
    description: 'Focus on wellness and personal care',
    icon: '💆‍♀️',
    activities: ['Yoga', 'Gratitude Reflection', 'Plant Watering', 'Music Break']
  },
  {
    id: 'productive-day',
    name: 'Productivity Focus',
    description: 'Maximize your work efficiency',
    icon: '⚡',
    activities: ['Time Blocking', 'Top 3 Priority Tasks', 'Inbox Zero', 'Task Review']
  },
  {
    id: 'mindful-evening',
    name: 'Mindful Evening',
    description: 'Wind down with intentional activities',
    icon: '🌙',
    activities: ['No Social Media Hour', 'Journaling', 'Breathing Exercise', 'Sleep Reminder']
  }
];

const RoutineTemplates: React.FC<RoutineTemplatesProps> = ({ onAddTemplate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  const addActivityToRoutine = (activityName: string) => {
    // Find the activity in all categories
    let foundActivity = null;
    for (const category of Object.values(routineActivities)) {
      const activity = category.activities.find(a => a.name === activityName);
      if (activity) {
        foundActivity = activity;
        break;
      }
    }

    if (foundActivity) {
      const task: Omit<Task, 'id' | 'completed' | 'streak' | 'order'> = {
        name: foundActivity.name,
        time: foundActivity.time,
        category: foundActivity.category,
        priority: 'medium' as Priority,
        icon: foundActivity.icon,
        repeat: 'daily' as RepeatOption,
        duration: foundActivity.duration,
        goal: 1
      };
      onAddTemplate([task]);
    }
  };

  const addTemplate = (template: typeof predefinedTemplates[0]) => {
    const tasks: Omit<Task, 'id' | 'completed' | 'streak' | 'order'>[] = [];
    
    template.activities.forEach(activityName => {
      for (const category of Object.values(routineActivities)) {
        const activity = category.activities.find(a => a.name === activityName);
        if (activity) {
          tasks.push({
            name: activity.name,
            time: activity.time,
            category: activity.category,
            priority: 'medium' as Priority,
            icon: activity.icon,
            repeat: 'daily' as RepeatOption,
            duration: activity.duration,
            goal: 1
          });
          break;
        }
      }
    });
    
    onAddTemplate(tasks);
  };

  const addCustomRoutine = () => {
    const tasks: Omit<Task, 'id' | 'completed' | 'streak' | 'order'>[] = [];
    
    selectedActivities.forEach(activityName => {
      for (const category of Object.values(routineActivities)) {
        const activity = category.activities.find(a => a.name === activityName);
        if (activity) {
          tasks.push({
            name: activity.name,
            time: activity.time,
            category: activity.category,
            priority: 'medium' as Priority,
            icon: activity.icon,
            repeat: 'daily' as RepeatOption,
            duration: activity.duration,
            goal: 1
          });
          break;
        }
      }
    });
    
    if (tasks.length > 0) {
      onAddTemplate(tasks);
      setSelectedActivities([]);
      setSelectedCategory(null);
    }
  };

  return (
    <Card className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl shadow-lg border-0 dark:shadow-slate-900/50">
      <CardHeader className="px-4 sm:px-6">
        <CardTitle className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-slate-100 flex items-center">
          <Sparkles className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-amber-500 dark:text-amber-400" />
          Routine Templates
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 px-4 sm:px-6">
        {/* Pre-made Templates */}
        <div>
          <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Quick Templates</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {predefinedTemplates.map((template) => (
              <div 
                key={template.id} 
                className="p-3 sm:p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg flex-shrink-0">{template.icon}</span>
                      <span className="font-medium text-slate-800 dark:text-slate-100 truncate text-sm sm:text-base">
                        {template.name}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                      {template.description}
                    </p>
                  </div>
                  <Button
                    onClick={() => addTemplate(template)}
                    size="sm"
                    className="ml-2 sm:ml-4 flex-shrink-0 bg-blue-600 hover:bg-blue-700 text-white h-7 sm:h-8 w-7 sm:w-8 p-0"
                  >
                    <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Categories */}
        <div>
          <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Browse by Category</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {Object.entries(routineActivities).map(([categoryName, category]) => {
              const IconComponent = category.icon;
              return (
                <Button
                  key={categoryName}
                  variant={selectedCategory === categoryName ? "default" : "outline"}
                  onClick={() => setSelectedCategory(selectedCategory === categoryName ? null : categoryName)}
                  className="h-auto p-2 sm:p-3 flex flex-col items-center space-y-1"
                >
                  <IconComponent className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-xs truncate w-full text-center">
                    {categoryName}
                  </span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Selected Category Activities */}
        {selectedCategory && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {selectedCategory} Activities
              </h3>
              {selectedActivities.length > 0 && (
                <Button
                  onClick={addCustomRoutine}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto"
                >
                  Add Selected ({selectedActivities.length})
                </Button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {routineActivities[selectedCategory as keyof typeof routineActivities].activities.map((activity) => (
                <div
                  key={activity.name}
                  className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <span className="text-lg flex-shrink-0">{activity.icon}</span>
                    <div className="min-w-0">
                      <span className="text-sm font-medium text-slate-800 dark:text-slate-100 truncate block">
                        {activity.name}
                      </span>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {activity.time}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {activity.duration}min
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => addActivityToRoutine(activity.name)}
                    size="sm"
                    variant="outline"
                    className="ml-2 flex-shrink-0 h-7 w-7 sm:h-8 sm:w-8 p-0"
                  >
                    <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RoutineTemplates;
