import { Occurrence, PrismaClient } from '@prisma/client';

export default class OccurrenceService {
  private model: PrismaClient;

  constructor(model: PrismaClient) {
    this.model = model;
  }

  public async findAll(): Promise<Occurrence[]> {
    const occurrences = await this.model.occurrence.findMany({});

    return occurrences;
  }
}
