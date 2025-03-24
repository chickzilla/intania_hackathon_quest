import { Request } from 'express';

interface CustomRequest extends Request {
  email?: string;
  userId?: number;
  password?: string;
}

export { CustomRequest };
