import { PrismaClient, User } from '@prisma/client';
import * as e from '../exceptions';
import { comparePasswords, generateHashedPassword } from '../libs/bcriptjs';
import { generateToken } from '../libs/jwt';
import { validateLogin, validateUserCreation } from '../validations';
import { userSelectedFields } from './utils/constants';
import { UserCreationType } from './utils/types';

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

  private async checkUserExistence(email: string): Promise<void> {
    const user = await this.model.user.findUnique({ where: { email } });

    if (user) {
      throw new e.ConflictException('E-mail já registrado');
    }
  }

  public async create(data: UserCreationType): Promise<Omit<User, 'password'>> {
    validateUserCreation(data);

    await this.checkUserExistence(data.email);

    const hashedPassword = await generateHashedPassword(data.password);
    const createdUser = await this.model.user.create({
      data: { ...data, password: hashedPassword, role: 'user' },
      select: { ...userSelectedFields }
    });

    return createdUser;
  }

  public async login(loginEmail: string, loginPassword: string) {
    validateLogin(loginEmail, loginPassword);

    const { password, ...user } = await this.findByEmail(loginEmail);
    const isValidPassword = await comparePasswords(loginPassword, password);

    if (!isValidPassword) {
      throw new e.UnauthorizedException('Senha incorreta');
    }

    const token = generateToken(user.email);

    return { accessToken: token, user };
  }
}
