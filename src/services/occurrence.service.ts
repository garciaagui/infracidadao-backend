import { Occurrence, PrismaClient, Status, StatusUpdate } from '@prisma/client';
import { S3 } from 'aws-sdk';
import { PutObjectRequest } from 'aws-sdk/clients/s3';
import { randomBytes } from 'crypto';
import * as env from 'dotenv';
import * as E from '../exceptions';
import * as T from '../services/utils/types';
import * as V from '../validations';
import { userSelectedFields } from './utils/constants';

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
      throw new E.BadRequestException('Erro no upload da imagem');
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
    textData: T.OccurrenceCreationType,
    fileData: Express.Multer.File[]
  ): Promise<Occurrence> {
    V.validateOccurrenceCreation(textData);

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

    V.validateOccurrence(creationData);

    const created = await this.model.occurrence.create({
      data: { ...creationData }
    });

    return created;
  }

  public async findAll(): Promise<Occurrence[]> {
    const occurrences = await this.model.occurrence.findMany({});

    if (!occurrences.length || !occurrences) {
      throw new E.NotFoundException('Nenhuma occurrence encontrada');
    }

    return occurrences;
  }

  public async findById(id: number): Promise<Occurrence> {
    V.validateId(id);

    const occurrence = await this.model.occurrence.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            ...userSelectedFields
          }
        },
        occurrenceReplies: {
          include: {
            user: {
              select: {
                ...userSelectedFields
              }
            }
          }
        }
      }
    });

    if (!occurrence) {
      throw new E.NotFoundException(
        'Nenhuma Occurrence encontrada com esse Id'
      );
    }

    return occurrence;
  }

  public async updateStatus(
    id: number,
    newStatus: StatusUpdate
  ): Promise<Occurrence> {
    V.validateId(id);

    const { status: currentStatus } = await this.findById(id);

    V.validateOccurrenceStatusUpdate(currentStatus, newStatus);

    const updatedOccurrence = await this.model.occurrence.update({
      where: { id },
      data: {
        status: newStatus
      }
    });

    return updatedOccurrence;
  }
}
