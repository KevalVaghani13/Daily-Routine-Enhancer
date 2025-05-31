
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Utensils, Moon, Activity } from 'lucide-react';

interface HealthData {
  date: string;
  meals: {
    breakfast: string;
    lunch: string;
    dinner: string;
    snacks: string;
  };
  sleep: {
    bedtime: string;
    wakeup: string;
    quality: number;
    notes: string;
  };
  steps: number;
}

const HealthTrackers: React.FC = () => {
  const [healthData, setHealthData] = useState<HealthData>({
    date: new Date().toISOString().split('T')[0],
    meals: { breakfast: '', lunch: '', dinner: '', snacks: '' },
    sleep: { bedtime: '', wakeup: '', quality: 5, notes: '' },
    steps: 0
  });

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const saved = localStorage.getItem(`healthData_${today}`);
    if (saved) {
      setHealthData(JSON.parse(saved));
    }
  }, []);

  const saveData = () => {
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem(`healthData_${today}`, JSON.stringify(healthData));
    console.log('Health data saved successfully');
  };

  const updateMeal = (meal: keyof typeof healthData.meals, value: string) => {
    setHealthData(prev => ({
      ...prev,
      meals: { ...prev.meals, [meal]: value }
    }));
  };

  const updateSleep = (field: keyof typeof healthData.sleep, value: string | number) => {
    setHealthData(prev => ({
      ...prev,
      sleep: { ...prev.sleep, [field]: value }
    }));
  };

  return (
    <div className="space-y-6">
      {/* Meal Planning */}
      <Card className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border-0 dark:shadow-slate-900/50">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100 flex items-center">
            <Utensils className="mr-2 h-5 w-5 text-orange-500 dark:text-orange-400" />
            Meal Planning
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="breakfast">Breakfast</Label>
              <Input
                id="breakfast"
                placeholder="What did you have for breakfast?"
                value={healthData.meals.breakfast}
                onChange={(e) => updateMeal('breakfast', e.target.value)}
                className="bg-white dark:bg-slate-700/50 border-slate-300 dark:border-slate-600"
              />
            </div>
            <div>
              <Label htmlFor="lunch">Lunch</Label>
              <Input
                id="lunch"
                placeholder="What did you have for lunch?"
                value={healthData.meals.lunch}
                onChange={(e) => updateMeal('lunch', e.target.value)}
                className="bg-white dark:bg-slate-700/50 border-slate-300 dark:border-slate-600"
              />
            </div>
            <div>
              <Label htmlFor="dinner">Dinner</Label>
              <Input
                id="dinner"
                placeholder="What did you have for dinner?"
                value={healthData.meals.dinner}
                onChange={(e) => updateMeal('dinner', e.target.value)}
                className="bg-white dark:bg-slate-700/50 border-slate-300 dark:border-slate-600"
              />
            </div>
            <div>
              <Label htmlFor="snacks">Snacks</Label>
              <Input
                id="snacks"
                placeholder="Any snacks?"
                value={healthData.meals.snacks}
                onChange={(e) => updateMeal('snacks', e.target.value)}
                className="bg-white dark:bg-slate-700/50 border-slate-300 dark:border-slate-600"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sleep Log */}
      <Card className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border-0 dark:shadow-slate-900/50">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100 flex items-center">
            <Moon className="mr-2 h-5 w-5 text-purple-500 dark:text-purple-400" />
            Sleep Log
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="bedtime">Bedtime</Label>
              <Input
                id="bedtime"
                type="time"
                value={healthData.sleep.bedtime}
                onChange={(e) => updateSleep('bedtime', e.target.value)}
                className="bg-white dark:bg-slate-700/50 border-slate-300 dark:border-slate-600"
              />
            </div>
            <div>
              <Label htmlFor="wakeup">Wake up time</Label>
              <Input
                id="wakeup"
                type="time"
                value={healthData.sleep.wakeup}
                onChange={(e) => updateSleep('wakeup', e.target.value)}
                className="bg-white dark:bg-slate-700/50 border-slate-300 dark:border-slate-600"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="quality">Sleep Quality (1-10)</Label>
            <Input
              id="quality"
              type="number"
              min="1"
              max="10"
              value={healthData.sleep.quality}
              onChange={(e) => updateSleep('quality', parseInt(e.target.value) || 5)}
              className="bg-white dark:bg-slate-700/50 border-slate-300 dark:border-slate-600"
            />
          </div>
          <div>
            <Label htmlFor="sleep-notes">Sleep Notes</Label>
            <Textarea
              id="sleep-notes"
              placeholder="How was your sleep?"
              value={healthData.sleep.notes}
              onChange={(e) => updateSleep('notes', e.target.value)}
              className="bg-white dark:bg-slate-700/50 border-slate-300 dark:border-slate-600 min-h-[60px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Step Count */}
      <Card className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border-0 dark:shadow-slate-900/50">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100 flex items-center">
            <Activity className="mr-2 h-5 w-5 text-green-500 dark:text-green-400" />
            Step Count
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="steps">Steps Today</Label>
            <Input
              id="steps"
              type="number"
              placeholder="Enter your step count"
              value={healthData.steps || ''}
              onChange={(e) => setHealthData(prev => ({ ...prev, steps: parseInt(e.target.value) || 0 }))}
              className="bg-white dark:bg-slate-700/50 border-slate-300 dark:border-slate-600"
            />
          </div>
          {healthData.steps > 0 && (
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {healthData.steps.toLocaleString()} steps
              </div>
              <div className="text-sm text-green-700 dark:text-green-300">
                {healthData.steps >= 10000 ? '🎉 Goal achieved!' : `${10000 - healthData.steps} steps to goal`}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Button 
        onClick={saveData}
        className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
      >
        Save Health Data
      </Button>
    </div>
  );
};

export default HealthTrackers;
