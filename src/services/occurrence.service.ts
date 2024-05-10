import { Occurrence, PrismaClient, Status } from '@prisma/client';
import { S3 } from 'aws-sdk';
import { PutObjectRequest } from 'aws-sdk/clients/s3';
import { randomBytes } from 'crypto';
import * as env from 'dotenv';
import * as e from '../exceptions';
import { OccurrenceCreationType } from '../services/utils/types';
import { validateOccurrence, validateOccurrenceCreation } from '../validations';

env.config();

export default class OccurrenceService {
  private model: PrismaClient;
  private s3: S3;

  constructor(model: PrismaClient, s3: S3) {
    this.model = model;
    this.s3 = s3;
  }

  private async uploadImage(buffer: Buffer, name: string) {
    const params: PutObjectRequest = {
      Bucket: 'infracidadao',
      Key: name,
      Body: buffer
    };

    try {
      await this.s3.upload(params).promise();
    } catch (error) {
      throw new e.BadRequestException('Erro no upload da imagem');
    }
  }

  private getFileExtension = (originalName: string) => {
    const parts = originalName.split('.');
    return parts[parts.length - 1];
  };

  private generateUniqueFileName = (originalName: string) => {
    const fileExtension = this.getFileExtension(originalName);

    const bytes = randomBytes(16);
    const fileName = bytes.toString('hex') + Date.now() + '.' + fileExtension;
    return fileName;
  };

  public async create(
    textData: OccurrenceCreationType,
    fileData: Express.Multer.File[]
  ): Promise<Occurrence> {
    validateOccurrenceCreation(textData);

    const { buffer, originalname } = fileData[0];
    const imageName = this.generateUniqueFileName(originalname);
    const url = process.env.CLOUDFLARE_R2_PUBLIC_ENDPOINT + '/' + imageName;

    await this.uploadImage(buffer, imageName);

    const creationData = {
      ...textData,
      image: url,
      status: Status.Aberto,
      userId: Number(textData.userId)
    };

    validateOccurrence(creationData);

    const created = await this.model.occurrence.create({
      data: { ...creationData }
    });

    return created;
  }

  public async findAll(): Promise<Occurrence[]> {
    const occurrences = await this.model.occurrence.findMany({});

    return occurrences;
  }
}
