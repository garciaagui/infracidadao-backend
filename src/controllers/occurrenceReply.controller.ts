import { NextFunction, Request, Response } from 'express';
import awsS3 from '../libs/awsS3';
import prisma from '../libs/prisma';
import OccurrenceReplyService from '../services/occurrenceReply.service';

export default class OccurrenceReplyController {
  private service: OccurrenceReplyService;

  constructor() {
    this.service = new OccurrenceReplyService(prisma, awsS3);
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    const textData = req.body;
    const fileData = req.files as Express.Multer.File[];

    try {
      const created = await this.service.create(textData, fileData);
      return res
        .status(201)
        .json({ message: 'Resposta criada!', occurrence: created });
    } catch (error) {
      next(error);
    }
  }

  public async findByOccurrenceId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const id = Number(req.params.id);

    try {
      const occurrences = await this.service.findByOccurrenceId(id);
      return res.status(200).json(occurrences);
    } catch (error) {
      next(error);
    }
  }
}
