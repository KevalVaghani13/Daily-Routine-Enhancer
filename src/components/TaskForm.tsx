
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import { Task, TaskCategory, Priority, RepeatOption } from '@/types/task';

interface TaskFormProps {
  onAddTask?: (task: Omit<Task, 'id' | 'completed' | 'streak' | 'order'>) => void;
  onEditTask?: (task: Task) => void;
  onClose: () => void;
  editingTask?: Task;
}

const categories: { value: TaskCategory; label: string; icon: string }[] = [
  { value: 'Health', label: 'Health & Fitness', icon: '💪' },
  { value: 'Work', label: 'Work & Career', icon: '💼' },
  { value: 'Study', label: 'Study & Learning', icon: '📚' },
  { value: 'Personal', label: 'Personal Care', icon: '🌟' },
  { value: 'Family', label: 'Family Time', icon: '👨‍👩‍👧‍👦' },
  { value: 'Finance', label: 'Finance', icon: '💰' },
  { value: 'Relax', label: 'Relaxation', icon: '🧘' },
  { value: 'Social', label: 'Social', icon: '👥' },
  { value: 'Misc', label: 'Miscellaneous', icon: '📌' }
];

const priorities: { value: Priority; label: string; color: string }[] = [
  { value: 'low', label: 'Low', color: 'bg-green-100 text-green-800' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'high', label: 'High', color: 'bg-red-100 text-red-800' }
];

const repeatOptions: { value: RepeatOption; label: string }[] = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'weekdays', label: 'Weekdays' },
  { value: 'weekends', label: 'Weekends' },
  { value: 'custom', label: 'Custom' },
  { value: 'none', label: 'One-time' }
];

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask, onEditTask, onClose, editingTask }) => {
  const [formData, setFormData] = useState({
    name: editingTask?.name || '',
    time: editingTask?.time || '',
    category: editingTask?.category || ('Health' as TaskCategory),
    priority: editingTask?.priority || ('medium' as Priority),
    icon: editingTask?.icon || '📝',
    repeat: editingTask?.repeat || ('daily' as RepeatOption),
    notes: editingTask?.notes || '',
    goal: editingTask?.goal || 1,
    duration: editingTask?.duration || 30
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.time) {
      if (editingTask && onEditTask) {
        onEditTask({
          ...editingTask,
          ...formData
        });
      } else if (onAddTask) {
        onAddTask(formData);
      }
    }
  };

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold text-slate-800 dark:text-white">
          {editingTask ? 'Edit Task' : 'Add New Task'}
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-slate-500 hover:text-slate-700"
        >
          <X className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="task-name">Task Name</Label>
            <Input
              id="task-name"
              placeholder="Enter task name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="rounded-lg"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="task-time">Time</Label>
              <Input
                id="task-time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="rounded-lg"
                required
              />
            </div>
            <div>
              <Label htmlFor="task-duration">Duration (minutes)</Label>
              <Input
                id="task-duration"
                type="number"
                min="5"
                max="480"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 30 })}
                className="rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="task-icon">Icon</Label>
              <Input
                id="task-icon"
                placeholder="Add emoji"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="rounded-lg"
              />
            </div>
            <div>
              <Label htmlFor="task-goal">Goal (times)</Label>
              <Input
                id="task-goal"
                type="number"
                min="1"
                value={formData.goal}
                onChange={(e) => setFormData({ ...formData, goal: parseInt(e.target.value) || 1 })}
                className="rounded-lg"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="task-category">Category</Label>
            <select
              id="task-category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as TaskCategory })}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.icon} {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="task-priority">Priority</Label>
              <select
                id="task-priority"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as Priority })}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              >
                {priorities.map((priority) => (
                  <option key={priority.value} value={priority.value}>
                    {priority.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="task-repeat">Repeat</Label>
              <select
                id="task-repeat"
                value={formData.repeat}
                onChange={(e) => setFormData({ ...formData, repeat: e.target.value as RepeatOption })}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              >
                {repeatOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="task-notes">Notes (Optional)</Label>
            <textarea
              id="task-notes"
              placeholder="Add any additional notes..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm min-h-[80px] resize-none"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button type="submit" className="flex-1 rounded-lg bg-blue-600 hover:bg-blue-700">
              {editingTask ? 'Update Task' : 'Add Task'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 rounded-lg">
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default TaskForm;
