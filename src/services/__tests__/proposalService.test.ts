import { describe, it, expect, vi } from 'vitest';
import { ProposalStatus } from '@/types/proposal';
import { proposalService } from '../proposalService';

describe('proposalService', () => {
  const mockProposal = {
    id: '1',
    clientId: '1',
    clientName: 'Test Client',
    clientCNPJ: '12.345.678/0001-90',
    salesRepId: '1',
    details: {
      estimatedValue: 1000,
      description: 'Test proposal',
      periodStart: new Date(),
      periodEnd: new Date(),
      additionalNotes: 'Test notes'
    },
    status: 'DRAFT' as ProposalStatus,
    createdAt: new Date(),
    updatedAt: new Date(),
    timeline: []
  };

  it('should create a proposal', async () => {
    const createProposalSpy = vi.spyOn(proposalService, 'createProposal');
    createProposalSpy.mockResolvedValue(mockProposal);

    const result = await proposalService.createProposal({
      clientId: '1',
      clientName: 'Test Client',
      clientCNPJ: '12.345.678/0001-90',
      salesRepId: '1',
      details: {
        estimatedValue: 1000,
        description: 'Test proposal',
        periodStart: new Date(),
        periodEnd: new Date(),
        additionalNotes: 'Test notes'
      }
    });

    expect(result).toEqual(mockProposal);
    expect(createProposalSpy).toHaveBeenCalled();
  });

  it('should update a proposal', async () => {
    const updateProposalSpy = vi.spyOn(proposalService, 'updateProposal');
    updateProposalSpy.mockResolvedValue(mockProposal);

    const result = await proposalService.updateProposal('1', {
      details: {
        estimatedValue: 2000,
        description: 'Updated proposal',
        periodStart: new Date(),
        periodEnd: new Date(),
        additionalNotes: 'Updated notes'
      }
    });

    expect(result).toEqual(mockProposal);
    expect(updateProposalSpy).toHaveBeenCalled();
  });

  it('should get a proposal by id', async () => {
    const getProposalSpy = vi.spyOn(proposalService, 'getProposal');
    getProposalSpy.mockResolvedValue(mockProposal);

    const result = await proposalService.getProposal('1');

    expect(result).toEqual(mockProposal);
    expect(getProposalSpy).toHaveBeenCalledWith('1');
  });

  it('should list proposals with filters', async () => {
    const listProposalsSpy = vi.spyOn(proposalService, 'listProposals');
    listProposalsSpy.mockResolvedValue({
      data: [mockProposal],
      total: 1
    });

    const result = await proposalService.listProposals({
      clientId: '1',
      status: 'DRAFT',
      startDate: new Date(),
      endDate: new Date()
    });

    expect(result.data).toHaveLength(1);
    expect(result.data[0]).toEqual(mockProposal);
    expect(listProposalsSpy).toHaveBeenCalled();
  });

  it('should update proposal status', async () => {
    const updateStatusSpy = vi.spyOn(proposalService, 'updateStatus');
    updateStatusSpy.mockResolvedValue({
      ...mockProposal,
      status: 'ANALYSIS',
      timeline: [
        {
          id: '1',
          proposalId: '1',
          status: 'ANALYSIS',
          updatedBy: '1',
          updatedAt: new Date(),
          comments: 'Status updated'
        }
      ]
    });

    const result = await proposalService.updateStatus('1', 'ANALYSIS', '1', 'Status updated');

    expect(result.status).toBe('ANALYSIS');
    expect(result.timeline).toHaveLength(1);
    expect(updateStatusSpy).toHaveBeenCalled();
  });
}); 