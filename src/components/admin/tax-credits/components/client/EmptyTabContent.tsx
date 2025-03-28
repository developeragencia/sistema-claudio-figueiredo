
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface EmptyTabContentProps {
  title: string;
  description: string;
  actionLabel: string;
  icon: React.ReactNode;
  onAction: () => void;
}

const EmptyTabContent: React.FC<EmptyTabContentProps> = ({
  title,
  description,
  actionLabel,
  icon,
  onAction
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <Button onClick={onAction}>
          <Plus className="mr-2 h-4 w-4" />
          {actionLabel}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          {icon}
          <h3 className="text-lg font-medium mt-4">Nenhum registro encontrado</h3>
          <p className="text-muted-foreground mt-1 mb-6">Este cliente ainda não possui {title.toLowerCase()} registrados.</p>
          <Button onClick={onAction}>
            <Plus className="mr-2 h-4 w-4" />
            {actionLabel}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptyTabContent;
