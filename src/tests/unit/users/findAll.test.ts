import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NotFoundException } from '../../../exceptions';
import UserService from '../../../services/user.service';
import mockedPrisma from '../../helpers/__mocks__/prisma';
import * as mockedData from './utils/mockedData';

vi.mock('../helpers/prisma');

describe('users - findAll', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  const service = new UserService(mockedPrisma);

  describe('caso de sucesso', () => {
    it('deve retornar todos os usuários', async () => {
      const { users } = mockedData;

      mockedPrisma.user.findMany.mockResolvedValue(users);

      const response = await service.findAll();

      expect(response).toStrictEqual(users);
    });
  });

  describe('caso de falha', () => {
    it('deve lançar um erro quando nenhum usuário for encontrado', async () => {
      const errorMessage = 'Nenhum usuário encontrado';

      mockedPrisma.user.findMany.mockResolvedValue([]);

      try {
        await service.findAll();
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect((error as Error).message).toBe(errorMessage);
      }
    });
  });
});
