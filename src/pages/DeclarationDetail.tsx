
import React from 'react';
import { useParams  } from "@/hooks/use-router";
import ActiveClientHeader from '@/components/ActiveClientHeader';
import { useDeclarationData } from '@/hooks/useDeclarationData';
import DetailHeader from '@/components/declarations/DetailHeader';
import DeclarationDetailsCard from '@/components/declarations/DeclarationDetailsCard';
import AttachmentsCard from '@/components/declarations/AttachmentsCard';
import CompanyInfoCard from '@/components/declarations/CompanyInfoCard';
import HistoryCard from '@/components/declarations/HistoryCard';
import DeclarationNotFound from '@/components/declarations/DeclarationNotFound';

const DeclarationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { declaration, loading, formatDate } = useDeclarationData(id);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <ActiveClientHeader />
        <div className="container mx-auto p-4 sm:p-6 flex items-center justify-center">
          <div className="animate-spin h-8 w-8 border-t-2 border-primary rounded-full"></div>
        </div>
      </div>
    );
  }
  
  if (!declaration) {
    return (
      <div className="min-h-screen bg-background">
        <ActiveClientHeader />
        <DeclarationNotFound />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <ActiveClientHeader />
      <div className="container mx-auto p-4 sm:p-6">
        <DetailHeader title={declaration.title} />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <DeclarationDetailsCard 
              declaration={declaration} 
              formatDate={formatDate} 
            />
            
            <AttachmentsCard 
              attachments={declaration.attachments} 
              formatDate={formatDate} 
            />
          </div>
          
          <div className="space-y-6">
            <CompanyInfoCard declaration={declaration} />
            <HistoryCard historyItems={declaration.history} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeclarationDetail;
