import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { ExtendRole, Role } from '../interfaces/role.interface';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

const jwtConfig: jwt.SignOptions = {
  expiresIn: '9d',
  algorithm: 'HS256',
};

const auth = {
  secret: String(process.env.JWT_SECRET),
};

const getToken = (email: string): string => {
  const token = jwt.sign({ payload: email }, auth.secret, jwtConfig);
  return token;
};

const checkToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET) as unknown as Role;

    (req as ExtendRole).user = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default { getToken, checkToken };
