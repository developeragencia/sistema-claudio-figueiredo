
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface PlaceholderTabContentProps {
  title: string;
  description: string;
}

const PlaceholderTabContent: React.FC<PlaceholderTabContentProps> = ({ title, description }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Os dados estão sendo processados e estarão disponíveis em breve.
        </p>
      </CardContent>
    </Card>
  );
};

export default PlaceholderTabContent;
