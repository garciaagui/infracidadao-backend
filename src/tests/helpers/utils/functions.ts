import { PrismaClient } from '@prisma/client';
import mocked from './mockedData';

const deleteRecords = async (prisma: PrismaClient) => {
  await prisma.user.deleteMany();
};

const resetAutoIncrement = async (prisma: PrismaClient) => {
  await prisma.$queryRaw`ALTER SEQUENCE users_id_seq RESTART WITH 1`;
};

const populate = async (prisma: PrismaClient) => {
  await prisma.user.createMany({
    data: mocked.users
  });
};

export { deleteRecords, populate, resetAutoIncrement };
