
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, FileUp } from 'lucide-react';
import { Attachment } from '@/types/declarations';

interface AttachmentsCardProps {
  attachments: Attachment[];
  formatDate: (date: string) => string;
}

const AttachmentsCard: React.FC<AttachmentsCardProps> = ({ attachments, formatDate }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Anexos</CardTitle>
        <CardDescription>Documentos relacionados a esta declaração</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {attachments.map((attachment) => (
            <div key={attachment.id} className="flex items-center justify-between p-3 border rounded-md">
              <div className="flex items-center">
                <FileText className="h-5 w-5 mr-3 text-muted-foreground" />
                <div>
                  <p className="font-medium">{attachment.fileName || attachment.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {attachment.fileSize ? `${attachment.fileSize} bytes` : attachment.size} • {formatDate(attachment.uploadedAt || attachment.date)}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-6">
        <Button>
          <FileUp className="h-4 w-4 mr-2" />
          Adicionar Anexo
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AttachmentsCard;
