import { Occurrence, PrismaClient } from '@prisma/client';
import { validateOccurrence } from '../validations';

export default class OccurrenceService {
  private model: PrismaClient;

  constructor(model: PrismaClient) {
    this.model = model;
  }

  public async create(data: Occurrence): Promise<Occurrence> {
    console.log(data);
    validateOccurrence(data);

    const created = await this.model.occurrence.create({ data: { ...data } });

    return created;
  }

  public async findAll(): Promise<Occurrence[]> {
    const occurrences = await this.model.occurrence.findMany({});

    return occurrences;
  }
}
