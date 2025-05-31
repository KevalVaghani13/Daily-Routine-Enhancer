
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Timer } from 'lucide-react';

const PomodoroTimer: React.FC = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            setIsActive(false);
            if (isBreak) {
              setMinutes(25);
              setIsBreak(false);
            } else {
              setMinutes(5);
              setIsBreak(true);
            }
            setSeconds(0);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval!);
    }
    
    return () => clearInterval(interval!);
  }, [isActive, minutes, seconds, isBreak]);

  const reset = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
    setIsBreak(false);
  };

  const toggle = () => {
    setIsActive(!isActive);
  };

  return (
    <Card className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border-0 dark:shadow-slate-900/50">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100 flex items-center">
          <Timer className="mr-2 h-5 w-5 text-red-500 dark:text-red-400" />
          Pomodoro Timer
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <div className="text-6xl font-bold text-slate-800 dark:text-slate-100">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
        
        <div className="text-sm text-slate-600 dark:text-slate-300">
          {isBreak ? 'Break Time' : 'Focus Time'}
        </div>
        
        <div className="flex justify-center space-x-3">
          <Button 
            onClick={toggle}
            className={`${isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
          >
            {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button 
            onClick={reset}
            variant="outline"
            className="border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PomodoroTimer;
