import { Prisma } from '@prisma/client';
import * as e from '../exceptions';
import * as T from '../services/utils/types';
import * as s from './schemas';

const validateId = (id: number) => {
  const { error } = s.idSchema.validate({ id });

  if (error) {
    throw new e.BadRequestException('Id deve ser um número inteiro');
  }
};

const validateLogin = (email: string, password: string) => {
  const { error } = s.loginSchema.validate({ email, password });

  if (error) {
    throw new e.BadRequestException(error.message);
  }
};

const validateOccurrenceCreation = (data: T.OccurrenceCreationType) => {
  const { error } = s.occurrenceCreationSchema.validate(data);

  if (error) {
    throw new e.BadRequestException(error.message);
  }
};

const validateOccurrence = (
  data: Omit<Prisma.OccurrenceCreateInput, 'user'>
) => {
  const { error } = s.occurrenceSchema.validate(data);

  if (error) {
    throw new e.BadRequestException(error.message);
  }
};

const validateUserCreation = (data: T.UserCreationType) => {
  const { error } = s.userCreationSchema.validate(data);

  if (error) {
    throw new e.BadRequestException(error.message);
  }
};

export {
  validateId,
  validateLogin,
  validateOccurrence,
  validateOccurrenceCreation,
  validateUserCreation
};
