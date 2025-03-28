import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  description: string;
  createButton?: {
    label: string;
    onClick: () => void;
  };
}

export function PageHeader({ title, description, createButton }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
      {createButton && (
        <Button className="gap-2" onClick={createButton.onClick}>
          <Plus className="h-4 w-4" />
          {createButton.label}
        </Button>
      )}
    </div>
  );
} 