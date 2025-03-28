
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ActiveClientHeader from '@/components/ActiveClientHeader';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText } from 'lucide-react';
import NewDeclarationForm from '@/components/declarations/NewDeclarationForm';

const NewDeclaration = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background">
      <ActiveClientHeader />
      <div className="container mx-auto p-4 sm:p-6">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
            className="h-8 w-8 mr-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center">
            <FileText className="h-5 w-5 mr-2 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight">Nova Declaração</h1>
          </div>
        </div>
        
        <NewDeclarationForm />
      </div>
    </div>
  );
};

export default NewDeclaration;
