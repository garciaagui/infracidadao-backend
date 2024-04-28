import prisma from './prisma';
import { deleteRecords, populate, resetAutoIncrement } from './utils/functions';

const resetDb = async () => {
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

export default resetDb;
