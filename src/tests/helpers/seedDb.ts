import prisma from './prisma';
import { populate } from './utils/functions';

const seedDb = async () => {
  try {
    await populate(prisma);
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

export default seedDb;
