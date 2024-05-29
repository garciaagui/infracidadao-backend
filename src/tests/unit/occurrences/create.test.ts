import { beforeEach, describe, expect, it, vi } from 'vitest';
import { BadRequestException } from '../../../exceptions';
import OccurrenceService from '../../../services/occurrence.service';
import mockedAwsS3 from '../../helpers/__mocks__/awsS3';
import mockedPrisma from '../../helpers/__mocks__/prisma';
import * as mockedData from './utils/mockedData';

vi.mock('../helpers/prisma');

describe('occurrences - create', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  const { createTextData, createFileData } = mockedData;
  const service = new OccurrenceService(mockedPrisma, mockedAwsS3);

  describe('caso de sucesso', () => {
    it('deve retornar a nova occurrence criada', async () => {
      const { createResponse, s3uploadResponse } = mockedData;

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

    it('getFileExtension deve retornar a extensão da imagem', async () => {
      const fileName = 'example.png';
      const expected = 'png';
      const response = service['getFileExtension'](fileName);

      expect(response).toMatch(expected);
    });
  });

  describe('casos de falha', () => {
    describe('casos de título inválido', () => {
      it('deve lançar um erro quando o campo de título estiver vazio', async () => {
        const errorMessage = 'Campo título não pode ser vazio';

        try {
          await service.create(
            { ...createTextData, title: '' },
            createFileData
          );
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect((error as Error).message).toBe(errorMessage);
        }
      });

      it('deve lançar um erro quando o valor de título não for do tipo string', async () => {
        const invalidTitle = 123 as never;
        const errorMessage = 'Título precisa ser do tipo string';

        try {
          await service.create(
            { ...createTextData, title: invalidTitle },
            createFileData
          );
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect((error as Error).message).toBe(errorMessage);
        }
      });

      it('deve lançar um erro quando o valor de título tiver menos de 10 caracteres', async () => {
        const invalidTitle = 'x';
        const errorMessage = 'O título precisa ter no mínimo 10 caracteres';

        try {
          await service.create(
            { ...createTextData, title: invalidTitle },
            createFileData
          );
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect((error as Error).message).toBe(errorMessage);
        }
      });

      it('deve lançar um erro quando o valor de título tiver mais de 127 caracteres', async () => {
        const invalidTitle =
          'invalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalid';
        const errorMessage = 'O título pode ter no máximo 127 caracteres';

        try {
          await service.create(
            { ...createTextData, title: invalidTitle },
            createFileData
          );
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect((error as Error).message).toBe(errorMessage);
        }
      });
    });

    describe('casos de descrição inválida', () => {
      it('deve lançar um erro quando o campo de descrição estiver vazio', async () => {
        const errorMessage = 'Campo descrição não pode ser vazio';

        try {
          await service.create(
            { ...createTextData, description: '' },
            createFileData
          );
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect((error as Error).message).toBe(errorMessage);
        }
      });

      it('deve lançar um erro quando o valor de descrição não for do tipo string', async () => {
        const invalidDescription = 123 as never;
        const errorMessage = 'Descrição precisa ser do tipo string';

        try {
          await service.create(
            { ...createTextData, description: invalidDescription },
            createFileData
          );
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect((error as Error).message).toBe(errorMessage);
        }
      });

      it('deve lançar um erro quando o valor de descrição tiver menos de 40 caracteres', async () => {
        const invalidDescription = 'x';
        const errorMessage = 'A descrição precisa ter no mínimo 40 caracteres';

        try {
          await service.create(
            { ...createTextData, description: invalidDescription },
            createFileData
          );
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect((error as Error).message).toBe(errorMessage);
        }
      });

      it('deve lançar um erro quando o valor de descrição tiver mais de 255 caracteres', async () => {
        const invalidDescription =
          'invalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalid';
        const errorMessage = 'A descrição pode ter no máximo 255 caracteres';

        try {
          await service.create(
            { ...createTextData, description: invalidDescription },
            createFileData
          );
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect((error as Error).message).toBe(errorMessage);
        }
      });
    });

    describe('casos de bairro inválido', () => {
      it('deve lançar um erro quando o campo de bairro estiver vazio', async () => {
        const errorMessage = 'Campo bairro não pode ser vazio';

        try {
          await service.create(
            { ...createTextData, neighborhood: '' },
            createFileData
          );
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect((error as Error).message).toBe(errorMessage);
        }
      });

      it('deve lançar um erro quando o valor de bairro não for do tipo string', async () => {
        const invalidNeighborhood = 123 as never;
        const errorMessage = 'Bairro precisa ser do tipo string';

        try {
          await service.create(
            { ...createTextData, neighborhood: invalidNeighborhood },
            createFileData
          );
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect((error as Error).message).toBe(errorMessage);
        }
      });
    });

    describe('casos de rua inválido', () => {
      it('deve lançar um erro quando o campo de rua estiver vazio', async () => {
        const errorMessage = 'Campo rua não pode ser vazio';

        try {
          await service.create(
            { ...createTextData, street: '' },
            createFileData
          );
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect((error as Error).message).toBe(errorMessage);
        }
      });

      it('deve lançar um erro quando o valor de rua não for do tipo string', async () => {
        const invalidStreet = 123 as never;
        const errorMessage = 'Rua precisa ser do tipo string';

        try {
          await service.create(
            { ...createTextData, street: invalidStreet },
            createFileData
          );
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect((error as Error).message).toBe(errorMessage);
        }
      });
    });

    describe('casos de CEP inválido', () => {
      it('deve lançar um erro quando o campo de CEP estiver vazio', async () => {
        const errorMessage = 'Campo CEP não pode ser vazio';

        try {
          await service.create(
            { ...createTextData, zipCode: '' },
            createFileData
          );
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect((error as Error).message).toBe(errorMessage);
        }
      });

      it('deve lançar um erro quando o valor de CEP não for do tipo string', async () => {
        const invalidZipCode = 123 as never;
        const errorMessage = 'CEP precisa ser do tipo string';

        try {
          await service.create(
            { ...createTextData, zipCode: invalidZipCode },
            createFileData
          );
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect((error as Error).message).toBe(errorMessage);
        }
      });

      it('deve lançar um erro quando o valor de CEP tiver menos de 10 caracteres', async () => {
        const invalidZipCode = '12.345-00';
        const errorMessage = 'CEP deve ter exatamente 8 dígitos';

        try {
          await service.create(
            { ...createTextData, zipCode: invalidZipCode },
            createFileData
          );
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect((error as Error).message).toBe(errorMessage);
        }
      });

      it('deve lançar um erro quando o valor de CEP tiver mais de 10 caracteres', async () => {
        const invalidZipCode = '12.345-0000';
        const errorMessage = 'CEP deve ter exatamente 8 dígitos';

        try {
          await service.create(
            { ...createTextData, zipCode: invalidZipCode },
            createFileData
          );
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect((error as Error).message).toBe(errorMessage);
        }
      });
    });

    describe('casos de referência inválida', () => {
      it('deve lançar um erro se houver referência e seu campo estiver vazio', async () => {
        const errorMessage = 'Campo referência não pode ser vazio';

        try {
          await service.create(
            { ...createTextData, reference: '' },
            createFileData
          );
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect((error as Error).message).toBe(errorMessage);
        }
      });

      it('deve lançar um erro se houver referência e seu valor não for do tipo string', async () => {
        const invalidReference = 123 as never;
        const errorMessage = 'Referência precisa ser do tipo string';

        try {
          await service.create(
            { ...createTextData, reference: invalidReference },
            createFileData
          );
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect((error as Error).message).toBe(errorMessage);
        }
      });
    });

    describe('casos de user id inválido', () => {
      it('deve lançar um erro quando o campo de id de usuário estiver vazio', async () => {
        const errorMessage = 'Campo id de usuário não pode ser vazio';
        const { userId, ...textDataWithoutUserId } = createTextData as any;

        try {
          await service.create(textDataWithoutUserId, createFileData);
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect((error as Error).message).toBe(errorMessage);
        }
      });

      it('deve lançar um erro quando o valor de id de usuário não for um número', async () => {
        const invalidUserId = 'x' as never;
        const errorMessage = 'Id de usuário deve ser um número inteiro';

        try {
          await service.create(
            { ...createTextData, userId: invalidUserId },
            createFileData
          );
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect((error as Error).message).toBe(errorMessage);
        }
      });

      it('deve lançar um erro quando o valor de id de usuário não for um número inteiro', async () => {
        const invalidUserId = 1.23 as never;
        const errorMessage = 'Id de usuário deve ser um número inteiro';

        try {
          await service.create(
            { ...createTextData, userId: invalidUserId },
            createFileData
          );
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect((error as Error).message).toBe(errorMessage);
        }
      });
    });

    describe('casos de erro no upload da imagem', () => {
      it('deve lançar um erro quando ocorrer um erro no upload da imagem', async () => {
        const errorMessage = 'Erro no upload da imagem';
        const invalidFileData = 'x' as never;

        vi.spyOn<any, any>(service, 'generateUniqueFileName').mockReturnValue(
          'uniquefilename.png'
        );

        try {
          await service.create(createTextData, invalidFileData);
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect((error as Error).message).toBe(errorMessage);
        }
      });
    });
  });
});
