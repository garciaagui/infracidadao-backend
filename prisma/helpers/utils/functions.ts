import { PrismaClient } from '@prisma/client';
import mocked from './mockedData';

const deleteRecords = async (prisma: PrismaClient) => {
  await prisma.user.deleteMany();

  console.log('REGISTROS DELETADOS!');
};

const resetAutoIncrement = async (prisma: PrismaClient) => {
  await prisma.$queryRaw`ALTER SEQUENCE users_id_seq RESTART WITH 1`;

  console.log('AUTO INCREMENT RESETADO!');
};

const populate = async (prisma: PrismaClient) => {
  await prisma.user.createMany({
    data: mocked.users
  });

  console.log('TABELAS POPULADAS!');
};

export { deleteRecords, populate, resetAutoIncrement };
