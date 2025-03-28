
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Filter } from "lucide-react";
import { motion } from "framer-motion";
import ButtonEffect from '@/components/admin/common/ButtonEffect';

interface CreditSearchProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const CreditSearch: React.FC<CreditSearchProps> = ({ searchQuery, setSearchQuery }) => {
  const handleSearch = () => {
    console.log("Realizando busca:", searchQuery);
    // Implementação da lógica de busca
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Buscar Créditos Identificados</CardTitle>
        <CardDescription>
          Pesquise por fornecedor, CNPJ ou número de identificação.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1 group">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
            <Input 
              type="search" 
              placeholder="Buscar crédito..." 
              className="pl-9 transition-all border-input focus:border-primary" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="outline" 
                className="flex items-center gap-2 transition-all duration-300 hover:border-primary/50 hover:bg-primary/5"
              >
                <motion.span
                  animate={{ rotate: [0, 15, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
                >
                  <Filter className="h-4 w-4" />
                </motion.span>
                Filtros
              </Button>
            </motion.div>
            <ButtonEffect 
              onClick={handleSearch} 
              icon={<Search className="h-4 w-4" />}
              label="Buscar" 
              variant="default" 
              className="bg-primary hover:bg-primary/90"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreditSearch;
