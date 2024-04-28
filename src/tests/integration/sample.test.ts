import request from 'supertest';
import { describe, expect, it } from 'vitest';
import app from '../../app';
import prisma from '../helpers/prisma';
import mockedData from './utils/mockedData';

describe('integration tests', () => {
  it('sample integration test', async () => {
    const { users: mockedUsers } = mockedData;

    const { status, body } = await request(app).get('/users');

    const users = await prisma.user.findMany();

    expect(status).toBe(200);
    expect(users).not.toBeNull();
    expect(body).toStrictEqual(mockedUsers);
  });
});
