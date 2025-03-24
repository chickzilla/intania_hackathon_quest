import { CustomRequest } from 'src/interfaces/customRequest';
import { Response } from 'express';

export class BodyDTO {
  req: CustomRequest;
  res: Response;
}
