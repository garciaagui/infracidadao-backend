import { Occurrence, PrismaClient } from '@prisma/client';
import { S3 } from 'aws-sdk';
import { validateOccurrence } from '../validations';

export default class OccurrenceService {
  private model: PrismaClient;
  private s3: S3;

  constructor(model: PrismaClient, s3: S3) {
    this.model = model;
    this.s3 = s3;
  }

  public async create(data: Occurrence): Promise<Occurrence> {
    validateOccurrence(data);

    const created = await this.model.occurrence.create({ data: { ...data } });

    return created;
  }

  public async findAll(): Promise<Occurrence[]> {
    const occurrences = await this.model.occurrence.findMany({});

    return occurrences;
  }
}
