
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, DownloadCloud } from 'lucide-react';

type Supplier = {
  id: string;
  name: string;
  cnpj: string;
  cnae: string;
  cnaeDescription: string;
  taxRate: number;
  isEligible: boolean;
};

const mockSuppliers: Supplier[] = [
  {
    id: '1',
    name: 'Empresa de Consultoria ABC',
    cnpj: '12.345.678/0001-90',
    cnae: '7020-4/00',
    cnaeDescription: 'Atividades de consultoria em gestão empresarial',
    taxRate: 1.5,
    isEligible: true,
  },
  {
    id: '2',
    name: 'Servicos de TI XYZ',
    cnpj: '98.765.432/0001-10',
    cnae: '6201-5/01',
    cnaeDescription: 'Desenvolvimento de programas de computador sob encomenda',
    taxRate: 4.5,
    isEligible: true,
  },
  {
    id: '3',
    name: 'Transportadora Rápida',
    cnpj: '45.678.901/0001-23',
    cnae: '4930-2/01',
    cnaeDescription: 'Transporte rodoviário de carga',
    taxRate: 0.0,
    isEligible: false,
  },
  {
    id: '4',
    name: 'Construtora Edifica',
    cnpj: '78.901.234/0001-56',
    cnae: '4120-4/00',
    cnaeDescription: 'Construção de edifícios',
    taxRate: 2.5,
    isEligible: true,
  },
  {
    id: '5',
    name: 'Serviços Gerais Multiuso',
    cnpj: '56.789.012/0001-34',
    cnae: '8121-4/00',
    cnaeDescription: 'Limpeza em prédios e em domicílios',
    taxRate: 1.0,
    isEligible: true,
  },
];

const SupplierCnaeTable: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>(mockSuppliers);
  const [search, setSearch] = useState('');

  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(search.toLowerCase()) ||
      supplier.cnpj.includes(search) ||
      supplier.cnae.includes(search)
  );

  const handleDownload = () => {
    alert('Exportando tabela para Excel...');
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h3 className="text-lg font-medium">Fornecedores e CNAEs Cadastrados</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar fornecedor..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="outline" onClick={handleDownload}>
            <DownloadCloud className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fornecedor</TableHead>
              <TableHead>CNPJ</TableHead>
              <TableHead>CNAE</TableHead>
              <TableHead>Descrição CNAE</TableHead>
              <TableHead className="text-right">Alíquota (%)</TableHead>
              <TableHead className="text-center">Retenção Obrigatória</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSuppliers.length > 0 ? (
              filteredSuppliers.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell className="font-medium">{supplier.name}</TableCell>
                  <TableCell>{supplier.cnpj}</TableCell>
                  <TableCell>{supplier.cnae}</TableCell>
                  <TableCell>{supplier.cnaeDescription}</TableCell>
                  <TableCell className="text-right">{supplier.taxRate.toFixed(2)}%</TableCell>
                  <TableCell className="text-center">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        supplier.isEligible
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {supplier.isEligible ? 'Sim' : 'Não'}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Nenhum fornecedor encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SupplierCnaeTable;
