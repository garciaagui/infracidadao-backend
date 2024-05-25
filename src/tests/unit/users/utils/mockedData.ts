import { Role } from '@prisma/client';

export const users = [
  {
    id: 1,
    name: 'João Silva',
    email: 'joao@example.com',
    password: '$2a$12$Y5A6LfbOspKyOp4yCFvAUutzoynEHUkS0neXCObTl8SOTt5TtXxwe',
    role: Role.admin,
    createdAt: new Date('2024-01-01T00:00:00.000Z'),
    updatedAt: new Date('2024-01-01T00:00:00.000Z')
  },
  {
    id: 2,
    name: 'Maria Oliveira',
    email: 'maria@example.com',
    password: '$2a$12$urjFcjIR5nPJ1Y/MYaIqXu1p9Y//VbhuQKmugxuFL8Hm1dzdHZhn6',
    role: Role.employee,
    createdAt: new Date('2024-01-01T00:00:00.000Z'),
    updatedAt: new Date('2024-01-01T00:00:00.000Z')
  },
  {
    id: 3,
    name: 'Carlos Santos',
    email: 'carlos@example.com',
    password: '$2a$12$KYs9rCDu/eggg9BIRKz9Ke0a6gthYJTIdbbwiveFT8SewrYzN42YW',
    role: Role.user,
    createdAt: new Date('2024-01-01T00:00:00.000Z'),
    updatedAt: new Date('2024-01-01T00:00:00.000Z')
  },
  {
    id: 4,
    name: 'Ana Moares',
    email: 'ana@example.com',
    password: '$2a$12$g/0yx6eToVec0xHqEWqquOVWhoi4cEhRRXmy.G0Fv.4hP02OrvA4q',
    role: Role.user,
    createdAt: new Date('2024-01-01T00:00:00.000Z'),
    updatedAt: new Date('2024-01-01T00:00:00.000Z')
  }
];

export const token = 'mockedToken';

export const loginResponse = {
  accessToken: token,
  user: {
    id: 1,
    name: 'João Silva',
    email: 'joao@example.com',
    role: Role.admin,
    createdAt: new Date('2024-01-01T00:00:00.000Z'),
    updatedAt: new Date('2024-01-01T00:00:00.000Z')
  }
};
