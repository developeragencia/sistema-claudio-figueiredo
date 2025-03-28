import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

type TableName = 'tax_credits' | 'audits' | 'recovery_processes' | 'clients';
type Event = 'INSERT' | 'UPDATE' | 'DELETE' | '*';

interface UseRealtimeUpdatesOptions {
  tableName: TableName;
  events?: Event[];
  onInsert?: (payload: any) => void;
  onUpdate?: (payload: any) => void;
  onDelete?: (payload: any) => void;
  showToasts?: boolean;
}

interface RealtimeUpdateCallbacks<T> {
  onInsert?: (payload: T) => void;
  onUpdate?: (payload: T) => void;
  onDelete?: (payload: T) => void;
}

export function useRealtimeUpdates<T>({
  tableName,
  events = ['INSERT', 'UPDATE', 'DELETE'],
  onInsert,
  onUpdate,
  onDelete,
  showToasts = true,
}: UseRealtimeUpdatesOptions) {
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    // Create channel for real-time updates
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { 
          event: '*', // Listen to all events and filter in the callback
          schema: 'public', 
          table: tableName 
        },
        (payload) => {
          console.log(`Realtime update for ${tableName}:`, payload);
          
          // Handle different events
          if (payload.eventType === 'INSERT' && events.includes('INSERT')) {
            if (showToasts) {
              toast.success(`Novo registro adicionado`, {
                description: `Um novo registro foi adicionado à tabela ${tableName}`,
              });
            }
            if (onInsert) onInsert(payload.new);
          } 
          
          else if (payload.eventType === 'UPDATE' && events.includes('UPDATE')) {
            if (showToasts) {
              toast.info(`Registro atualizado`, {
                description: `Um registro foi atualizado na tabela ${tableName}`,
              });
            }
            if (onUpdate) onUpdate(payload.new);
          } 
          
          else if (payload.eventType === 'DELETE' && events.includes('DELETE')) {
            if (showToasts) {
              toast.info(`Registro removido`, {
                description: `Um registro foi removido da tabela ${tableName}`,
              });
            }
            if (onDelete) onDelete(payload.old);
          }
        }
      )
      .subscribe((status) => {
        console.log(`Realtime subscription status for ${tableName}:`, status);
        setIsListening(status === 'SUBSCRIBED');
      });

    // Cleanup subscription on unmount
    return () => {
      console.log(`Cleaning up realtime subscription for ${tableName}`);
      supabase.removeChannel(channel);
    };
  }, [tableName, events, onInsert, onUpdate, onDelete, showToasts]);

  return { isListening };
}
