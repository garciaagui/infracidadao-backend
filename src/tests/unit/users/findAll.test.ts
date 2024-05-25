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

  describe('caso de sucesso', () => {
    it('deve retornar todos os usuários', async () => {
      const { users } = mockedData;
      const service = new UserService(mockedPrisma);

      mockedPrisma.user.findMany.mockResolvedValue(users);

      const response = await service.findAll();

      expect(response).toStrictEqual(users);
    });
  });

  describe('casos de falha', () => {
    it('deve lançar um erro quando nenhum usuário for encontrado', async () => {
      const errorMessage = 'Nenhum usuário encontrado';
      const service = new UserService(mockedPrisma);

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
