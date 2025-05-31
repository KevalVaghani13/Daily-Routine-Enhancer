
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Star, Edit, Save, X } from 'lucide-react';

interface FocusTask {
  id: string;
  task: string;
  date: string;
  completed: boolean;
}

const DailyFocusTask: React.FC = () => {
  const [focusTask, setFocusTask] = useState<FocusTask | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const saved = localStorage.getItem(`focusTask_${today}`);
    if (saved) {
      setFocusTask(JSON.parse(saved));
    }
  }, []);

  const saveFocusTask = () => {
    if (!editText.trim()) return;
    
    const today = new Date().toISOString().split('T')[0];
    const newTask: FocusTask = {
      id: Date.now().toString(),
      task: editText,
      date: today,
      completed: false
    };
    
    setFocusTask(newTask);
    localStorage.setItem(`focusTask_${today}`, JSON.stringify(newTask));
    setIsEditing(false);
    setEditText('');
  };

  const toggleComplete = () => {
    if (!focusTask) return;
    
    const updatedTask = { ...focusTask, completed: !focusTask.completed };
    setFocusTask(updatedTask);
    localStorage.setItem(`focusTask_${focusTask.date}`, JSON.stringify(updatedTask));
  };

  const startEditing = () => {
    setIsEditing(true);
    setEditText(focusTask?.task || '');
  };

  return (
    <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl shadow-lg border-2 border-yellow-200 dark:border-yellow-700">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100 flex items-center">
          <Star className="mr-2 h-5 w-5 text-yellow-500 dark:text-yellow-400" />
          Daily Focus Task
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {focusTask && !isEditing ? (
          <div className="space-y-3">
            <div className={`p-4 rounded-lg border-2 ${focusTask.completed 
              ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700' 
              : 'bg-white border-yellow-200 dark:bg-slate-700/50 dark:border-yellow-600'
            }`}>
              <div className="flex items-center justify-between">
                <p className={`font-medium ${focusTask.completed 
                  ? 'line-through text-green-700 dark:text-green-300' 
                  : 'text-slate-800 dark:text-slate-200'
                }`}>
                  {focusTask.task}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={startEditing}
                  className="border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  <Edit className="h-3 w-3" />
                </Button>
              </div>
            </div>
            
            <Button
              onClick={toggleComplete}
              className={`w-full ${focusTask.completed 
                ? 'bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700' 
                : 'bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700'
              } text-white`}
            >
              {focusTask.completed ? '✓ Completed!' : 'Mark as Complete'}
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <Input
              placeholder="What's your main focus for today?"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="bg-white dark:bg-slate-700/50 border-yellow-300 dark:border-yellow-600"
            />
            <div className="flex space-x-2">
              <Button 
                onClick={saveFocusTask}
                disabled={!editText.trim()}
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white"
              >
                <Save className="mr-2 h-4 w-4" />
                Set Focus
              </Button>
              {focusTask && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setEditText('');
                  }}
                  className="border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        )}
        
        {!focusTask && !isEditing && (
          <Button
            onClick={() => setIsEditing(true)}
            className="w-full bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white"
          >
            <Star className="mr-2 h-4 w-4" />
            Set Today's Focus
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default DailyFocusTask;
