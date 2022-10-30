import { RequestHandler, Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import UserService from '../services/user.service';
import userInterface from '../interfaces/user.interface';
import token from '../middlewares/auth';
import { ExtendRole } from '../interfaces/role.interface';

export default class userController {
  constructor(private userService = new UserService()) {}

  public checkUser: RequestHandler = async (req: Request, res: Response) => {
    const { email, password } = req.body as userInterface;
    const data = await this.userService.checkUser(email);

    if (data && bcrypt.compareSync(password, data.password)) {
      return res.status(200).json({ token: token.getToken(email) });
    }
    return res.status(401).json({ message: 'Incorrect email or password' });
  };

  public getRole: RequestHandler = async (req: Request, res: Response) => {
    const { payload } = (req as ExtendRole).user;

    const role = await this.userService.getRole(payload);

    if (role) { return res.status(200).json(role); }
  };
}
