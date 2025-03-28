
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, FileUp } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  size: string;
  date: string;
}

interface CreditDocumentsTabProps {
  documents: Document[];
  formatDate: (dateString: string) => string;
}

const CreditDocumentsTab: React.FC<CreditDocumentsTabProps> = ({ documents, formatDate }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Documentos</CardTitle>
        <CardDescription>Documentos relacionados a este crédito tributário</CardDescription>
      </CardHeader>
      <CardContent>
        {documents.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground">Nenhum documento disponível</p>
          </div>
        ) : (
          <div className="space-y-4">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-3 border rounded-md">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 mr-3 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-sm text-muted-foreground">{doc.size} • {formatDate(doc.date)}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t pt-6">
        <Button>
          <FileUp className="h-4 w-4 mr-2" />
          Adicionar Documento
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreditDocumentsTab;
