import { Role, Status } from '@prisma/client';

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

const occurrences = [
  {
    id: 1,
    title: 'Vazamento de água na rua principal',
    description:
      'Há um vazamento de água na calçada em frente ao supermercado.',
    location: 'Rua Principal, 123',
    status: Status.Finalizado,
    image: 'https://picsum.photos/400',
    userId: 1
  },
  {
    id: 2,
    title: 'Lâmpada queimada no parque',
    description:
      'Uma das lâmpadas do poste no parque está queimada, deixando a área escura à noite.',
    location: 'Parque Central',
    status: Status.Aberto,
    image: 'https://picsum.photos/400',
    userId: 2
  },
  {
    id: 3,
    title: 'Bueiro entupido na esquina',
    description:
      'O bueiro na esquina da Rua das Flores está entupido e causando alagamentos.',
    location: 'Esquina da Rua das Flores',
    status: Status.Andamento,
    image: 'https://picsum.photos/400',
    userId: 1
  },
  {
    id: 4,
    title: 'Passeio com buracos na Avenida Central',
    description:
      'Os buracos no passeio estão representando um perigo para os pedestres.',
    location: 'Avenida Central, 500',
    status: Status.Aberto,
    image: 'https://picsum.photos/400',
    userId: 3
  },
  {
    id: 5,
    title: 'Falta de coleta de lixo na Vila dos Pássaros',
    description:
      'O caminhão de lixo não passa pela Vila dos Pássaros há uma semana.',
    location: 'Vila dos Pássaros',
    status: Status.Andamento,
    image: 'https://picsum.photos/400',
    userId: 2
  }
];

export default { users, occurrences };
