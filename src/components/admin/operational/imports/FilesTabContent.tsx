
import React from 'react';
import ImportFormatsCard from './ImportFormatsCard';
import RecentImportsCard from './RecentImportsCard';
import { Button } from "@/components/ui/button";
import { PlusCircle, FileUp } from "lucide-react";

interface FilesTabContentProps {
  onFormatClick: (format: string) => void;
}

const FilesTabContent: React.FC<FilesTabContentProps> = ({ onFormatClick }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button className="flex items-center gap-2">
          <FileUp className="h-4 w-4" />
          Novo Upload
        </Button>
      </div>
      
      <ImportFormatsCard onFormatClick={onFormatClick} />
      
      <RecentImportsCard />
    </div>
  );
};

export default FilesTabContent;
