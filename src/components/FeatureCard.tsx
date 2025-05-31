
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

export const FeatureCard = ({ icon, title, description, delay = 0 }: FeatureCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 cursor-pointer text-center animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-4">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
          {icon}
        </div>
        <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-slate-600 dark:text-slate-300 leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};
