import { Status } from '@prisma/client';

export const occurrences = [
  {
    id: 1,
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
    createdAt: new Date('2024-01-01T00:00:00.000Z'),
    updatedAt: new Date('2024-01-01T00:00:00.000Z')
  },
  {
    id: 2,
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
    createdAt: new Date('2024-01-01T00:00:00.000Z'),
    updatedAt: new Date('2024-01-01T00:00:00.000Z')
  },
  {
    id: 3,
    title: 'Bueiro entupido na esquina',
    description:
      'O bueiro na esquina da Rua das Flores está entupido e causando alagamentos.',
    neighborhood: 'Jardim América',
    street: 'Avenida Central',
    zipCode: '12.398-501',
    reference: null,
    status: Status.Andamento,
    image:
      'https://pub-373564433a1a4faebf35e76ccb084c38.r2.dev/bueiro-entupido.jpeg',
    userId: 4,
    createdAt: new Date('2024-01-01T00:00:00.000Z'),
    updatedAt: new Date('2024-01-01T00:00:00.000Z')
  },
  {
    id: 4,
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
    createdAt: new Date('2024-01-01T00:00:00.000Z'),
    updatedAt: new Date('2024-01-01T00:00:00.000Z')
  },
  {
    id: 5,
    title: 'Falta de coleta de lixo na Vila dos Pássaros',
    description:
      'O caminhão de lixo não passa pela Vila dos Pássaros há uma semana.',
    neighborhood: 'Parque Industrial',
    street: 'Rua dos Industriais',
    zipCode: '00.150-658',
    reference: null,
    status: Status.Andamento,
    image:
      'https://pub-373564433a1a4faebf35e76ccb084c38.r2.dev/coleta-lixo.jpg',
    userId: 3,
    createdAt: new Date('2024-01-01T00:00:00.000Z'),
    updatedAt: new Date('2024-01-01T00:00:00.000Z')
  }
];

export const updateStatusResponse = {
  ...occurrences[1],
  status: Status.Andamento
};
