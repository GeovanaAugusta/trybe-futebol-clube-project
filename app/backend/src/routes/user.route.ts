import { Router } from 'express';
import UserController from '../controllers/user.controller';

// console.log(validationLogin.validateLogin);

const userRouter = Router();

const userController = new UserController();

userRouter.route('/').post(userController.checkUser);

export default userRouter;
