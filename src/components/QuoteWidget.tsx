
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Quote } from 'lucide-react';

const quotes = [
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain"
  },
  {
    text: "Success is the sum of small efforts repeated day in and day out.",
    author: "Robert Collier"
  },
  {
    text: "You are never too old to set another goal or to dream a new dream.",
    author: "C.S. Lewis"
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt"
  },
  {
    text: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle"
  },
  {
    text: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins"
  },
  {
    text: "In the middle of difficulty lies opportunity.",
    author: "Albert Einstein"
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt"
  }
];

export const QuoteWidget = () => {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshQuote = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setCurrentQuote(randomQuote);
      setIsRefreshing(false);
    }, 500);
  };

  useEffect(() => {
    // Set a random quote on initial load
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setCurrentQuote(randomQuote);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-r from-purple-100 via-pink-50 to-blue-100 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-blue-900/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Quote className="h-8 w-8 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Quote of the Day
            </h3>
            <blockquote className={`text-xl md:text-2xl font-medium text-slate-700 dark:text-slate-200 mb-4 transition-opacity duration-300 ${isRefreshing ? 'opacity-0' : 'opacity-100'}`}>
              "{currentQuote.text}"
            </blockquote>
            <p className={`text-lg text-slate-500 dark:text-slate-400 mb-6 transition-opacity duration-300 ${isRefreshing ? 'opacity-0' : 'opacity-100'}`}>
              — {currentQuote.author}
            </p>
            <Button
              onClick={refreshQuote}
              disabled={isRefreshing}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              New Quote
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
