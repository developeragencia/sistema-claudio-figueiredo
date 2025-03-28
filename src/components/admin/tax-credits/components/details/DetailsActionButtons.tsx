
import React from 'react';
import ButtonEffect from '@/components/admin/common/ButtonEffect';
import { FileDown, Edit, Share2, Printer, ArrowLeft, Star, StarOff, FileText, Copy } from 'lucide-react';

interface DetailItem {
  id: string;
  isFavorite?: boolean;
}

interface DetailsActionButtonsProps {
  item: DetailItem;
  onBack: () => void;
  onEdit?: (itemId: string) => void;
  onExport: (itemId: string) => void;
  onPrint: (itemId: string) => void;
  onShare?: (itemId: string) => void;
  onToggleFavorite?: (itemId: string) => void;
  onGenerateReport?: (itemId: string) => void;
  onDuplicate?: (itemId: string) => void;
}

const DetailsActionButtons: React.FC<DetailsActionButtonsProps> = ({
  item,
  onBack,
  onEdit,
  onExport,
  onPrint,
  onShare,
  onToggleFavorite,
  onGenerateReport,
  onDuplicate
}) => {
  const buttons = [
    {
      icon: <ArrowLeft className="h-4 w-4" />,
      tooltip: "Voltar",
      action: onBack,
      ariaLabel: "Voltar"
    }
  ];

  if (onEdit) {
    buttons.push({
      icon: <Edit className="h-4 w-4" />,
      tooltip: "Editar",
      action: () => onEdit(item.id),
      ariaLabel: "Editar"
    });
  }

  buttons.push(
    {
      icon: <FileDown className="h-4 w-4" />,
      tooltip: "Exportar",
      action: () => onExport(item.id),
      ariaLabel: "Exportar"
    },
    {
      icon: <Printer className="h-4 w-4" />,
      tooltip: "Imprimir",
      action: () => onPrint(item.id),
      ariaLabel: "Imprimir"
    }
  );

  if (onShare) {
    buttons.push({
      icon: <Share2 className="h-4 w-4" />,
      tooltip: "Compartilhar",
      action: () => onShare(item.id),
      ariaLabel: "Compartilhar"
    });
  }

  if (onToggleFavorite) {
    buttons.push({
      icon: item.isFavorite ? <StarOff className="h-4 w-4 text-amber-500" /> : <Star className="h-4 w-4 text-amber-500" />,
      tooltip: item.isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos",
      action: () => onToggleFavorite(item.id),
      ariaLabel: item.isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"
    });
  }

  if (onGenerateReport) {
    buttons.push({
      icon: <FileText className="h-4 w-4 text-blue-500" />,
      tooltip: "Gerar relatório",
      action: () => onGenerateReport(item.id),
      ariaLabel: "Gerar relatório"
    });
  }

  if (onDuplicate) {
    buttons.push({
      icon: <Copy className="h-4 w-4" />,
      tooltip: "Duplicar",
      action: () => onDuplicate(item.id),
      ariaLabel: "Duplicar"
    });
  }

  return (
    <div className="flex flex-wrap space-x-2">
      {buttons.map((button, index) => (
        <ButtonEffect
          key={index}
          onClick={button.action}
          icon={button.icon}
          tooltip={button.tooltip}
          variant="outline"
          size="sm"
          className="h-8"
        />
      ))}
    </div>
  );
};

export default DetailsActionButtons;
