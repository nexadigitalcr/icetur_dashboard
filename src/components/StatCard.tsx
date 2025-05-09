import React from 'react';
import { cn } from '../lib/utils';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatCard({ title, value, icon: Icon, trend, className }: StatCardProps) {
  return (
    <div className={cn(
      "bg-carbon-gray p-4 rounded-xl",
      className
    )}>
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <h3 className="text-white text-2xl font-bold mt-1">{value}</h3>
        </div>
        <Icon className="w-6 h-6 text-accent-orange" />
      </div>
      {trend && (
        <div className="flex items-center gap-1">
          <span className={`text-sm ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {trend.isPositive ? '+' : ''}{trend.value}%
          </span>
          <span className="text-gray-400 text-sm">vs mes anterior</span>
        </div>
      )}
    </div>
  );
}