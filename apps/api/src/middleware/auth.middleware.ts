import { Response, NextFunction } from 'express';
import { validateJWTToken } from '../utils/jwt.util';
import { getRepository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CustomRequest } from '../interfaces/customRequest';


export function getEmailFromToken(
  req: CustomRequest,
  next: NextFunction,
) {
  const token = req.headers.authorization?.split(' ')[1] || req.cookies?.auth_token || '';
  console.log('token', token);

  const email = validateJWTToken(token);
  req.email = email || '';
  next();

}

export async function authMiddleware(
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) {
  if (!req.email || req.email === '') {
    return res.status(401).json({ error: 'Invalid token' });
  }

  const userRepository = getRepository(User);
  const user = await userRepository.findOne({ where: { email: req.email } });

  if (!user) {
    return res.status(401).json({ error: "Email doesn't exist" });
  }

  req.userId = user.id;
  next();
}
