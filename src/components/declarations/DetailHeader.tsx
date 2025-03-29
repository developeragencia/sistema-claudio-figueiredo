
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, ArrowLeft } from 'lucide-react';
import { useNavigate  } from "@/hooks/use-router";

interface DetailHeaderProps {
  title: string;
}

const DetailHeader: React.FC<DetailHeaderProps> = ({ title }) => {
  const navigate = useNavigate();
  
  return (
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
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      </div>
    </div>
  );
};

export default DetailHeader;
