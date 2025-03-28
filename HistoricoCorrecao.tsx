import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Box, Heading, Table, Thead, Tr, Th, Tbody, Td, Spinner } from '@chakra-ui/react';
import { format } from 'date-fns';
import { formataMoeda } from '../../utils/formatters';
import { correcaoService } from '../../services/correcao/CorrecaoMonetariaService';

interface Props {
  retencaoId: string;
}

export const HistoricoCorrecao: React.FC<Props> = ({ retencaoId }) => {
  const { data, isLoading } = useQuery(
    ['correcao', retencaoId],
    () => correcaoService.obterHistorico(retencaoId)
  );

  return (
    <Box>
      <Heading size="md" mb={4}>Histórico de Correção</Heading>
      
      {isLoading ? (
        <Spinner />
      ) : (
        <Table>
          <Thead>
            <Tr>
              <Th>Período</Th>
              <Th>Taxa Selic</Th>
              <Th isNumeric>Valor Base</Th>
              <Th isNumeric>Correção</Th>
              <Th isNumeric>Valor Corrigido</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.fatores.map((fator, index) => (
              <Tr key={index}>
                <Td>{format(fator.data, 'MM/yyyy')}</Td>
                <Td>{fator.taxa.toFixed(2)}%</Td>
                <Td isNumeric>{formataMoeda(fator.valorBase)}</Td>
                <Td isNumeric>{formataMoeda(fator.valorCorrecao)}</Td>
                <Td isNumeric>{formataMoeda(fator.valorCorrigido)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
}; 