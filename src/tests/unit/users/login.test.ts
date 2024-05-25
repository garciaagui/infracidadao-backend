import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException
} from '../../../exceptions';
import * as bcriptjs from '../../../libs/bcriptjs';
import * as jwt from '../../../libs/jwt';
import UserService from '../../../services/user.service';
import mockedPrisma from '../../helpers/__mocks__/prisma';
import * as mockedData from './utils/mockedData';

vi.mock('../helpers/prisma');

describe('users - login', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  const mockedUser = mockedData.users[0];
  const mockedPassword = 'password';

  describe('caso de sucesso', () => {
    it('deve retornar token e dados do usuário após login bem-sucedido', async () => {
      const { loginResponse, token } = mockedData;
      const service = new UserService(mockedPrisma);

      const mockedTokenFunction = vi
        .spyOn(jwt, 'generateToken')
        .mockReturnValue(token);

      const mockedBcriptFunction = vi
        .spyOn(bcriptjs, 'comparePasswords')
        .mockReturnValue(true);

      mockedPrisma.user.findUnique.mockResolvedValue(mockedUser);

      const response = await service.login(mockedUser.email, mockedPassword);

      expect(mockedTokenFunction).toHaveBeenCalledOnce();
      expect(mockedTokenFunction).toHaveBeenCalledWith(mockedUser.email);
      expect(mockedBcriptFunction).toHaveBeenCalledOnce();
      expect(mockedBcriptFunction).toHaveBeenCalledWith(
        mockedPassword,
        mockedUser.password
      );

      expect(response).toStrictEqual(loginResponse);
    });
  });

  describe('casos de falha', () => {
    describe('casos de e-mail inválido', () => {
      it('deve lançar um erro quando nenhum usuário foi encontrado com o e-mail passado', async () => {
        const emailWithNoUser = 'nouser@mail.com';
        const errorMessage = 'Não há usuário com esse e-mail';
        const service = new UserService(mockedPrisma);

        mockedPrisma.user.findUnique.mockResolvedValue(null);

        try {
          await service.login(emailWithNoUser, mockedPassword);
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
          expect((error as Error).message).toBe(errorMessage);
        }
      });

      it('deve lançar um erro quando o campo de e-mail estiver vazio', async () => {
        const errorMessage = 'Campo de e-mail não pode ser vazio';
        const service = new UserService(mockedPrisma);

        try {
          await service.login('', mockedPassword);
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect((error as Error).message).toBe(errorMessage);
        }
      });

      it('deve lançar um erro quando o valor de e-mail não for do tipo string', async () => {
        const invalidEmail = 123 as never;
        const errorMessage = 'E-mail precisa ser do tipo string';
        const service = new UserService(mockedPrisma);

        try {
          await service.login(invalidEmail, mockedPassword);
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect((error as Error).message).toBe(errorMessage);
        }
      });

      it('deve lançar um erro quando o formato de e-mail for inválido', async () => {
        const invalidEmail = 'invalid';
        const errorMessage = 'E-mail inválido';
        const service = new UserService(mockedPrisma);

        try {
          await service.login(invalidEmail, mockedPassword);
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect((error as Error).message).toBe(errorMessage);
        }
      });
    });

    describe('casos de senha inválida', () => {
      it('deve lançar um erro quando a senha estiver incorreta', async () => {
        const errorMessage = 'Senha incorreta';
        const service = new UserService(mockedPrisma);

        const mockedBcriptFunction = vi
          .spyOn(bcriptjs, 'comparePasswords')
          .mockReturnValue(false);

        mockedPrisma.user.findUnique.mockResolvedValue(mockedUser);

        try {
          await service.login(mockedUser.email, mockedPassword);
        } catch (error) {
          expect(error).toBeInstanceOf(UnauthorizedException);
          expect((error as Error).message).toBe(errorMessage);
        }

        expect(mockedBcriptFunction).toHaveBeenCalledOnce();
        expect(mockedBcriptFunction).toHaveBeenCalledWith(
          mockedPassword,
          mockedUser.password
        );
      });

      it('deve lançar um erro quando o campo de senha estiver vazio', async () => {
        const errorMessage = 'Campo de senha não pode ser vazio';
        const service = new UserService(mockedPrisma);

        try {
          await service.login(mockedUser.email, '');
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect((error as Error).message).toBe(errorMessage);
        }
      });

      it('deve lançar um erro quando o valor de senha não for do tipo string', async () => {
        const invalidPassword = 123 as never;
        const errorMessage = 'Senha precisa ser do tipo string';
        const service = new UserService(mockedPrisma);

        try {
          await service.login(mockedUser.email, invalidPassword);
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect((error as Error).message).toBe(errorMessage);
        }
      });

      it('deve lançar um erro quando o formato de senha for inválido', async () => {
        const invalidPassword = 'xxx'; // Menos de 8 caracteres
        const errorMessage = 'Senha precisa ter no mínimo 8 caracteres';

        const service = new UserService(mockedPrisma);

        try {
          await service.login(mockedUser.email, invalidPassword);
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect((error as Error).message).toBe(errorMessage);
        }
      });
    });
  });
});
