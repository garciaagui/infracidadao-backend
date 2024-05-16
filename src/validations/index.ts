import { Prisma } from '@prisma/client';
import * as e from '../exceptions';
import * as T from '../services/utils/types';
import * as s from './schemas';

export const validateId = (id: number) => {
  const { error } = s.idSchema.validate({ id });

  if (error) {
    throw new e.BadRequestException('Id deve ser um número inteiro');
  }
};

export const validateLogin = (email: string, password: string) => {
  const { error } = s.loginSchema.validate({ email, password });

  if (error) {
    throw new e.BadRequestException(error.message);
  }
};

export const validateOccurrenceCreation = (data: T.OccurrenceCreationType) => {
  const { error } = s.occurrenceCreationSchema.validate(data);

  if (error) {
    throw new e.BadRequestException(error.message);
  }
};

export const validateOccurrenceStatusUpdate = (
  currentStatus: string,
  newStatus: string
) => {
  const acceptedValues = ['Andamento', 'Finalizado'];

  if (currentStatus === 'Finalizado') {
    throw new e.BadRequestException('Occurrence já finalizada');
  }

  if (!acceptedValues.includes(newStatus)) {
    throw new e.BadRequestException(
      'Status inválido. Valores aceitos na atualização: `Andamento` ou `Finalizado`'
    );
  }

  if (currentStatus === newStatus) {
    throw new e.BadRequestException('Novo status é igual ao status atual');
  }
};

export const validateOccurrence = (
  data: Omit<Prisma.OccurrenceCreateInput, 'user'>
) => {
  const { error } = s.occurrenceSchema.validate(data);

  if (error) {
    throw new e.BadRequestException(error.message);
  }
};

export const validateOccurrenceReplyCreation = (
  data: T.OccurrenceReplyCreationType
) => {
  const { error } = s.occurrenceReplyCreationSchema.validate(data);

  if (error) {
    throw new e.BadRequestException(error.message);
  }
};

export const validateOccurrenceReply = (
  data: Omit<Prisma.OccurrenceReplyCreateInput, 'user' | 'occurrence'>
) => {
  const { error } = s.occurrenceReplySchema.validate(data);

  if (error) {
    throw new e.BadRequestException(error.message);
  }
};

export const validateUserCreation = (data: T.UserCreationType) => {
  const { error } = s.userCreationSchema.validate(data);

  if (error) {
    throw new e.BadRequestException(error.message);
  }
};
