import { PrismaClient } from '@prisma/client';
import { deleteRecords, resetAutoIncrement } from './utils/functions';

const prisma = new PrismaClient();

const reset = async () => {
  try {
    await deleteRecords(prisma);
    await resetAutoIncrement(prisma);
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

reset();
