import { Router } from 'express';
import validationLogin from '../middlewares/validation.login';
import UserController from '../controllers/user.controller';

const userRouter = Router();

const userController = new UserController();

userRouter.route('/').post(validationLogin.validateLogin, userController.checkUser);

export default userRouter;
