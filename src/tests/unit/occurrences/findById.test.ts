import { beforeEach, describe, expect, it, vi } from 'vitest';
import { BadRequestException, NotFoundException } from '../../../exceptions';
import OccurrenceService from '../../../services/occurrence.service';
import mockedAwsS3 from '../../helpers/__mocks__/awsS3';
import mockedPrisma from '../../helpers/__mocks__/prisma';
import * as mockedData from './utils/mockedData';

vi.mock('../helpers/prisma');

describe('occurrences - findById', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('caso de sucesso', () => {
    it('deve retornar a occurrence cujo id foi passado nos parâmetros', async () => {
      const occurrence = mockedData.occurrences[0];
      const service = new OccurrenceService(mockedPrisma, mockedAwsS3);

      mockedPrisma.occurrence.findUnique.mockResolvedValue(occurrence);

      const response = await service.findById(occurrence.id);

      expect(response).toStrictEqual(occurrence);
    });
  });

  describe('casos de falha', () => {
    it('deve lançar um erro quando nenhuma occurrence for encontrada com o id passado', async () => {
      const errorMessage = 'Nenhuma Occurrence encontrada com esse Id';
      const service = new OccurrenceService(mockedPrisma, mockedAwsS3);

      mockedPrisma.occurrence.findUnique.mockResolvedValue(null);

      try {
        await service.findById(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect((error as Error).message).toBe(errorMessage);
      }
    });

    it('deve lançar um erro quando o id for inválido', async () => {
      const errorMessage = 'Id deve ser um número inteiro';
      const invalidId = 'invalid' as never;
      const service = new OccurrenceService(mockedPrisma, mockedAwsS3);

      try {
        await service.findById(invalidId);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as Error).message).toBe(errorMessage);
      }
    });
  });
});
