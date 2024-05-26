import { beforeEach, describe, expect, it, vi } from 'vitest';
import { BadRequestException, NotFoundException } from '../../../exceptions';
import UserService from '../../../services/user.service';
import mockedPrisma from '../../helpers/__mocks__/prisma';
import * as mockedData from './utils/mockedData';

vi.mock('../helpers/prisma');

describe('users - findById', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  const service = new UserService(mockedPrisma);

  describe('caso de sucesso', () => {
    it('deve retornar o usuário cujo id foi passado nos parâmetros', async () => {
      const user = mockedData.users[0];

      mockedPrisma.user.findUnique.mockResolvedValue(user);

      const response = await service.findById(user.id);

      expect(response).toStrictEqual(user);
    });
  });

  describe('casos de falha', () => {
    it('deve lançar um erro quando nenhum usuário foi encontrado', async () => {
      const errorMessage = 'Nenhum usuário encontrado com esse Id';

      mockedPrisma.user.findUnique.mockResolvedValue(null);

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

      try {
        await service.findById(invalidId);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as Error).message).toBe(errorMessage);
      }
    });
  });
});
