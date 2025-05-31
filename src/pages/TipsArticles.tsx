
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import { BookOpen, Clock, User, ArrowRight } from 'lucide-react';

const TipsArticles = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const articles = [
    {
      id: 1,
      title: "10 Morning Habits That Will Transform Your Day",
      excerpt: "Discover the science-backed morning routines that successful people swear by to boost productivity and happiness.",
      category: "Morning Routines",
      readTime: "5 min read",
      author: "Sarah Johnson",
      date: "Dec 15, 2024",
      image: "☀️"
    },
    {
      id: 2,
      title: "The Power of Micro-Habits: Small Changes, Big Results",
      excerpt: "Learn how tiny habits can create massive transformations in your life with this practical guide to behavioral change.",
      category: "Habit Building",
      readTime: "7 min read",
      author: "Michael Chen",
      date: "Dec 12, 2024",
      image: "🌱"
    },
    {
      id: 3,
      title: "Time Blocking: The Ultimate Productivity Method",
      excerpt: "Master the art of time blocking to eliminate distractions and achieve deep focus throughout your day.",
      category: "Time Management",
      readTime: "6 min read",
      author: "Emily Rodriguez",
      date: "Dec 10, 2024",
      image: "⏰"
    },
    {
      id: 4,
      title: "Building an Evening Routine for Better Sleep",
      excerpt: "Create the perfect wind-down routine to improve your sleep quality and wake up refreshed every morning.",
      category: "Evening Routines",
      readTime: "4 min read",
      author: "David Park",
      date: "Dec 8, 2024",
      image: "🌙"
    },
    {
      id: 5,
      title: "The Psychology Behind Successful Goal Setting",
      excerpt: "Understand the mental frameworks that make goal achievement inevitable and avoid common pitfalls.",
      category: "Goal Setting",
      readTime: "8 min read",
      author: "Dr. Lisa Thompson",
      date: "Dec 5, 2024",
      image: "🎯"
    },
    {
      id: 6,
      title: "Digital Detox: Reclaiming Your Attention",
      excerpt: "Practical strategies to reduce screen time and create healthier relationships with technology.",
      category: "Digital Wellness",
      readTime: "5 min read",
      author: "Alex Kumar",
      date: "Dec 3, 2024",
      image: "📱"
    }
  ];

  const categories = [
    "All", "Morning Routines", "Habit Building", "Time Management", 
    "Evening Routines", "Goal Setting", "Digital Wellness"
  ];

  // Filter articles based on selected category
  const filteredArticles = selectedCategory === 'All' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  const quickTips = [
    {
      icon: "💡",
      title: "Start Small",
      tip: "Begin with just 1-2 minute habits to build momentum"
    },
    {
      icon: "🔄",
      title: "Stack Habits",
      tip: "Link new habits to existing ones for better retention"
    },
    {
      icon: "📝",
      title: "Track Progress",
      tip: "Use visual cues like checkmarks to stay motivated"
    },
    {
      icon: "🎉",
      title: "Celebrate Wins",
      tip: "Acknowledge small victories to reinforce positive behavior"
    }
  ];

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-2">
            Tips & Articles
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Expert insights and practical advice to boost your productivity
          </p>
        </div>

        {/* Quick Tips */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-6">
            Quick Tips for Success
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickTips.map((tip, index) => (
              <Card key={index} className="bg-gradient-to-br from-blue-50 to-white dark:from-slate-800 dark:to-slate-700 rounded-2xl shadow-lg border-0">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-3">{tip.icon}</div>
                  <h3 className="font-semibold text-slate-800 dark:text-white mb-2">
                    {tip.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {tip.tip}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === selectedCategory ? "default" : "outline"}
                className={`rounded-full transition-all duration-200 ${
                  category === selectedCategory 
                    ? "bg-blue-600 hover:bg-blue-700 text-white" 
                    : "border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-900/20"
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </Button>
            ))}
          </div>
          <div className="mt-4 text-sm text-slate-600 dark:text-slate-400">
            Showing {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} 
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <Card key={article.id} className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border-0 hover:shadow-xl transition-all duration-300 group cursor-pointer">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{article.image}</span>
                  <span className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-full font-medium">
                    {article.category}
                  </span>
                </div>
                <CardTitle className="text-xl font-semibold text-slate-800 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {article.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-4">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {article.author}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {article.readTime}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {article.date}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 p-0 h-auto font-medium group-hover:translate-x-1 transition-transform"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <Card className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-2xl shadow-lg border-0 mt-12">
          <CardContent className="p-8 text-center">
            <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-80" />
            <h2 className="text-2xl font-bold mb-2">
              Stay Updated with Weekly Tips
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Get the latest productivity insights, habit-building techniques, and motivational content delivered to your inbox every week.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-2 rounded-lg text-slate-800 border-0 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <Button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-6">
                Subscribe
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TipsArticles;
