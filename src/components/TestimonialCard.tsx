
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  role: string;
  image: string;
  rating: number;
  quote: string;
  delay?: number;
}

export const TestimonialCard = ({ name, role, image, rating, quote, delay = 0 }: TestimonialCardProps) => {
  return (
    <Card 
      className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardContent className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative">
            <img
              src={image}
              alt={name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-lg"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-slate-900 dark:text-slate-100">{name}</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">{role}</p>
          </div>
        </div>
        
        <div className="flex space-x-1 mb-4">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={`h-4 w-4 ${
                index < rating
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300 dark:text-gray-600'
              }`}
            />
          ))}
          <span className="ml-2 text-sm text-slate-600 dark:text-slate-400">
            ({rating}/5)
          </span>
        </div>
        
        <blockquote className="text-slate-700 dark:text-slate-200 italic leading-relaxed">
          "{quote}"
        </blockquote>
      </CardContent>
    </Card>
  );
};
