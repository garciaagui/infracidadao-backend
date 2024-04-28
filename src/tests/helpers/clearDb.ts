import prisma from './prisma';
import { deleteRecords, resetAutoIncrement } from './utils/functions';

const clearDb = async () => {
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

export default clearDb;
