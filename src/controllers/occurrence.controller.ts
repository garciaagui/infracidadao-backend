import { StatusUpdate } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import awsS3 from '../libs/awsS3';
import prisma from '../libs/prisma';
import OccurrenceService from '../services/occurrence.service';

export default class OccurrenceController {
  private service: OccurrenceService;

  constructor() {
    this.service = new OccurrenceService(prisma, awsS3);
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    const textData = req.body;
    const fileData = req.files as Express.Multer.File[];

    try {
      const created = await this.service.create(textData, fileData);
      return res
        .status(201)
        .json({ message: 'Ocorrência criada!', occurrence: created });
    } catch (error) {
      next(error);
    }
  }

  public async findAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const occurrences = await this.service.findAll();
      return res.status(200).json(occurrences);
    } catch (error) {
      next(error);
    }
  }

  public async findById(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);

    try {
      const occurrences = await this.service.findById(id);
      return res.status(200).json(occurrences);
    } catch (error) {
      next(error);
    }
  }

  public async updateStatus(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);
    const status = req.body.status as StatusUpdate;

    try {
      const occurrences = await this.service.updateStatus(id, status);
      return res.status(200).json(occurrences);
    } catch (error) {
      next(error);
    }
  }
}
