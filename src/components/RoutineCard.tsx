
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Plus, ArrowRight } from 'lucide-react';

interface RoutineCardProps {
  title: string;
  icon: string;
  description: string;
  tasks: string[];
  color: string;
  delay?: number;
}

export const RoutineCard = ({ title, icon, description, tasks, color, delay = 0 }: RoutineCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 cursor-pointer overflow-hidden"
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`h-2 bg-gradient-to-r ${color} transform transition-all duration-300 ${isHovered ? 'scale-x-100' : 'scale-x-0'} origin-left`}></div>
      
      <CardHeader className="text-center pb-4">
        <div className="w-16 h-16 mx-auto mb-4 text-4xl flex items-center justify-center bg-gradient-to-br from-white to-gray-50 dark:from-slate-700 dark:to-slate-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <CardTitle className="text-xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-200 dark:to-slate-100 bg-clip-text text-transparent">
          {title}
        </CardTitle>
        <CardDescription className="text-slate-600 dark:text-slate-300">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {tasks.map((task, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-300">
              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
              <span>{task}</span>
            </div>
          ))}
        </div>
        
        <div className="flex space-x-2 pt-4">
          <Button 
            size="sm" 
            className={`flex-1 bg-gradient-to-r ${color} text-white border-0 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200`}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Routine
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="border-slate-300 text-slate-600 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
