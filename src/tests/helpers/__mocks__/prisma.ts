import { PrismaClient } from '@prisma/client';
import { beforeEach } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';

const mockedPrisma = mockDeep<PrismaClient>();

beforeEach(() => {
  mockReset(mockedPrisma);
});

export default mockedPrisma;
