import * as bcryptjs from 'bcryptjs';

const generateHashedPassword = async (password: string): Promise<string> => {
  const hashedPassword = await bcryptjs.hashSync(password, 12);
  return hashedPassword;
};

const comparePasswords = (
  inputPassword: string,
  dbPassword: string
): boolean => {
  const comparision = bcryptjs.compareSync(inputPassword, dbPassword);
  return comparision;
};

export { comparePasswords, generateHashedPassword };
