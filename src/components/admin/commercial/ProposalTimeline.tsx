
import React from 'react';
import { Check, Clock, Edit, FileCheck, FilePlus, ThumbsDown, ThumbsUp } from 'lucide-react';
import { ProposalTimeline as ProposalTimelineType, ProposalTimelineEvent } from '@/types/proposal';
import { cn } from '@/lib/utils';

interface ProposalTimelineProps {
  events: ProposalTimelineType[] | ProposalTimelineEvent[];
}

const ProposalTimeline: React.FC<ProposalTimelineProps> = ({ events }) => {
  const sortedEvents = [...events].sort((a, b) => 
    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return (
    <div className="space-y-4">
      <div className="relative ml-6 py-2">
        <div className="absolute top-0 bottom-0 left-0 w-0.5 bg-border -ml-3" />
        
        {sortedEvents.map((event, index) => {
          // Handle both event types (backward compatibility)
          const eventType = 'type' in event ? event.type : getStatusEventType(event.status);
          const eventDescription = 'description' in event ? event.description : `Status changed to ${event.status}`;
          const userName = 'userName' in event ? event.userName : 'User';

          return (
            <div key={event.id || index} className="relative mb-8 last:mb-0">
              <div className="absolute -left-6 mt-1.5">
                <div className={cn(
                  "h-6 w-6 rounded-full flex items-center justify-center",
                  getEventIconBackground(eventType)
                )}>
                  {getEventIcon(eventType)}
                </div>
              </div>
              
              <div className="ml-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                  <h4 className="font-medium">{getEventTitle(eventType)}</h4>
                  <div className="text-xs text-muted-foreground flex items-center">
                    <Clock className="h-3 w-3 mr-1 inline" />
                    {formatDateTime(event.createdAt)}
                  </div>
                </div>
                
                <p className="text-sm mb-2">{eventDescription}</p>
                
                <div className="text-xs text-muted-foreground flex items-center">
                  <div className="h-4 w-4 rounded-full bg-muted flex items-center justify-center mr-1.5">
                    <span className="text-[10px]">{userName.charAt(0)}</span>
                  </div>
                  <span>{userName}</span>
                </div>
                
                {'metadata' in event && event.metadata && event.type === 'REJECTED' && (
                  <div className="mt-2 text-sm border border-red-200 rounded-md p-2 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-900/20 dark:text-red-300">
                    <strong>Motivo:</strong> {event.metadata.reason}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Helper functions
function getStatusEventType(status: string): string {
  switch (status) {
    case 'DRAFT':
    case 'PENDING':
    case 'REQUEST':
      return 'CREATED';
    case 'IN_ANALYSIS':
    case 'ANALYSIS':
      return 'ANALYZED';
    case 'APPROVED':
      return 'APPROVED';
    case 'REJECTED':
      return 'REJECTED';
    case 'CONVERTED':
      return 'CONVERTED';
    case 'CANCELLED':
      return 'CANCELLED';
    default:
      return 'UPDATED';
  }
}

function getEventIcon(type: string) {
  switch (type) {
    case 'CREATED':
      return <FilePlus className="h-3.5 w-3.5 text-white" />;
    case 'UPDATED':
      return <Edit className="h-3.5 w-3.5 text-white" />;
    case 'ANALYZED':
      return <Check className="h-3.5 w-3.5 text-white" />;
    case 'APPROVED':
      return <ThumbsUp className="h-3.5 w-3.5 text-white" />;
    case 'REJECTED':
      return <ThumbsDown className="h-3.5 w-3.5 text-white" />;
    case 'CONVERTED':
      return <FileCheck className="h-3.5 w-3.5 text-white" />;
    default:
      return <Clock className="h-3.5 w-3.5 text-white" />;
  }
}

function getEventIconBackground(type: string) {
  switch (type) {
    case 'CREATED':
      return 'bg-blue-600';
    case 'UPDATED':
      return 'bg-amber-600';
    case 'ANALYZED':
      return 'bg-cyan-600';
    case 'APPROVED':
      return 'bg-green-600';
    case 'REJECTED':
      return 'bg-red-600';
    case 'CONVERTED':
      return 'bg-purple-600';
    case 'CANCELLED':
      return 'bg-slate-600';
    default:
      return 'bg-slate-600';
  }
}

function getEventTitle(type: string) {
  switch (type) {
    case 'CREATED':
      return 'Proposta criada';
    case 'UPDATED':
      return 'Proposta atualizada';
    case 'ANALYZED':
      return 'Proposta analisada';
    case 'APPROVED':
      return 'Proposta aprovada';
    case 'REJECTED':
      return 'Proposta rejeitada';
    case 'CONVERTED':
      return 'Convertida em contrato';
    case 'CANCELLED':
      return 'Proposta cancelada';
    default:
      return 'Evento registrado';
  }
}

function formatDateTime(dateTimeString: string) {
  const date = new Date(dateTimeString);
  
  const formattedDate = date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  
  const formattedTime = date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  });
  
  return `${formattedDate} às ${formattedTime}`;
}

export default ProposalTimeline;
