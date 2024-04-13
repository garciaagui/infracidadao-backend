import { NextFunction, Request, Response } from 'express';
import prisma from '../libs/prisma';
import UserService from '../services/user.service';

export default class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService(prisma);
  }

  public async findAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.service.findAll();
      return res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
}