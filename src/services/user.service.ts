import { PrismaClient, User } from '@prisma/client';
import * as e from '../exceptions';
import { comparePasswords } from '../libs/bcriptjs';
import { generateToken } from '../libs/jwt';
import { validateLogin } from '../validations';

export default class UserService {
  private model: PrismaClient;

  constructor(model: PrismaClient) {
    this.model = model;
  }

  public async findAll(): Promise<User[]> {
    const users = await this.model.user.findMany({});

    return users;
  }

  private async findByEmail(email: string): Promise<User> {
    const user = await this.model.user.findUnique({ where: { email } });

    if (!user) {
      throw new e.NotFoundException('Não há usuário com esse e-mail');
    }

    return user;
  }

  public async login(loginEmail: string, loginPassword: string) {
    validateLogin(loginEmail, loginPassword);

    const { password, ...user } = await this.findByEmail(loginEmail);
    const isValidPassword = await comparePasswords(loginPassword, password);

    if (!isValidPassword) {
      throw new e.UnauthorizedException('Senha incorreta');
    }

    const token = generateToken(user.email);

    return { token, user };
  }
}
