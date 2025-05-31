import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Clock, Trash2, GripVertical, Flame, Repeat, Edit, Timer, CheckCircle2 } from 'lucide-react';
import { Task } from '@/types/task';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (task: Task) => void;
  onReorderTasks: (dragIndex: number, hoverIndex: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  onToggleTask, 
  onDeleteTask, 
  onEditTask,
  onReorderTasks 
}) => {
  const priorityColors = {
    low: 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-300 border-green-200 dark:border-green-700',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700',
    high: 'bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-300 border-red-200 dark:border-red-700'
  };

  const categoryColors = {
    Health: 'bg-pink-100 text-pink-800 dark:bg-pink-800/30 dark:text-pink-300 border-pink-200 dark:border-pink-700',
    Work: 'bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-300 border-blue-200 dark:border-blue-700',
    Study: 'bg-purple-100 text-purple-800 dark:bg-purple-800/30 dark:text-purple-300 border-purple-200 dark:border-purple-700',
    Personal: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-800/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700',
    Family: 'bg-orange-100 text-orange-800 dark:bg-orange-800/30 dark:text-orange-300 border-orange-200 dark:border-orange-700',
    Finance: 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-300 border-green-200 dark:border-green-700',
    Relax: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-800/30 dark:text-indigo-300 border-indigo-200 dark:border-indigo-700',
    Social: 'bg-rose-100 text-rose-800 dark:bg-rose-800/30 dark:text-rose-300 border-rose-200 dark:border-rose-700',
    Misc: 'bg-slate-100 text-slate-800 dark:bg-slate-800/30 dark:text-slate-300 border-slate-200 dark:border-slate-700'
  };

  const sortedTasks = [...tasks].sort((a, b) => a.order - b.order).sort((a, b) => a.time.localeCompare(b.time));

  return (
    <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <CardTitle className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-slate-100 flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-3">
              <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
            </div>
            Today's Tasks
          </CardTitle>
          <div className="text-sm font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full self-start sm:self-auto">
            {tasks.length} tasks
          </div>
        </div>
        
        {tasks.length > 0 && (
          <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
            <div className="flex justify-between text-sm text-slate-600 dark:text-slate-300">
              <span className="font-medium">Daily Progress</span>
              <span className="font-semibold">{tasks.filter(t => t.completed).length}/{tasks.length} completed</span>
            </div>
            <div className="relative">
              <Progress 
                value={tasks.length > 0 ? (tasks.filter(t => t.completed).length / tasks.length) * 100 : 0}
                className="h-2 sm:h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full"></div>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {Math.round(tasks.length > 0 ? (tasks.filter(t => t.completed).length / tasks.length) * 100 : 0)}% completion rate
            </div>
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        {tasks.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium">
              No tasks yet. Add your first task to get started!
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
              Build your perfect daily routine
            </p>
          </div>
        ) : (
          <div className="space-y-2 sm:space-y-3">
            {sortedTasks.map((task, index) => (
              <div
                key={task.id}
                className={`group p-3 sm:p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-md ${
                  task.completed
                    ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 dark:from-green-900/20 dark:to-emerald-900/20 dark:border-green-700/50'
                    : 'bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-600/50 hover:border-blue-300 dark:hover:border-blue-600'
                }`}
              >
                <div className="flex items-start sm:items-center justify-between gap-3 sm:gap-4">
                  <div className="flex items-start sm:items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                    <div className="cursor-move text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity mt-1 sm:mt-0">
                      <GripVertical className="w-4 h-4" />
                    </div>
                    
                    <button
                      onClick={() => onToggleTask(task.id)}
                      className={`relative w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 hover:scale-110 mt-1 sm:mt-0 ${
                        task.completed
                          ? 'bg-green-500 border-green-500 dark:bg-green-600 dark:border-green-600 shadow-md'
                          : 'border-slate-300 hover:border-blue-500 dark:border-slate-500 dark:hover:border-blue-400 hover:shadow-md'
                      }`}
                    >
                      {task.completed && (
                        <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                    
                    <div className="text-xl sm:text-2xl">{task.icon}</div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-semibold text-sm sm:text-base ${task.completed ? 'line-through text-slate-500 dark:text-slate-400' : 'text-slate-800 dark:text-slate-100'}`}>
                        {task.name}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 sm:mt-2">
                        <span className="flex items-center bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-md">
                          <Clock className="w-3 h-3 mr-1 text-slate-500 dark:text-slate-400" />
                          {task.time}
                        </span>
                        {task.duration && (
                          <span className="flex items-center bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-md text-blue-700 dark:text-blue-300">
                            <Timer className="w-3 h-3 mr-1" />
                            {task.duration}min
                          </span>
                        )}
                        <span className={`px-2 py-1 rounded-md text-xs font-medium ${categoryColors[task.category]}`}>
                          {task.category}
                        </span>
                        <span className={`px-2 py-1 rounded-md text-xs font-medium ${priorityColors[task.priority]}`}>
                          {task.priority}
                        </span>
                        {task.repeat !== 'none' && (
                          <span className="flex items-center text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md">
                            <Repeat className="w-3 h-3 mr-1 text-slate-500 dark:text-slate-400" />
                            {task.repeat}
                          </span>
                        )}
                        {(task.streak || 0) > 0 && (
                          <span className="flex items-center text-orange-600 dark:text-orange-400 text-xs font-medium bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded-md">
                            <Flame className="w-3 h-3 mr-1" />
                            {task.streak} day streak
                          </span>
                        )}
                        {task.goal && task.goal > 1 && (
                          <span className="text-xs text-blue-600 dark:text-blue-400 font-medium bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-md">
                            Goal: {task.goal}x
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEditTask(task)}
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/20 border-slate-300 dark:border-slate-600 rounded-lg"
                    >
                      <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDeleteTask(task.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20 border-slate-300 dark:border-slate-600 rounded-lg"
                    >
                      <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Button>
                  </div>
                </div>
                
                {task.notes && (
                  <div className="mt-3 sm:mt-4 pl-12 sm:pl-14">
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700/50 p-2 sm:p-3 rounded-lg border border-slate-200 dark:border-slate-600">
                      💭 {task.notes}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskList;
