/* eslint-disable @typescript-eslint/no-explicit-any */
import { beforeEach, describe, expect, it, vi } from 'vitest';
import OccurrenceService from '../../../services/occurrence.service';
import mockedAwsS3 from '../../helpers/__mocks__/awsS3';
import mockedPrisma from '../../helpers/__mocks__/prisma';
import * as mockedData from './utils/mockedData';

vi.mock('../helpers/prisma');

describe('occurrences - create', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  const service = new OccurrenceService(mockedPrisma, mockedAwsS3);

  describe('caso de sucesso', () => {
    it('deve retornar a nova occurrence criada', async () => {
      const {
        createResponse,
        s3uploadResponse,
        createTextData,
        createFileData
      } = mockedData;

      const mockedGenerateUniqueFileNameFn = vi
        .spyOn<any, any>(service, 'generateUniqueFileName')
        .mockReturnValue('uniquefilename.png');

      const mockedUploadImageFn = vi
        .spyOn<any, any>(service, 'uploadImage')
        .mockReturnValue(s3uploadResponse);

      mockedPrisma.occurrence.create.mockResolvedValue(createResponse);

      const response = await service.create(createTextData, createFileData);

      expect(mockedGenerateUniqueFileNameFn).toHaveBeenCalledOnce();
      expect(mockedGenerateUniqueFileNameFn).toHaveBeenCalledWith(
        createFileData[0].originalname
      );

      expect(mockedUploadImageFn).toHaveBeenCalledOnce();
      expect(mockedUploadImageFn).toHaveBeenCalledWith(
        createFileData[0].buffer,
        'uniquefilename.png'
      );

      expect(response).toStrictEqual(createResponse);
    });
  });

  // describe('casos de falha', () => {

  // });
});
