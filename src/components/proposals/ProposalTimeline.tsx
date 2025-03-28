import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { ProposalTimeline as ProposalTimelineType } from '@/types/proposal';
import { PROPOSAL_STATUS_LABELS, PROPOSAL_STATUS_COLORS } from '@/types/proposal';

interface ProposalTimelineProps {
  timeline: ProposalTimelineType[];
}

export function ProposalTimeline({ timeline }: ProposalTimelineProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {timeline.map((event) => (
            <div key={event.id} className="flex items-start gap-4">
              <div className="w-2 h-2 mt-2 rounded-full bg-primary" />
              <div>
                <Badge
                  variant="outline"
                  className={PROPOSAL_STATUS_COLORS[event.status]}
                >
                  {PROPOSAL_STATUS_LABELS[event.status]}
                </Badge>
                {event.comments && (
                  <p className="text-sm text-gray-500 mt-1">{event.comments}</p>
                )}
                <p className="text-xs text-gray-400 mt-1">
                  {format(new Date(event.updatedAt), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                  {event.updatedBy && (
                    <> por {event.updatedBy}</>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 