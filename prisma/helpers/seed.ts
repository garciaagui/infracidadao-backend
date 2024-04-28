import { PrismaClient } from '@prisma/client';
import { deleteRecords, populate, resetAutoIncrement } from './utils/functions';

const prisma = new PrismaClient();

const seed = async () => {
  try {
    await deleteRecords(prisma);
    await resetAutoIncrement(prisma);
    await populate(prisma);
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

seed();
