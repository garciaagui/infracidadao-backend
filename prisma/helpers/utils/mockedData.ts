import { Role, Status } from '@prisma/client';

const users = [
  {
    name: 'João Silva',
    email: 'joao@example.com',
    password: '$2a$12$Y5A6LfbOspKyOp4yCFvAUutzoynEHUkS0neXCObTl8SOTt5TtXxwe',
    // unhashed: '123456789'
    role: Role.admin
  },
  {
    name: 'Maria Oliveira',
    email: 'maria@example.com',
    password: '$2a$12$urjFcjIR5nPJ1Y/MYaIqXu1p9Y//VbhuQKmugxuFL8Hm1dzdHZhn6',
    // unhashed: '758961234'
    role: Role.employee
  },
  {
    name: 'Carlos Santos',
    email: 'carlos@example.com',
    password: '$2a$12$KYs9rCDu/eggg9BIRKz9Ke0a6gthYJTIdbbwiveFT8SewrYzN42YW',
    // unhashed: '5031498720'
    role: Role.user
  },
  {
    name: 'Ana Moares',
    email: 'ana@example.com',
    password: '$2a$12$g/0yx6eToVec0xHqEWqquOVWhoi4cEhRRXmy.G0Fv.4hP02OrvA4q',
    // unhashed: 'abcdefghijk'
    role: Role.user
  }
];

const occurrences = [
  {
    title: 'Vazamento de água na rua principal',
    description:
      'Há um vazamento de água na calçada em frente ao supermercado.',
    neighborhood: 'Centro',
    street: 'Rua Principal',
    zipCode: '25.689-420',
    reference: 'Em frente ao estacionamento da praça',
    status: Status.Finalizado,
    image:
      'https://pub-373564433a1a4faebf35e76ccb084c38.r2.dev/vazamento-agua.jpg',
    userId: 3,
    createdAt: new Date('2024-01-01T12:00:00')
  },
  {
    title: 'Lâmpada queimada no parque',
    description:
      'Uma das lâmpadas do poste no parque está queimada, deixando a área escura à noite.',
    neighborhood: 'Vila Nova',
    street: 'Rua das Flores',
    zipCode: '56.812-350',
    reference: 'Próximo à esquina',
    status: Status.Aberto,
    image:
      'https://pub-373564433a1a4faebf35e76ccb084c38.r2.dev/lampada-queimada.jpg',
    userId: 4,
    createdAt: new Date('2024-01-02T10:00:00')
  },
  {
    title: 'Bueiro entupido na esquina',
    description:
      'O bueiro na esquina da Rua das Flores está entupido e causando alagamentos.',
    neighborhood: 'Jardim América',
    street: 'Avenida Central',
    zipCode: '12.398-501',
    status: Status.Andamento,
    image:
      'https://pub-373564433a1a4faebf35e76ccb084c38.r2.dev/bueiro-entupido.jpeg',
    userId: 4,
    createdAt: new Date('2024-01-03T08:00:00')
  },
  {
    title: 'Passeio com buracos na Avenida Central',
    description:
      'Os buracos no passeio estão representando um perigo para os pedestres.',
    neighborhood: 'Jardim Botânico',
    street: 'Rua das Árvores',
    zipCode: '98.145-710',
    reference: 'Próximo à escola',
    status: Status.Aberto,
    image:
      'https://pub-373564433a1a4faebf35e76ccb084c38.r2.dev/passeio-buracos.jpg',
    userId: 3,
    createdAt: new Date('2024-01-04T15:00:00')
  },
  {
    title: 'Falta de coleta de lixo na Vila dos Pássaros',
    description:
      'O caminhão de lixo não passa pela Vila dos Pássaros há uma semana.',
    neighborhood: 'Parque Industrial',
    street: 'Rua dos Industriais',
    zipCode: '00.150-658',
    status: Status.Andamento,
    image:
      'https://pub-373564433a1a4faebf35e76ccb084c38.r2.dev/coleta-lixo.jpg',
    userId: 3,
    createdAt: new Date('2024-01-05T14:30:00')
  }
];

export default { users, occurrences };
