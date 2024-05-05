import * as env from 'dotenv';
import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

env.config();

const secret: string | undefined = process.env.TOKEN_SECRET || undefined;

function generateToken(email: string): string {
  if (!secret) {
    throw new Error('TOKEN SECRET não definido');
  }

  const jwtConfig: SignOptions = {
    expiresIn: '12h',
    algorithm: 'HS256'
  };

  const token = jwt.sign({ email }, secret, jwtConfig);
  return token;
}

async function verifyToken(token: string): Promise<string | JwtPayload> {
  if (!secret) {
    throw new Error('TOKEN SECRET não definido');
  }

  const tokenDecoded = await jwt.verify(token, secret);
  return tokenDecoded;
}

export { generateToken, verifyToken };
