
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { BookOpen, Save, Calendar } from 'lucide-react';

interface JournalEntry {
  id: string;
  date: string;
  content: string;
  createdAt: string;
}

const DailyJournal: React.FC = () => {
  const [journalContent, setJournalContent] = useState('');
  const [todaysEntry, setTodaysEntry] = useState<JournalEntry | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Load today's journal entry from localStorage
    const today = new Date().toISOString().split('T')[0];
    const savedEntries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
    const existingEntry = savedEntries.find((entry: JournalEntry) => entry.date === today);
    
    if (existingEntry) {
      setTodaysEntry(existingEntry);
      setJournalContent(existingEntry.content);
    }
  }, []);

  const saveJournalEntry = () => {
    if (!journalContent.trim()) return;

    const today = new Date().toISOString().split('T')[0];
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: today,
      content: journalContent,
      createdAt: new Date().toISOString()
    };

    // Save to localStorage
    const savedEntries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
    const filteredEntries = savedEntries.filter((entry: JournalEntry) => entry.date !== today);
    const updatedEntries = [...filteredEntries, newEntry];
    
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
    setTodaysEntry(newEntry);
    setIsEditing(false);
    
    console.log('Journal entry saved successfully:', newEntry);
  };

  const startEditing = () => {
    setIsEditing(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border-0 dark:shadow-slate-900/50">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100 flex items-center">
          <BookOpen className="mr-2 h-5 w-5 text-blue-500 dark:text-blue-400" />
          Daily Journal
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
          <Calendar className="mr-2 h-4 w-4 text-slate-500 dark:text-slate-400" />
          {formatDate(new Date().toISOString())}
        </div>

        {todaysEntry && !isEditing ? (
          <div className="space-y-3">
            <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border dark:border-slate-600">
              <p className="text-sm text-slate-700 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">
                {todaysEntry.content}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={startEditing}
              className="w-full border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200"
            >
              Edit Today's Entry
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <Textarea
              placeholder="What's on your mind today? Reflect on your experiences, goals, or thoughts..."
              value={journalContent}
              onChange={(e) => setJournalContent(e.target.value)}
              className="min-h-[120px] resize-none bg-white dark:bg-slate-700/50 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400"
            />
            <div className="flex space-x-2">
              <Button 
                onClick={saveJournalEntry}
                disabled={!journalContent.trim()}
                className="flex-1 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white disabled:opacity-50 dark:disabled:opacity-40"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Entry
              </Button>
              {isEditing && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setJournalContent(todaysEntry?.content || '');
                  }}
                  className="border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200"
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DailyJournal;
