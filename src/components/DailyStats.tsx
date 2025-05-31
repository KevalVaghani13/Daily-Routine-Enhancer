
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Target, Flame, CheckCircle, TrendingUp } from 'lucide-react';

interface DailyStatsProps {
  completionPercentage: number;
  totalTasks: number;
  completedTasks: number;
  longestStreak: number;
}

const DailyStats: React.FC<DailyStatsProps> = ({
  completionPercentage,
  totalTasks,
  completedTasks,
  longestStreak
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Daily Progress</p>
              <p className="text-2xl font-bold">{completionPercentage}%</p>
            </div>
            <Target className="h-8 w-8 text-blue-200" />
          </div>
          <Progress value={completionPercentage} className="mt-3 bg-blue-400" />
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Completed Today</p>
              <p className="text-2xl font-bold">{completedTasks}/{totalTasks}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-200" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Longest Streak</p>
              <p className="text-2xl font-bold">{longestStreak} days</p>
            </div>
            <Flame className="h-8 w-8 text-orange-200" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Productivity Score</p>
              <p className="text-2xl font-bold">{Math.min(100, completionPercentage + longestStreak)}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-200" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyStats;
