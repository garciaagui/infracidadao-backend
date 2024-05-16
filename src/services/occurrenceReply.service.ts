import { PrismaClient } from '@prisma/client';

export default class OccurrenceReplyService {
  private model: PrismaClient;

  constructor(model: PrismaClient) {
    this.model = model;
  }
}
