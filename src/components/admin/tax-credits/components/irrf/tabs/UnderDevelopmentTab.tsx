
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Landmark, Calculator, FileText, Settings, Plus } from 'lucide-react';

interface UnderDevelopmentTabProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  buttonAction?: () => void;
  buttonIcon?: React.ReactNode;
  buttonText?: string;
}

const UnderDevelopmentTab: React.FC<UnderDevelopmentTabProps> = ({
  title,
  description,
  icon,
  buttonAction,
  buttonIcon = <Plus className="mr-2 h-4 w-4" />,
  buttonText = "Criar Processo de Teste"
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          {icon}
          <h3 className="text-lg font-medium">Módulo em desenvolvimento</h3>
          <p className="text-muted-foreground mt-1 mb-6 max-w-md">
            O módulo de {title.toLowerCase()} está sendo desenvolvido e estará disponível em breve.
          </p>
          {buttonAction && (
            <Button onClick={buttonAction}>
              {buttonIcon}
              {buttonText}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Componentes específicos para cada tab
export const ProcessesTab: React.FC<{onNewRecovery: () => void}> = ({ onNewRecovery }) => (
  <UnderDevelopmentTab
    title="Processos de Recuperação"
    description="Gerencie todos os processos de recuperação de créditos IRRF/PJ"
    icon={<Landmark className="h-16 w-16 text-muted-foreground/60 mb-4" />}
    buttonAction={onNewRecovery}
    buttonText="Criar Processo de Teste"
  />
);

export const CalculationsTab: React.FC<{onRunCalculation: () => void}> = ({ onRunCalculation }) => (
  <UnderDevelopmentTab
    title="Cálculos IRRF/PJ"
    description="Calcule e simule recuperações de créditos tributários"
    icon={<Calculator className="h-16 w-16 text-muted-foreground/60 mb-4" />}
    buttonAction={onRunCalculation}
    buttonIcon={<Calculator className="mr-2 h-4 w-4" />}
    buttonText="Executar Cálculo de Teste"
  />
);

export const ReportsTab: React.FC = () => (
  <UnderDevelopmentTab
    title="Relatórios IRRF/PJ"
    description="Visualize relatórios detalhados sobre o processo de recuperação"
    icon={<FileText className="h-16 w-16 text-muted-foreground/60 mb-4" />}
    buttonIcon={<FileText className="mr-2 h-4 w-4" />}
    buttonText="Ver Exemplo de Relatório"
  />
);

export const SettingsTab: React.FC = () => (
  <UnderDevelopmentTab
    title="Configurações IRRF/PJ"
    description="Configure os parâmetros do sistema de recuperação IRRF/PJ"
    icon={<Settings className="h-16 w-16 text-muted-foreground/60 mb-4" />}
    buttonIcon={<Settings className="mr-2 h-4 w-4" />}
    buttonText="Configurações Padrão"
  />
);
