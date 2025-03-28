import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Box, Heading, Text, Timeline, TimelineItem, TimelineIcon, TimelineContent } from '@chakra-ui/react';
import { format } from 'date-fns';
import { Spinner } from '@chakra-ui/react';
import { auditoriaService } from '../../services/auditoria/AuditoriaRetencaoService';
import { formatarTipoEvento } from '../../utils/formatarTipoEvento';
import { DadosAuditoria } from './DadosAuditoria';

export const AuditoriaRetencao: React.FC<AuditoriaRetencaoProps> = ({
  retencaoId
}) => {
  const { data: registros, isLoading } = useQuery(
    ['auditoria', retencaoId],
    () => auditoriaService.obterHistorico(retencaoId)
  );

  return (
    <Box>
      <Heading size="md" mb={4}>Histórico de Auditoria</Heading>
      
      {isLoading ? (
        <Spinner />
      ) : (
        <Timeline>
          {registros?.map(registro => (
            <TimelineItem key={registro.id}>
              <TimelineIcon tipo={registro.tipo} />
              <TimelineContent>
                <Text fontWeight="bold">
                  {formatarTipoEvento(registro.tipo)}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  {format(registro.data, "dd/MM/yyyy HH:mm")}
                </Text>
                <Text mt={2}>{registro.descricao}</Text>
                {registro.dados && (
                  <Box mt={2}>
                    <Heading size="xs" mb={2}>Detalhes da Alteração</Heading>
                    <DadosAuditoria dados={registro.dados} />
                  </Box>
                )}
                <Text fontSize="sm" mt={2} color="gray.500">
                  Realizado por: {registro.usuarioNome}
                </Text>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      )}
    </Box>
  );
}; 