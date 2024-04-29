import { Role } from '@prisma/client';

const users = [
  {
    id: 1,
    name: 'João Silva',
    email: 'joao@example.com',
    password: '123456789',
    role: Role.admin,
    createdAt: new Date('2024-05-01T00:00:00.000Z'),
    updatedAt: new Date('2024-05-01T00:00:00.000Z')
  },
  {
    id: 2,
    name: 'Maria Oliveira',
    email: 'maria@example.com',
    password: '758961234',
    role: Role.employee,
    createdAt: new Date('2024-05-15T00:00:00.000Z'),
    updatedAt: new Date('2024-05-15T00:00:00.000Z')
  },
  {
    id: 3,
    name: 'Carlos Santos',
    email: 'carlos@example.com',
    password: '5031498720',
    role: Role.user,
    createdAt: new Date('2024-06-10T00:00:00.000Z'),
    updatedAt: new Date('2024-06-10T00:00:00.000Z')
  }
];

export default { users };
