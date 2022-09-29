import { RequestHandler, Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import UserService from '../services/user.service';
import userInterface from '../interfaces/user.interface';
import token from '../middlewares/auth';

export default class userController {
  constructor(private userService = new UserService()) {}

  public checkUser: RequestHandler = async (req: Request, res: Response) => {
    const { email, password } = req.body as userInterface;
    console.log(email, password);

    const data = await this.userService.checkUser(email);
    console.log('data', data.password);

    const hashPass = bcrypt.compareSync(password, data.password);
    console.log(hashPass);

    if (data && hashPass) return res.status(200).json({ token: token(email) });
    return res.status(401).json({ message: 'Incorrect email or password' });
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
