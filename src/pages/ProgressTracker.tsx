
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import { TrendingUp, Calendar, Target, Award } from 'lucide-react';

const ProgressTracker = () => {
  const stats = [
    {
      title: "Current Streak",
      value: "7 days",
      icon: "🔥",
      color: "from-orange-400 to-red-500"
    },
    {
      title: "Tasks Completed",
      value: "42/50",
      icon: "✅",
      color: "from-green-400 to-emerald-500"
    },
    {
      title: "Productivity Score",
      value: "84%",
      icon: "📊",
      color: "from-blue-400 to-indigo-500"
    },
    {
      title: "Best Streak",
      value: "12 days",
      icon: "🏆",
      color: "from-purple-400 to-violet-500"
    }
  ];

  const weeklyData = [
    { day: 'Mon', completed: 8, total: 10 },
    { day: 'Tue', completed: 9, total: 10 },
    { day: 'Wed', completed: 7, total: 10 },
    { day: 'Thu', completed: 10, total: 10 },
    { day: 'Fri', completed: 8, total: 10 },
    { day: 'Sat', completed: 6, total: 8 },
    { day: 'Sun', completed: 5, total: 8 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-2">
            Progress Tracker
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Monitor your productivity journey and celebrate your achievements
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border-0 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-slate-800 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                  <div className="text-3xl">
                    {stat.icon}
                  </div>
                </div>
                <div className={`h-1 w-full bg-gradient-to-r ${stat.color} rounded-full mt-4`}></div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Weekly Progress Chart */}
          <Card className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-slate-800 dark:text-white flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                Weekly Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyData.map((day, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-12 text-sm font-medium text-slate-600 dark:text-slate-400">
                      {day.day}
                    </div>
                    <div className="flex-1">
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${(day.completed / day.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 min-w-[50px] text-right">
                      {day.completed}/{day.total}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-slate-800 dark:text-white flex items-center">
                <Award className="mr-2 h-5 w-5" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <div className="text-2xl">🏆</div>
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-white">
                      Week Warrior
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Completed 7 days in a row
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-2xl">⭐</div>
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-white">
                      Perfect Day
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Completed all tasks on Thursday
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-2xl">🎯</div>
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-white">
                      Consistency King
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Maintained 80%+ completion rate
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Overview */}
        <Card className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border-0 mt-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-slate-800 dark:text-white flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Monthly Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-sm font-medium text-slate-600 dark:text-slate-400 py-2">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 31 }, (_, i) => {
                const day = i + 1;
                const completed = Math.random() > 0.3; // Random completion for demo
                return (
                  <div
                    key={day}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
                      completed
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400'
                    }`}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-center space-x-4 mt-4 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-100 dark:bg-green-900 rounded"></div>
                <span>Completed</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-slate-100 dark:bg-slate-700 rounded"></div>
                <span>Incomplete</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProgressTracker;
