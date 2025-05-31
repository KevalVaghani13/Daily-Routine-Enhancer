
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileDown, Calendar, CheckCircle, Heart } from 'lucide-react';
import { Task, Mood } from '@/types/task';

interface ExportReportProps {
  tasks: Task[];
}

interface JournalEntry {
  id: string;
  date: string;
  content: string;
  createdAt: string;
}

const ExportReport: React.FC<ExportReportProps> = ({ tasks }) => {
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
    <Card className="bg-white/70 dark:bg-slate-800/70 rounded-3xl shadow-lg border border-purple-100/50 dark:border-purple-700/30 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-slate-700 dark:text-slate-200 flex items-center">
          <div className="p-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl mr-3">
            <FileDown className="h-4 w-4 text-blue-500 dark:text-blue-400" />
          </div>
          Export Report
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Export your daily routine progress, mood, and journal entries as a downloadable report.
        </p>
        
        <div className="space-y-2 text-xs text-slate-400 dark:text-slate-500">
          <div className="flex items-center">
            <CheckCircle className="mr-2 h-3 w-3 text-green-400 dark:text-green-500" />
            Task completion status
          </div>
          <div className="flex items-center">
            <Heart className="mr-2 h-3 w-3 text-pink-400 dark:text-pink-500" />
            Mood tracking data
          </div>
          <div className="flex items-center">
            <Calendar className="mr-2 h-3 w-3 text-purple-400 dark:text-purple-500" />
            Journal entries
          </div>
        </div>

        <Button 
          onClick={exportToPDF}
          className="w-full bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white font-medium rounded-2xl py-3 flex items-center justify-center space-x-2 transition-all duration-200 hover:shadow-lg border-0"
        >
          <FileDown className="h-4 w-4" />
          <span>Export Today's Report</span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ExportReport;
