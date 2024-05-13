export type OccurrenceCreationType = {
  title: string;
  description: string;
  neighborhood: string;
  street: string;
  zipCode: string;
  reference?: string | null | undefined;
  userId: number;
};

export type UserCreationType = {
  name: string;
  email: string;
  password: string;
};
