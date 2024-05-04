import * as bcryptjs from 'bcryptjs';

const generateHashedPassword = async (password: string): Promise<string> => {
  const hashedPassword = await bcryptjs.hashSync(password, 12);
  return hashedPassword;
};

const comparePasswords = async (
  inputPassword: string,
  dbPassword: string
): Promise<boolean> => {
  const comparision = await bcryptjs.compareSync(inputPassword, dbPassword);
  return comparision;
};

export { comparePasswords, generateHashedPassword };
