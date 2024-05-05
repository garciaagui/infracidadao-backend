import { Prisma } from '@prisma/client';
import * as e from '../exceptions';
import * as s from './schemas';

const validateLogin = (email: string, password: string) => {
  const { error } = s.loginSchema.validate({ email, password });

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

export { validateLogin, validateOccurrence };
