
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import { HistoryItem } from '@/types/declarations';

interface HistoryCardProps {
  historyItems: HistoryItem[];
}

const HistoryCard: React.FC<HistoryCardProps> = ({ historyItems }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico</CardTitle>
        <CardDescription>Registro de atividades</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative pl-6 space-y-6">
          <div className="absolute top-0 bottom-0 left-2 border-l-2 border-dashed border-muted"></div>
          
          {historyItems.map((event) => (
            <div key={event.id} className="relative">
              <div className="absolute -left-6 top-0 w-4 h-4 rounded-full bg-background border-2 border-primary"></div>
              <div>
                <p className="font-medium">{event.action}</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{event.date}</span>
                </div>
                <p className="text-sm text-muted-foreground">{event.user}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HistoryCard;
