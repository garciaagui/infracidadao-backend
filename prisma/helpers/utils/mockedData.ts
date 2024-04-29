import { Role } from '@prisma/client';

const users = [
  {
    id: 1,
    name: 'João Silva',
    email: 'joao@example.com',
    password: '123456789',
    role: Role.admin
  },
  {
    id: 2,
    name: 'Maria Oliveira',
    email: 'maria@example.com',
    password: '758961234',
    role: Role.employee
  },
  {
    id: 3,
    name: 'Carlos Santos',
    email: 'carlos@example.com',
    password: '5031498720',
    role: Role.user
  }
];

export default { users };
