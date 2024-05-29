import { beforeEach, describe, expect, it, vi } from 'vitest';
import { BadRequestException, ConflictException } from '../../../exceptions';
import UserService from '../../../services/user.service';
import mockedPrisma from '../../helpers/__mocks__/prisma';
import * as mockedData from './utils/mockedData';

vi.mock('../helpers/prisma');

describe('users - create', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  const { createRequest, createResponse } = mockedData;
  const service = new UserService(mockedPrisma);

  describe('caso de sucesso', () => {
    it('deve retornar o usuário criado', async () => {
      mockedPrisma.user.findUnique.mockResolvedValue(null);
      mockedPrisma.user.create.mockResolvedValue(createResponse);

      const response = await service.create(createRequest);

      expect(response).toStrictEqual(createResponse);
    });
  });

  describe('casos de falha', () => {
    describe('casos de nome inválido', () => {
      it('deve lançar um erro quando o campo de nome não for passado', async () => {
        const { name, ...createReqWithoutName } = createRequest as any;
        const errorMessage = 'Campo de nome não pode ser vazio';

        try {
          await service.create(createReqWithoutName);
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect((error as Error).message).toBe(errorMessage);
        }
      });

      it('deve lançar um erro quando o campo de nome estiver vazio', async () => {
        const errorMessage = 'Campo de nome não pode ser vazio';

        try {
          await service.create({
            ...createRequest,
            name: ''
          });
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect((error as Error).message).toBe(errorMessage);
        }
      });

      it('deve lançar um erro quando o valor de nome não for do tipo string', async () => {
        const invalidName = 123 as any;
        const errorMessage = 'Nome precisa ser do tipo string';

        try {
          await service.create({
            ...createRequest,
            name: invalidName
          });
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect((error as Error).message).toBe(errorMessage);
        }
      });

      it('deve lançar um erro quando nome tiver menos de 10 caracteres', async () => {
        const invalidName = 'x';
        const errorMessage = 'O nome precisa ter no mínimo 10 caracteres';

        try {
          await service.create({
            ...createRequest,
            name: invalidName
          });
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect((error as Error).message).toBe(errorMessage);
        }
      });
    });

    describe('casos de e-mail inválido', () => {
      it('deve lançar um erro quando o e-mail passado já estiver registrado', async () => {
        const { users } = mockedData;
        const registeredUser = users[0];
        const errorMessage = 'E-mail já registrado';

        mockedPrisma.user.findUnique.mockResolvedValue(registeredUser);

        try {
          await service.create({
            ...createRequest,
            email: registeredUser.email
          });
        } catch (error) {
          expect(error).toBeInstanceOf(ConflictException);
          expect((error as Error).message).toBe(errorMessage);
        }
      });

      it('deve lançar um erro quando o campo de e-mail não for passado', async () => {
        const { email, ...createReqWithoutEmail } = createRequest as any;
        const errorMessage = 'Campo de e-mail não pode ser vazio';

        try {
          await service.create(createReqWithoutEmail);
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect((error as Error).message).toBe(errorMessage);
        }
      });

      it('deve lançar um erro quando o campo de e-mail estiver vazio', async () => {
        const errorMessage = 'Campo de e-mail não pode ser vazio';

        try {
          await service.create({
            ...createRequest,
            email: ''
          });
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect((error as Error).message).toBe(errorMessage);
        }
      });

      it('deve lançar um erro quando o valor de e-mail não for do tipo string', async () => {
        const invalidEmail = 123 as any;
        const errorMessage = 'E-mail precisa ser do tipo string';

        try {
          await service.create({
            ...createRequest,
            email: invalidEmail
          });
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect((error as Error).message).toBe(errorMessage);
        }
      });

      it('deve lançar um erro quando o formato de e-mail for inválido', async () => {
        const invalidEmail = 'invalid';
        const errorMessage = 'E-mail inválido';

        try {
          await service.create({
            ...createRequest,
            email: invalidEmail
          });
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect((error as Error).message).toBe(errorMessage);
        }
      });
    });

    describe('casos de senha inválida', () => {
      it('deve lançar um erro quando o campo de senha não for passado', async () => {
        const { password, ...createReqWithoutPassword } = createRequest as any;
        const errorMessage = 'Campo de senha não pode ser vazio';

        try {
          await service.create(createReqWithoutPassword);
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect((error as Error).message).toBe(errorMessage);
        }
      });

      it('deve lançar um erro quando o campo de senha estiver vazio', async () => {
        const errorMessage = 'Campo de senha não pode ser vazio';

        try {
          await service.create({
            ...createRequest,
            password: ''
          });
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect((error as Error).message).toBe(errorMessage);
        }
      });

      it('deve lançar um erro quando o valor de senha não for do tipo string', async () => {
        const invalidPassword = 123 as any;
        const errorMessage = 'Senha precisa ser do tipo string';

        try {
          await service.create({
            ...createRequest,
            password: invalidPassword
          });
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect((error as Error).message).toBe(errorMessage);
        }
      });

      it('deve lançar um erro quando o formato de senha for inválido', async () => {
        const invalidPassword = 'xxx'; // Menos de 8 caracteres
        const errorMessage = 'Senha precisa ter no mínimo 8 caracteres';

        try {
          await service.create({
            ...createRequest,
            password: invalidPassword
          });
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect((error as Error).message).toBe(errorMessage);
        }
      });
    });

    describe('casos de função inválida', () => {
      it('deve lançar um erro quando o campo de função não for passado', async () => {
        const { role, ...createReqWithoutRole } = createRequest as any;
        const errorMessage = 'Campo de função não pode ser vazio';

        try {
          await service.create(createReqWithoutRole);
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect((error as Error).message).toBe(errorMessage);
        }
      });

      it('deve lançar um erro quando o valor de função for inválido', async () => {
        const invalidRole = 'xxx' as any;
        const errorMessage =
          'Função inválida. Valores aceitos: user, employee, admin';

        try {
          await service.create({
            ...createRequest,
            role: invalidRole
          });
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect((error as Error).message).toBe(errorMessage);
        }
      });
    });
  });
});
