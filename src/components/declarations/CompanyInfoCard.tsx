import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Declaration } from '@/types/declarations';

interface CompanyInfoCardProps {
  declaration: Declaration;
}

const CompanyInfoCard = ({ declaration }: CompanyInfoCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações da Empresa</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Razão Social</p>
              <p className="text-sm text-muted-foreground">{declaration.companyName}</p>
            </div>
            <div>
              <p className="text-sm font-medium">CNPJ</p>
              <p className="text-sm text-muted-foreground">{declaration.cnpj}</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium">Status</p>
            <p className="text-sm text-muted-foreground">{declaration.status}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Valor</p>
            <p className="text-sm text-muted-foreground">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(declaration.value)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyInfoCard;
