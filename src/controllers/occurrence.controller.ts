import { NextFunction, Request, Response } from 'express';
import prisma from '../libs/prisma';
import OccurrenceService from '../services/occurrence.service';

export default class OccurrenceController {
  private service: OccurrenceService;

  constructor() {
    this.service = new OccurrenceService(prisma);
  }

  public async findAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const occurrences = await this.service.findAll();
      return res.status(200).json(occurrences);
    } catch (error) {
      next(error);
    }
  }
}
