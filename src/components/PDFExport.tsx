
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileDown, Calendar, CheckCircle, Heart } from 'lucide-react';
import { Task, Mood } from '@/types/task';

interface PDFExportProps {
  tasks: Task[];
}

interface JournalEntry {
  id: string;
  date: string;
  content: string;
  createdAt: string;
}

const PDFExport: React.FC<PDFExportProps> = ({ tasks }) => {
  const generatePDFContent = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayFormatted = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Get today's data
    const savedMoods = JSON.parse(localStorage.getItem('moods') || '[]');
    const todaysMood = savedMoods.find((mood: Mood) => mood.date === today);

    const savedEntries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
    const todaysJournal = savedEntries.find((entry: JournalEntry) => entry.date === today);

    const completedTasks = tasks.filter(task => task.completed);
    const completionPercentage = tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0;

    // Create PDF content
    let content = `DAILY ROUTINE REPORT\n`;
    content += `Date: ${todayFormatted}\n\n`;

    content += `DAILY PROGRESS\n`;
    content += `Completion Rate: ${completionPercentage}%\n`;
    content += `Completed Tasks: ${completedTasks.length}/${tasks.length}\n\n`;

    if (todaysMood) {
      content += `MOOD TRACKER\n`;
      content += `Today's Mood: ${todaysMood.emoji} ${todaysMood.mood}\n`;
      if (todaysMood.notes) {
        content += `Notes: ${todaysMood.notes}\n`;
      }
      content += `\n`;
    }

    content += `TASKS\n`;
    tasks.forEach(task => {
      const status = task.completed ? '✓' : '○';
      content += `${status} ${task.name} (${task.time}) - ${task.category}\n`;
    });
    content += `\n`;

    if (todaysJournal) {
      content += `DAILY JOURNAL\n`;
      content += `${todaysJournal.content}\n\n`;
    }

    return content;
  };

  const exportToPDF = () => {
    const content = generatePDFContent();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `daily-routine-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    console.log('Daily routine exported successfully');
  };

  return (
    <Card className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border-0 dark:shadow-slate-900/50">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100 flex items-center">
          <FileDown className="mr-2 h-5 w-5 text-green-500 dark:text-green-400" />
          Export Report
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Export your daily routine progress, mood, and journal entries as a downloadable report.
        </p>
        
        <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center">
            <CheckCircle className="mr-2 h-3 w-3 text-green-500 dark:text-green-400" />
            Task completion status
          </div>
          <div className="flex items-center">
            <Heart className="mr-2 h-3 w-3 text-pink-500 dark:text-pink-400" />
            Mood tracking data
          </div>
          <div className="flex items-center">
            <Calendar className="mr-2 h-3 w-3 text-blue-500 dark:text-blue-400" />
            Journal entries
          </div>
        </div>

        <Button 
          onClick={exportToPDF}
          className="w-full bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white"
        >
          <FileDown className="mr-2 h-4 w-4" />
          Export Today's Report
        </Button>
      </CardContent>
    </Card>
  );
};

export default PDFExport;
