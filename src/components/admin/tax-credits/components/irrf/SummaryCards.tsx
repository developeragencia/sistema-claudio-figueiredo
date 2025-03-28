
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Landmark, CheckCircle, RefreshCw, AlertTriangle } from 'lucide-react';

type SummaryCardData = {
  title: string;
  value: string;
  icon: React.ReactNode;
  badge: { label: string; color: string };
};

interface SummaryCardsProps {
  summaryData: SummaryCardData[];
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ summaryData }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {summaryData.map((item, index) => (
        <Card key={index}>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">{item.title}</p>
              <h3 className="text-2xl font-bold">{item.value}</h3>
              <Badge variant="secondary" className={`mt-2 ${item.badge.color}`}>
                {item.badge.label}
              </Badge>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              {item.icon}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SummaryCards;
