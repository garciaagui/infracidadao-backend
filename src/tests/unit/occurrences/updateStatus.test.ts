import { Status } from '@prisma/client';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { BadRequestException, NotFoundException } from '../../../exceptions';
import OccurrenceService from '../../../services/occurrence.service';
import mockedAwsS3 from '../../helpers/__mocks__/awsS3';
import mockedPrisma from '../../helpers/__mocks__/prisma';
import * as mockedData from './utils/mockedData';

vi.mock('../helpers/prisma');

describe('occurrences - updateStatus', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  const { occurrences } = mockedData;
  const service = new OccurrenceService(mockedPrisma, mockedAwsS3);

  describe('caso de sucesso', () => {
    it('deve retornar a occurrence com o status atualizado', async () => {
      const { updateStatusResponse, occurrences } = mockedData;
      const occurrenceToBeUpdated = occurrences[1];

      mockedPrisma.occurrence.findUnique.mockResolvedValue(
        occurrenceToBeUpdated
      );
      mockedPrisma.occurrence.update.mockResolvedValue(updateStatusResponse);

      const response = await service.updateStatus(
        occurrenceToBeUpdated.id,
        Status.Andamento
      );

      expect(response).toStrictEqual(updateStatusResponse);
    });
  });

  describe('casos de falha', () => {
    describe('casos de id inválido', () => {
      it('deve lançar um erro caso nenhuma occurrence seja encontrada com o id passado', async () => {
        const errorMessage = 'Nenhuma Occurrence encontrada com esse Id';

        mockedPrisma.occurrence.findUnique.mockResolvedValue(null);

        try {
          await service.updateStatus(999, Status.Andamento);
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
          expect((error as Error).message).toBe(errorMessage);
        }
      });

      it('deve lançar um erro quando o id passado for inválido', async () => {
        const errorMessage = 'Id deve ser um número inteiro';
        const invalidId = 'invalid' as never;

        try {
          await service.updateStatus(invalidId, Status.Andamento);
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect((error as Error).message).toBe(errorMessage);
        }
      });
    });

    describe('casos de status inválido', () => {
      it('deve lançar um erro caso a occurrence já esteja finalizada', async () => {
        const occurrenceToBeUpdated = occurrences[0];
        const errorMessage = 'Occurrence já finalizada';

        mockedPrisma.occurrence.findUnique.mockResolvedValue(
          occurrenceToBeUpdated
        );

        try {
          await service.updateStatus(
            occurrenceToBeUpdated.id,
            Status.Andamento
          );
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect((error as Error).message).toBe(errorMessage);
        }
      });

      it('deve lançar um erro caso o valor de status não seja `Andamento` ou `Finalizado`', async () => {
        const occurrenceToBeUpdated = occurrences[1];
        const errorMessage =
          'Status inválido. Valores aceitos na atualização: `Andamento` ou `Finalizado`';
        const invalidStatus = 'invalid' as never;

        mockedPrisma.occurrence.findUnique.mockResolvedValue(
          occurrenceToBeUpdated
        );

        try {
          await service.updateStatus(occurrenceToBeUpdated.id, invalidStatus);
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect((error as Error).message).toBe(errorMessage);
        }
      });

      it('deve lançar um erro caso o novo status seja igual ao atual', async () => {
        const occurrenceToBeUpdated = occurrences[2];
        const errorMessage = 'Novo status é igual ao status atual';

        mockedPrisma.occurrence.findUnique.mockResolvedValue(
          occurrenceToBeUpdated
        );

        try {
          await service.updateStatus(
            occurrenceToBeUpdated.id,
            Status.Andamento
          );
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect((error as Error).message).toBe(errorMessage);
        }
      });
    });
  });
});
