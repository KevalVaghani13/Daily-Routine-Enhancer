import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import { Plus, Target, Calendar, TrendingUp, Clock, Sparkles, Brain } from 'lucide-react';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import RoutineTemplates from '@/components/RoutineTemplates';
import DailyStats from '@/components/DailyStats';
import PomodoroTimer from '@/components/PomodoroTimer';
import WaterIntakeTracker from '@/components/WaterIntakeTracker';
import HealthTrackers from '@/components/HealthTrackers';
import DailyFocusTask from '@/components/DailyFocusTask';
import { Task } from '@/types/task';
import { notificationService } from '@/services/notificationService';

const MyRoutine = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      name: 'Morning Meditation',
      time: '07:00',
      category: 'Health',
      priority: 'high',
      icon: '🧘‍♀️',
      completed: false,
      streak: 5,
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
    }
  ]);

  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [showAIAnalysis, setShowAIAnalysis] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<{
    activities: { name: string; description: string; time: string; duration: string; category: string }[];
    improvements: string[];
    schedule: string[];
  } | null>(null);

  useEffect(() => {
    const settings = localStorage.getItem('notificationSettings');
    if (settings) {
      const notificationSettings = JSON.parse(settings);
      if (notificationSettings.enabled && notificationSettings.taskReminders) {
        tasks.forEach(task => {
          if (!task.completed) {
            notificationService.scheduleTaskReminder(
              task.name,
              task.time,
              notificationSettings.reminderMinutes
            );
          }
        });
      }
    }
  }, [tasks]);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        const newCompleted = !task.completed;
        const newStreak = newCompleted ? (task.streak || 0) + 1 : Math.max(0, (task.streak || 0) - 1);
        return { ...task, completed: newCompleted, streak: newStreak };
      }
      return task;
    }));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const addTask = (newTask: Omit<Task, 'id' | 'completed' | 'streak' | 'order'>) => {
    const task: Task = {
      id: Date.now().toString(),
      ...newTask,
      completed: false,
      streak: 0,
      order: tasks.length
    };
    setTasks([...tasks, task]);
    setShowTaskForm(false);
  };

  const editTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    setEditingTask(undefined);
    setShowTaskForm(false);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const reorderTasks = (dragIndex: number, hoverIndex: number) => {
    const draggedTask = tasks[dragIndex];
    const newTasks = [...tasks];
    newTasks.splice(dragIndex, 1);
    newTasks.splice(hoverIndex, 0, draggedTask);
    setTasks(newTasks.map((task, index) => ({ ...task, order: index })));
  };

  const addTemplate = (templateTasks: Omit<Task, 'id' | 'completed' | 'streak' | 'order'>[]) => {
    const newTasks = templateTasks.map((task, index) => ({
      ...task,
      id: Date.now().toString() + index,
      completed: false,
      streak: 0,
      order: tasks.length + index
    }));
    setTasks([...tasks, ...newTasks]);
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const completionPercentage = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  const analyzeRoutine = async () => {
    setShowAIAnalysis(true);
    setLoadingSuggestions(true);

    // Analyze current routine patterns
    const morningTasks = tasks.filter(task => task.time < '12:00');
    const afternoonTasks = tasks.filter(task => task.time >= '12:00' && task.time < '17:00');
    const eveningTasks = tasks.filter(task => task.time >= '17:00');

    // Calculate time gaps and identify patterns
    const timeGaps = [];
    const sortedTasks = [...tasks].sort((a, b) => a.time.localeCompare(b.time));
    for (let i = 0; i < sortedTasks.length - 1; i++) {
      const currentTime = new Date(`2000-01-01T${sortedTasks[i].time}`);
      const nextTime = new Date(`2000-01-01T${sortedTasks[i + 1].time}`);
      const gapHours = (nextTime.getTime() - currentTime.getTime()) / (1000 * 60 * 60);
      if (gapHours > 2) {
        timeGaps.push({
          start: sortedTasks[i].time,
          end: sortedTasks[i + 1].time,
          duration: gapHours
        });
      }
    }

    // Analyze task distribution
    const taskCategories = tasks.reduce((acc, task) => {
      acc[task.category] = (acc[task.category] || 0) + 1;
      return acc;
    }, {});

    // Generate personalized suggestions
    const suggestions = {
      activities: [],
      improvements: [],
      schedule: []
    };

    // Suggest activities based on time gaps
    timeGaps.forEach(gap => {
      if (gap.duration >= 2 && gap.duration <= 4) {
        suggestions.activities.push({
          name: 'Power Nap',
          description: `Take a ${Math.floor(gap.duration * 0.5)}-minute power nap between ${gap.start} and ${gap.end} to boost productivity`,
          time: gap.start,
          duration: '30',
          category: 'Health'
        });
      }
    });

    // Suggest activities based on time of day
    if (morningTasks.length === 0) {
      suggestions.activities.push({
        name: 'Morning Meditation',
        description: 'Start your day with a 15-minute meditation session',
        time: '07:00',
        duration: '15',
        category: 'Mindfulness'
      });
    }

    if (afternoonTasks.length === 0) {
      suggestions.activities.push({
        name: 'Afternoon Walk',
        description: 'Take a 20-minute walk to refresh your mind',
        time: '14:00',
        duration: '20',
        category: 'Health'
      });
    }

    if (eveningTasks.length === 0) {
      suggestions.activities.push({
        name: 'Evening Reflection',
        description: 'Spend 15 minutes reflecting on your day',
        time: '20:00',
        duration: '15',
        category: 'Mindfulness'
      });
    }

    // Suggest improvements based on task distribution
    const categories = Object.keys(taskCategories);
    if (categories.length < 3) {
      suggestions.improvements.push(
        'Consider adding more variety to your routine by including tasks from different categories'
      );
    }

    // Suggest schedule optimizations
    if (timeGaps.length > 0) {
      const largestGap = timeGaps.reduce((max, gap) => gap.duration > max.duration ? gap : max);
      suggestions.schedule.push(
        `You have a ${Math.floor(largestGap.duration)}-hour gap between ${largestGap.start} and ${largestGap.end}. Consider redistributing tasks to make better use of this time.`
      );
    }

    // Add more specific suggestions based on task patterns
    const consecutiveTasks = tasks.filter(task => task.duration > 60);
    if (consecutiveTasks.length > 2) {
      suggestions.improvements.push(
        'You have several long tasks scheduled consecutively. Consider adding short breaks between them to maintain focus.'
      );
    }

    // Add suggestions based on time of day
    const earlyTasks = tasks.filter(task => task.time < '08:00');
    if (earlyTasks.length === 0) {
      suggestions.improvements.push(
        'Consider starting your day earlier to make the most of your morning energy'
      );
    }

    const lateTasks = tasks.filter(task => task.time > '22:00');
    if (lateTasks.length > 0) {
      suggestions.improvements.push(
        'You have tasks scheduled late at night. Consider moving them earlier to improve sleep quality'
      );
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    setAiSuggestions(suggestions);
    setLoadingSuggestions(false);
  };

  const applySuggestion = (suggestion: string) => {
    // Convert suggestion to a new task
    const newTask: Omit<Task, 'id' | 'completed' | 'streak' | 'order'> = {
      name: suggestion,
      time: '09:00', // Default time
      category: 'Health',
      priority: 'medium',
      icon: '✨',
      repeat: 'daily',
      duration: 15,
      goal: 1
    };
    addTask(newTask);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/30 via-purple-50/20 to-pink-50/30 dark:from-slate-950 dark:via-purple-950/20 dark:to-pink-950/20">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 dark:from-indigo-300 dark:via-purple-300 dark:to-pink-300 bg-clip-text text-transparent mb-3">
                My Daily Routine
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Transform your day with intentional habits.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={analyzeRoutine}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                <Brain className="h-4 w-4 mr-2" />
                Analyze Routine
              </Button>
              <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-300 bg-white/80 dark:bg-slate-800/80 px-4 py-2 rounded-full">
                <Calendar className="h-4 w-4 text-indigo-400" />
                <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Analysis Modal */}
        {showAIAnalysis && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold flex items-center">
                    <Brain className="h-6 w-6 text-purple-500 mr-2" />
                    AI Routine Analysis
                  </h2>
                  <Button
                    variant="ghost"
                    onClick={() => setShowAIAnalysis(false)}
                    className="text-slate-500 hover:text-slate-700"
                  >
                    ✕
                  </Button>
                </div>

                {aiSuggestions && (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold flex items-center">
                          <Sparkles className="h-4 w-4 text-yellow-500 mr-2" />
                          Suggested Activities
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {aiSuggestions.activities.map((activity, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                              <span className="text-slate-700 dark:text-slate-300">{activity.name}</span>
                              <Button
                                size="sm"
                                onClick={() => applySuggestion(activity.name)}
                                className="bg-purple-500 hover:bg-purple-600 text-white"
                              >
                                Add to Routine
                              </Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold flex items-center">
                          <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
                          Routine Improvements
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {aiSuggestions.improvements.map((improvement, index) => (
                            <div key={index} className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                              <span className="text-slate-700 dark:text-slate-300">{improvement}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold flex items-center">
                          <Clock className="h-4 w-4 text-blue-500 mr-2" />
                          Schedule Optimization
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {aiSuggestions.schedule.map((optimization, index) => (
                            <div key={index} className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                              <span className="text-slate-700 dark:text-slate-300">{optimization}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="mb-8">
          <DailyStats 
            completionPercentage={completionPercentage}
            totalTasks={tasks.length}
            completedTasks={completedTasks}
            longestStreak={Math.max(...tasks.map(task => task.streak || 0), 0)}
          />
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="bg-white/90 dark:bg-slate-800/90 rounded-2xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Target className="h-4 w-4 text-indigo-500 mr-2" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => setShowTaskForm(true)}
                  className="w-full bg-indigo-500 hover:bg-indigo-600 text-white"
                  size="lg"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Task
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <PomodoroTimer />
              <WaterIntakeTracker />
              <HealthTrackers />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-6">
            <div className="space-y-6">
              <Card className="bg-white/90 dark:bg-slate-800/90 rounded-2xl shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold flex items-center">
                    <Clock className="h-5 w-5 text-indigo-500 mr-2" />
                    Today's Tasks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <TaskList 
                    tasks={tasks}
                    onToggleTask={toggleTask}
                    onDeleteTask={deleteTask}
                    onEditTask={handleEditTask}
                    onReorderTasks={reorderTasks}
                  />
                </CardContent>
              </Card>
              
              <RoutineTemplates onAddTemplate={addTemplate} />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-indigo-50/80 to-purple-50/80 dark:from-indigo-900/10 dark:to-purple-900/10 rounded-2xl shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center">
                    <TrendingUp className="h-4 w-4 text-indigo-500 mr-2" />
                    Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Completion Rate</span>
                      <span className="text-2xl font-bold">{completionPercentage}%</span>
                    </div>
                    <div className="w-full bg-indigo-100/60 dark:bg-indigo-800/30 rounded-full h-3">
                      <div 
                        className="bg-indigo-500 h-3 rounded-full transition-all duration-700"
                        style={{ width: `${completionPercentage}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Completed Tasks</span>
                      <span className="font-medium">{completedTasks} of {tasks.length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <DailyFocusTask />
            </div>
          </div>
        </div>

        {showTaskForm && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <TaskForm 
                onAddTask={editingTask ? undefined : addTask}
                onEditTask={editingTask ? editTask : undefined}
                onClose={() => {
                  setShowTaskForm(false);
                  setEditingTask(undefined);
                }}
                editingTask={editingTask}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRoutine;
