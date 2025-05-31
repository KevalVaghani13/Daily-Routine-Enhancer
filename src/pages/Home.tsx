
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import { CheckCircle, Calendar, TrendingUp, BookOpen, ArrowRight } from 'lucide-react';

const Home = () => {
  const [currentQuote, setCurrentQuote] = useState('');
  const [author, setAuthor] = useState('');

  const quotes = [
    { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
    { text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" }
  ];

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setCurrentQuote(randomQuote.text);
    setAuthor(randomQuote.author);
  }, []);

  const features = [
    {
      icon: "☀️",
      title: "Morning Routines",
      description: "Start your day with purpose and energy"
    },
    {
      icon: "📊",
      title: "Progress Tracking",
      description: "Visualize your productivity growth"
    },
    {
      icon: "📖",
      title: "Expert Tips",
      description: "Learn from productivity experts"
    },
    {
      icon: "🎯",
      title: "Goal Setting",
      description: "Set and achieve meaningful goals"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Navigation />
      
      {/* Quote of the Day Banner */}
      <section className="bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/20 dark:to-blue-800/20 py-4">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-blue-800 dark:text-blue-200 font-medium">
            💡 Quote of the Day: "{currentQuote}" - {author}
          </p>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Boost Your Day
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Plan, track, and improve your daily routines with our simple and motivational productivity platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/my-routine">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                Create Your Routine
                <CheckCircle className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/tips">
              <Button size="lg" variant="outline" className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20 rounded-full px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                View Tips
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800 dark:text-white">
              Everything You Need for a Productive Day
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Simple tools to help you build better habits and achieve your goals
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-0">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Daily Routine?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of people who have boosted their productivity and happiness.
          </p>
          <Link to="/auth">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 rounded-full px-12 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 dark:bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">Boost Your Day</span>
          </div>
          <p className="text-slate-400 mb-4">
            Transform your daily routine into a pathway to success and fulfillment.
          </p>
          <p className="text-slate-500">
            &copy; 2024 Boost Your Day. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
