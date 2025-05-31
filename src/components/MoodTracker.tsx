
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Heart, Smile } from 'lucide-react';
import { Mood } from '@/types/task';

const moods = [
  { emoji: '😄', label: 'Excellent', color: 'bg-green-100 border-green-300 text-green-800 dark:bg-green-800/30 dark:border-green-500 dark:text-green-300', value: 'excellent' },
  { emoji: '😊', label: 'Good', color: 'bg-blue-100 border-blue-300 text-blue-800 dark:bg-blue-800/30 dark:border-blue-500 dark:text-blue-300', value: 'good' },
  { emoji: '😐', label: 'Okay', color: 'bg-yellow-100 border-yellow-300 text-yellow-800 dark:bg-yellow-800/30 dark:border-yellow-500 dark:text-yellow-300', value: 'okay' },
  { emoji: '😔', label: 'Poor', color: 'bg-orange-100 border-orange-300 text-orange-800 dark:bg-orange-800/30 dark:border-orange-500 dark:text-orange-300', value: 'poor' },
  { emoji: '😢', label: 'Terrible', color: 'bg-red-100 border-red-300 text-red-800 dark:bg-red-800/30 dark:border-red-500 dark:text-red-300', value: 'terrible' }
];

const MoodTracker: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [moodNote, setMoodNote] = useState('');
  const [todaysMood, setTodaysMood] = useState<Mood | null>(null);

  useEffect(() => {
    // Load today's mood from localStorage
    const today = new Date().toISOString().split('T')[0];
    const savedMoods = JSON.parse(localStorage.getItem('moods') || '[]');
    const existingMood = savedMoods.find((mood: Mood) => mood.date === today);
    
    if (existingMood) {
      setTodaysMood(existingMood);
      setSelectedMood(existingMood.mood);
      setMoodNote(existingMood.notes || '');
    }
  }, []);

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
  };

  const saveMood = () => {
    if (!selectedMood) return;

    const today = new Date().toISOString().split('T')[0];
    const moodData = moods.find(m => m.value === selectedMood);
    
    if (!moodData) return;

    const newMood: Mood = {
      id: Date.now().toString(),
      date: today,
      mood: selectedMood as Mood['mood'],
      color: moodData.color,
      emoji: moodData.emoji,
      notes: moodNote
    };

    // Save to localStorage
    const savedMoods = JSON.parse(localStorage.getItem('moods') || '[]');
    const filteredMoods = savedMoods.filter((mood: Mood) => mood.date !== today);
    const updatedMoods = [...filteredMoods, newMood];
    
    localStorage.setItem('moods', JSON.stringify(updatedMoods));
    setTodaysMood(newMood);
    
    console.log('Mood saved successfully:', newMood);
  };

  return (
    <Card className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border-0 dark:shadow-slate-900/50">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100 flex items-center">
          <Heart className="mr-2 h-5 w-5 text-pink-500 dark:text-pink-400" />
          Mood Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {todaysMood ? (
          <div className="text-center p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border dark:border-slate-600">
            <div className="text-3xl mb-2">{todaysMood.emoji}</div>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Today's mood: <span className="font-medium capitalize text-slate-800 dark:text-slate-200">{todaysMood.mood}</span>
            </p>
            {todaysMood.notes && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 italic">"{todaysMood.notes}"</p>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setTodaysMood(null);
                setSelectedMood(null);
                setMoodNote('');
              }}
              className="mt-2 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              Update Mood
            </Button>
          </div>
        ) : (
          <>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              How are you feeling today?
            </p>
            
            <div className="grid grid-cols-5 gap-2">
              {moods.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => handleMoodSelect(mood.value)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 flex items-center justify-center ${
                    selectedMood === mood.value 
                      ? `${mood.color} border-2` 
                      : 'border-slate-200 hover:border-slate-300 dark:border-slate-600 dark:hover:border-slate-500 bg-white dark:bg-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-600/50'
                  }`}
                  title={mood.label}
                >
                  <div className="text-2xl">{mood.emoji}</div>
                </button>
              ))}
            </div>

            {selectedMood && (
              <div className="space-y-3">
                <Textarea
                  placeholder="Add a note about your mood (optional)..."
                  value={moodNote}
                  onChange={(e) => setMoodNote(e.target.value)}
                  className="min-h-[60px] resize-none bg-white dark:bg-slate-700/50 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400"
                />
                <Button 
                  onClick={saveMood}
                  className="w-full rounded-lg bg-pink-500 hover:bg-pink-600 dark:bg-pink-600 dark:hover:bg-pink-700 text-white"
                >
                  <Smile className="mr-2 h-4 w-4" />
                  Save Mood
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default MoodTracker;
