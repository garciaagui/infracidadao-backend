import { StatusUpdate } from '@prisma/client';

export type OccurrenceCreationType = {
  title: string;
  description: string;
  neighborhood: string;
  street: string;
  zipCode: string;
  reference?: string | null | undefined;
  userId: number;
};

export type OccurrenceReplyCreationType = {
  description: string;
  userId: number;
  occurrenceId: number;
  occurrenceStatus: StatusUpdate;
};
