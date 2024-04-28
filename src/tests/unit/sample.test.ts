import { beforeEach, describe, expect, it, vi } from 'vitest';
import UserService from '../../services/user.service';
import mockedPrisma from '../helpers/__mocks__/prisma';
import mockedData from './utils/mockedData';

vi.mock('../helpers/prisma');

describe('unit tests', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('sample unit test', async () => {
    const { users } = mockedData;
    const service = new UserService(mockedPrisma);

    mockedPrisma.user.findMany.mockResolvedValue(users);

    const response = await service.findAll();

    expect(response).toStrictEqual(users);
  });
});
