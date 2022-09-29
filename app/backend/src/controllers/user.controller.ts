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
    // console.log(email, password);
    const data = await this.userService.checkUser(email);
    // console.log('data controller', data);

    if (data && bcrypt.compareSync(password, data.password)) {
      return res.status(200).json({ token: token.getToken(email) });
    }
    return res.status(401).json({ message: 'Incorrect email or password' });
  };

  public getRole: RequestHandler = async (req: Request, res: Response) => {
    const { payload } = (req as ExtendRole).user;
    // console.log('email', payload);
    const role = await this.userService.getRole(payload);
    // console.log(role);
    if (role) { return res.status(200).json(role); }
  };
}

// SOURCE
// https://www.npmjs.com/package/bcrypt
// Load hash from your password DB.
// bcrypt.compareSync(myPlaintextPassword, hash); // true
// bcrypt.compareSync(someOtherPlaintextPassword, hash); // false
// https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/live-lectures/140133e3-d28a-4e8c-8ed3-4ba478fabf71/recording/d3d04db1-590b-47cc-be14-a719ed5baa32
// https://book.cakephp.org/4/pt/controllers/components/request-handling.html
// https://typescript.hotexamples.com/examples/express/RequestHandler/-/typescript-requesthandler-class-examples.html
