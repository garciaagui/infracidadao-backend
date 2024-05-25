import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NotFoundException } from '../../../exceptions';
import OccurrenceService from '../../../services/occurrence.service';
import mockedAwsS3 from '../../helpers/__mocks__/awsS3';
import mockedPrisma from '../../helpers/__mocks__/prisma';
import * as mockedData from './utils/mockedData';

vi.mock('../helpers/prisma');

describe('occurrences - findAll', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('caso de sucesso', () => {
    it('deve retornar todas as occurrences', async () => {
      const { occurrences } = mockedData;
      const service = new OccurrenceService(mockedPrisma, mockedAwsS3);

      mockedPrisma.occurrence.findMany.mockResolvedValue(occurrences);

      const response = await service.findAll();

      expect(response).toStrictEqual(occurrences);
    });
  });

  describe('caso de falha', () => {
    it('deve lançar um erro quando nenhuma occurrence for encontrada', async () => {
      const errorMessage = 'Nenhuma occurrence encontrada';
      const service = new OccurrenceService(mockedPrisma, mockedAwsS3);

      mockedPrisma.occurrence.findMany.mockResolvedValue([]);

      try {
        await service.findAll();
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect((error as Error).message).toBe(errorMessage);
      }
    });
  });
});
