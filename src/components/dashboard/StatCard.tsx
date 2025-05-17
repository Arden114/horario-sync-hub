
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  to?: string;
  className?: string;
}

export const StatCard = ({ title, value, icon, to, className }: StatCardProps) => {
  const CardContent = (
    <div className={cn("flex h-full flex-col justify-between rounded-lg border bg-card p-6 text-card-foreground shadow transition-all hover:shadow-md", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{title}</h3>
        <div className="rounded-full bg-primary/10 p-2 text-primary">
          {icon}
        </div>
      </div>
      <div className="mt-4">
        <p className="text-3xl font-bold">{value}</p>
      </div>
    </div>
  );

  if (to) {
    return <Link to={to}>{CardContent}</Link>;
  }

  return CardContent;
};
