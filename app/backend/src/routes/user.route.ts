import { Router } from 'express';
import validationLogin from '../middlewares/validation.login';
import UserController from '../controllers/user.controller';
import checkToken from '../middlewares/auth';

const userRouter = Router();

const userController = new UserController();

userRouter.post('/', validationLogin.validateLogin, userController.checkUser);
userRouter.get('/validate', checkToken.checkToken, userController.getRole);

export default userRouter;
