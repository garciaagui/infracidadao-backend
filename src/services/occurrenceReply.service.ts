import { OccurrenceReply, PrismaClient } from '@prisma/client';
import { S3 } from 'aws-sdk';
import { PutObjectRequest } from 'aws-sdk/clients/s3';
import { randomBytes } from 'crypto';
import * as env from 'dotenv';
import * as E from '../exceptions';
import * as T from '../services/utils/types';
import * as V from '../validations';

env.config();

export default class OccurrenceReplyService {
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

  private handleImageUpload = async (fileData: Express.Multer.File[]) => {
    const { buffer, originalname } = fileData[0];
    const imageName = this.generateUniqueFileName(originalname);
    const url = process.env.CLOUDFLARE_R2_PUBLIC_ENDPOINT + '/' + imageName;

    await this.uploadImage(buffer, imageName);

    return url;
  };

  public async create(
    textData: T.OccurrenceReplyCreationType,
    fileData: Express.Multer.File[] | undefined
  ): Promise<OccurrenceReply> {
    let imageUrl = '';
    V.validateOccurrenceReplyCreation(textData);

    if (fileData) {
      imageUrl = await this.handleImageUpload(fileData);
    }

    const creationData = {
      ...textData,
      imageUrl,
      userId: Number(textData.userId),
      occurrenceId: Number(textData.occurrenceId)
    };

    V.validateOccurrenceReply(creationData);

    const created = await this.model.occurrenceReply.create({
      data: { ...creationData }
    });

    return created;
  }
}
