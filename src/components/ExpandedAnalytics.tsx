
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { TrendingUp, Calendar, Target, Clock, Flame, Award, Activity, BarChart3 } from 'lucide-react';
import { Task } from '@/types/task';

interface ExpandedAnalyticsProps {
  tasks: Task[];
}

const ExpandedAnalytics: React.FC<ExpandedAnalyticsProps> = ({ tasks }) => {
  const analytics = useMemo(() => {
    const completed = tasks.filter(t => t.completed);
    const totalTasks = tasks.length;
    const completionRate = totalTasks > 0 ? (completed.length / totalTasks) * 100 : 0;
    
    // Category distribution
    const categoryData = tasks.reduce((acc, task) => {
      acc[task.category] = (acc[task.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Priority distribution
    const priorityData = tasks.reduce((acc, task) => {
      acc[task.priority] = (acc[task.priority] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Time distribution (morning, afternoon, evening)
    const timeDistribution = tasks.reduce((acc, task) => {
      const hour = parseInt(task.time.split(':')[0]);
      if (hour < 12) acc.morning++;
      else if (hour < 18) acc.afternoon++;
      else acc.evening++;
      return acc;
    }, { morning: 0, afternoon: 0, evening: 0 });

    // Weekly trend simulation (would be based on historical data)
    const weeklyTrend = [
      { day: 'Mon', completed: 8, total: 10 },
      { day: 'Tue', completed: 9, total: 10 },
      { day: 'Wed', completed: 7, total: 10 },
      { day: 'Thu', completed: 10, total: 10 },
      { day: 'Fri', completed: 8, total: 10 },
      { day: 'Sat', completed: 6, total: 8 },
      { day: 'Sun', completed: 5, total: 8 }
    ];

    const avgStreak = tasks.length > 0 ? tasks.reduce((sum, task) => sum + (task.streak || 0), 0) / tasks.length : 0;
    const maxStreak = Math.max(...tasks.map(task => task.streak || 0), 0);
    const totalDuration = tasks.reduce((sum, task) => sum + (task.duration || 0), 0);

    return {
      completionRate,
      categoryData,
      priorityData,
      timeDistribution,
      weeklyTrend,
      avgStreak,
      maxStreak,
      totalDuration,
      completedTasks: completed.length,
      totalTasks
    };
  }, [tasks]);

  const chartConfig = {
    completed: { label: "Completed", color: "#22c55e" },
    total: { label: "Total", color: "#e5e7eb" },
    morning: { label: "Morning", color: "#fbbf24" },
    afternoon: { label: "Afternoon", color: "#3b82f6" },
    evening: { label: "Evening", color: "#8b5cf6" }
  };

  const COLORS = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#84cc16', '#f97316'];

  const categoryChartData = Object.entries(analytics.categoryData).map(([category, count]) => ({
    category,
    count,
    percentage: ((count / analytics.totalTasks) * 100).toFixed(1)
  }));

  const timeChartData = [
    { time: 'Morning', tasks: analytics.timeDistribution.morning, fill: '#fbbf24' },
    { time: 'Afternoon', tasks: analytics.timeDistribution.afternoon, fill: '#3b82f6' },
    { time: 'Evening', tasks: analytics.timeDistribution.evening, fill: '#8b5cf6' }
  ];

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Completion Rate</p>
                <p className="text-2xl font-bold">{analytics.completionRate.toFixed(1)}%</p>
              </div>
              <Target className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Max Streak</p>
                <p className="text-2xl font-bold">{analytics.maxStreak} days</p>
              </div>
              <Flame className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Total Duration</p>
                <p className="text-2xl font-bold">{analytics.totalDuration}min</p>
              </div>
              <Clock className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Avg Streak</p>
                <p className="text-2xl font-bold">{analytics.avgStreak.toFixed(1)} days</p>
              </div>
              <Activity className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weekly Trend */}
        <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <TrendingUp className="mr-2 h-5 w-5" />
              Weekly Performance Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <LineChart data={analytics.weeklyTrend}>
                <XAxis dataKey="day" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="completed" 
                  stroke="#22c55e" 
                  strokeWidth={3}
                  dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="total" 
                  stroke="#e5e7eb" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <BarChart3 className="mr-2 h-5 w-5" />
              Task Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <PieChart>
                <Pie
                  data={categoryChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="count"
                  label={({ category, percentage }) => `${category}: ${percentage}%`}
                >
                  {categoryChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Time Distribution */}
        <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Clock className="mr-2 h-5 w-5" />
              Time Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <BarChart data={timeChartData}>
                <XAxis dataKey="time" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="tasks" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Priority Analysis */}
        <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Award className="mr-2 h-5 w-5" />
              Priority Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(analytics.priorityData).map(([priority, count]) => {
                const percentage = (count / analytics.totalTasks) * 100;
                const colors = {
                  high: 'bg-red-500',
                  medium: 'bg-yellow-500',
                  low: 'bg-green-500'
                };
                
                return (
                  <div key={priority} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="capitalize font-medium">{priority} Priority</span>
                      <span>{count} tasks ({percentage.toFixed(1)}%)</span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExpandedAnalytics;
