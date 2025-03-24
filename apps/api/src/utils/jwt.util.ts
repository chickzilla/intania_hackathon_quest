import { sign, verify } from 'jsonwebtoken';

const ACCESS_KEY = process.env.ACCESS_KEY || 'default_secret_key';

export function generateKey(email: string): string {
  return sign({ email }, ACCESS_KEY, { expiresIn: '72h' });
}

export function validateJWTToken(tokenString: string): string | null {
  try {
    const decoded = verify(tokenString, ACCESS_KEY) as { email: string };
    return decoded.email;
  } catch (error) {
    return null;
  }
}
