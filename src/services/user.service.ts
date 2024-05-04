import { PrismaClient, User } from '@prisma/client';
import * as e from '../exceptions';

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
}
