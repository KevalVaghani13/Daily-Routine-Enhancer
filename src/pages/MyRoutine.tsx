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
  const [aiSuggestions, setAiSuggestions] = useState<{
    suggestions: string[];
    improvements: string[];
    scheduleOptimization: string[];
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
    // Simulate AI analysis with a loading state
    const loadingSuggestions = {
      suggestions: ["Analyzing your routine..."],
      improvements: ["Processing..."],
      scheduleOptimization: ["Optimizing schedule..."]
    };
    setAiSuggestions(loadingSuggestions);

    // In a real implementation, this would call an AI service
    // For now, we'll simulate the analysis with some smart suggestions
    setTimeout(() => {
      const analysis = {
        suggestions: [
          "Add a 5-minute stretching session after meditation",
          "Consider adding a short walk after lunch",
          "Include a 10-minute reading session before bed"
        ],
        improvements: [
          "Your morning routine is well-structured",
          "Good balance of physical and mental activities",
          "Consider adding more breaks between tasks"
        ],
        scheduleOptimization: [
          "Move exercise to 6:30 AM for better energy levels",
          "Add a 15-minute break after 2 hours of work",
          "Schedule important tasks in the morning when energy is highest"
        ]
      };
      setAiSuggestions(analysis);
    }, 2000);
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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 dark:from-indigo-300 dark:via-purple-300 dark:to-pink-300 bg-clip-text text-transparent mb-2 sm:mb-3">
                My Daily Routine
              </h1>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
                Transform your day with intentional habits.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:space-x-4">
              <Button
                onClick={analyzeRoutine}
                className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                <Brain className="h-4 w-4 mr-2" />
                Analyze Routine
              </Button>
              <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-300 bg-white/80 dark:bg-slate-800/80 px-4 py-2 rounded-full w-full sm:w-auto justify-center sm:justify-start">
                <Calendar className="h-4 w-4 text-indigo-400" />
                <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <TaskList
              tasks={tasks}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
              onEditTask={handleEditTask}
              onReorderTasks={reorderTasks}
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <DailyFocusTask />
              <PomodoroTimer />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            <DailyStats tasks={tasks} />
            <WaterIntakeTracker />
            <HealthTrackers />
            <RoutineTemplates onAddTemplate={addTemplate} />
          </div>
        </div>
      </div>

      {/* AI Analysis Modal */}
      {showAIAnalysis && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold flex items-center">
                  <Brain className="h-5 w-5 sm:h-6 sm:w-6 text-purple-500 mr-2" />
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
                <div className="space-y-4 sm:space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base sm:text-lg font-semibold flex items-center">
                        <Sparkles className="h-4 w-4 text-yellow-500 mr-2" />
                        Suggested Activities
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 sm:space-y-3">
                        {aiSuggestions.suggestions.map((suggestion, index) => (
                          <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg gap-2 sm:gap-4">
                            <span className="text-sm sm:text-base text-slate-700 dark:text-slate-300">{suggestion}</span>
                            <Button
                              size="sm"
                              onClick={() => applySuggestion(suggestion)}
                              className="w-full sm:w-auto bg-purple-500 hover:bg-purple-600 text-white"
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
                      <CardTitle className="text-base sm:text-lg font-semibold flex items-center">
                        <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
                        Routine Improvements
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 sm:space-y-3">
                        {aiSuggestions.improvements.map((improvement, index) => (
                          <div key={index} className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300">{improvement}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base sm:text-lg font-semibold flex items-center">
                        <Clock className="h-4 w-4 text-blue-500 mr-2" />
                        Schedule Optimization
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 sm:space-y-3">
                        {aiSuggestions.scheduleOptimization.map((optimization, index) => (
                          <div key={index} className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300">{optimization}</p>
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

      {showTaskForm && (
        <TaskForm
          onClose={() => {
            setShowTaskForm(false);
            setEditingTask(undefined);
          }}
          onAddTask={addTask}
          onEditTask={editTask}
          editingTask={editingTask}
        />
      )}
    </div>
  );
};

export default MyRoutine;
