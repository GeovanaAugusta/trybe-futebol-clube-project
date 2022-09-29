import { Request } from 'express';

export interface Role {
  payload: string;
}

export interface ExtendRole extends Request {
  user: Role;
}
