import { PrismaClient } from '@prisma/client';
import mocked from './mockedData';

const deleteRecords = async (prisma: PrismaClient) => {
  await prisma.user.deleteMany();
  await prisma.occurrence.deleteMany();
  await prisma.occurrenceReply.deleteMany();

  console.log('REGISTROS DELETADOS!');
};

const resetAutoIncrement = async (prisma: PrismaClient) => {
  await prisma.$queryRaw`ALTER SEQUENCE users_id_seq RESTART WITH 1`;
  await prisma.$queryRaw`ALTER SEQUENCE occurrences_id_seq RESTART WITH 1`;
  await prisma.$queryRaw`ALTER SEQUENCE occurrences_replies_id_seq RESTART WITH 1`;

  console.log('AUTO INCREMENT RESETADO!');
};

const populate = async (prisma: PrismaClient) => {
  await prisma.user.createMany({
    data: mocked.users
  });
  await prisma.occurrence.createMany({
    data: mocked.occurrences
  });
  await prisma.occurrenceReply.createMany({
    data: mocked.occurrencesReplies
  });

  console.log('TABELAS POPULADAS!');
};

export { deleteRecords, populate, resetAutoIncrement };
