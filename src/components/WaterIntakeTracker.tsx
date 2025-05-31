
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Droplets, Plus, Minus } from 'lucide-react';

interface WaterIntake {
  date: string;
  amount: number;
  goal: number;
}

const WaterIntakeTracker: React.FC = () => {
  const [dailyGoal] = useState(8); // 8 glasses
  const [currentIntake, setCurrentIntake] = useState(0);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const savedIntake = localStorage.getItem('waterIntake');
    if (savedIntake) {
      const intakeData: WaterIntake = JSON.parse(savedIntake);
      if (intakeData.date === today) {
        setCurrentIntake(intakeData.amount);
      }
    }
  }, []);

  const updateIntake = (amount: number) => {
    const newAmount = Math.max(0, currentIntake + amount);
    setCurrentIntake(newAmount);
    
    const today = new Date().toISOString().split('T')[0];
    const intakeData: WaterIntake = {
      date: today,
      amount: newAmount,
      goal: dailyGoal
    };
    localStorage.setItem('waterIntake', JSON.stringify(intakeData));
  };

  const percentage = (currentIntake / dailyGoal) * 100;

  return (
    <Card className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border-0 dark:shadow-slate-900/50">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100 flex items-center">
          <Droplets className="mr-2 h-5 w-5 text-blue-500 dark:text-blue-400" />
          Water Intake
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {currentIntake} / {dailyGoal}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-300">glasses today</div>
        </div>
        
        <Progress value={percentage} className="h-3 bg-slate-200 dark:bg-slate-700" />
        
        <div className="flex justify-center space-x-3">
          <Button 
            onClick={() => updateIntake(-1)}
            variant="outline"
            size="sm"
            className="border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Button 
            onClick={() => updateIntake(1)}
            className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
          >
            <Plus className="h-4 w-4" />
            Add Glass
          </Button>
        </div>
        
        {percentage >= 100 && (
          <div className="text-center text-green-600 dark:text-green-400 font-medium">
            🎉 Goal achieved!
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WaterIntakeTracker;
