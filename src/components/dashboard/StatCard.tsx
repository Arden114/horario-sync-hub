
import React, { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: ReactNode;
  to?: string;
  className?: string;
}

export function StatCard({ title, value, description, icon, to, className }: StatCardProps) {
  const CardComponent = to ? Link : 'div';
  const props = to ? { to } : {};
  
  return (
    <CardComponent
      {...props}
      className={cn(
        "transition-all",
        to && "cursor-pointer hover:scale-105 hover:shadow-md",
        className
      )}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <div className="h-9 w-9 rounded-lg bg-primary/10 p-2 text-primary">
            {icon}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </CardContent>
      </Card>
    </CardComponent>
  );
}
