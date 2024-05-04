import { Role, Status } from '@prisma/client';

const users = [
  {
    id: 1,
    name: 'João Silva',
    email: 'joao@example.com',
    password: '$2a$12$Y5A6LfbOspKyOp4yCFvAUutzoynEHUkS0neXCObTl8SOTt5TtXxwe',
    // unhashed: '123456789'
    role: Role.admin
  },
  {
    id: 2,
    name: 'Maria Oliveira',
    email: 'maria@example.com',
    password: '$2a$12$urjFcjIR5nPJ1Y/MYaIqXu1p9Y//VbhuQKmugxuFL8Hm1dzdHZhn6',
    // unhashed: '758961234'
    role: Role.employee
  },
  {
    id: 3,
    name: 'Carlos Santos',
    email: 'carlos@example.com',
    password: '$2a$12$KYs9rCDu/eggg9BIRKz9Ke0a6gthYJTIdbbwiveFT8SewrYzN42YW',
    // unhashed: '5031498720'
    role: Role.user
  }
];

const occurrences = [
  {
    id: 1,
    title: 'Vazamento de água na rua principal',
    description:
      'Há um vazamento de água na calçada em frente ao supermercado.',
    neighborhood: 'Centro',
    street: 'Rua Principal',
    reference: 'Em frente ao estacionamento da praça',
    status: Status.Finalizado,
    image: 'https://picsum.photos/400',
    userId: 1
  },
  {
    id: 2,
    title: 'Lâmpada queimada no parque',
    description:
      'Uma das lâmpadas do poste no parque está queimada, deixando a área escura à noite.',
    neighborhood: 'Vila Nova',
    street: 'Rua das Flores',
    reference: 'Próximo à esquina',
    status: Status.Aberto,
    image: 'https://picsum.photos/400',
    userId: 2
  },
  {
    id: 3,
    title: 'Bueiro entupido na esquina',
    description:
      'O bueiro na esquina da Rua das Flores está entupido e causando alagamentos.',
    neighborhood: 'Jardim América',
    street: 'Avenida Central',
    status: Status.Andamento,
    image: 'https://picsum.photos/400',
    userId: 1
  },
  {
    id: 4,
    title: 'Passeio com buracos na Avenida Central',
    description:
      'Os buracos no passeio estão representando um perigo para os pedestres.',
    neighborhood: 'Jardim Botânico',
    street: 'Rua das Árvores',
    reference: 'Próximo à escola',
    status: Status.Aberto,
    image: 'https://picsum.photos/400',
    userId: 3
  },
  {
    id: 5,
    title: 'Falta de coleta de lixo na Vila dos Pássaros',
    description:
      'O caminhão de lixo não passa pela Vila dos Pássaros há uma semana.',
    neighborhood: 'Parque Industrial',
    street: 'Rua dos Industriais',
    status: Status.Andamento,
    image: 'https://picsum.photos/400',
    userId: 2
  }
];

export default { users, occurrences };
