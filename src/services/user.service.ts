import { PrismaClient, User } from '@prisma/client';

export default class UserService {
  private model: PrismaClient;

  constructor(model: PrismaClient) {
    this.model = model;
  }

  public async findAll(): Promise<User[]> {
    const users = await this.model.user.findMany({});

    return users;
  }
}
