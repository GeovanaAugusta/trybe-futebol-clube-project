import { Request, Response, NextFunction } from 'express';

const validationLogin = {
  validateLogin(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    console.log(email, password);

    // const emailRegex = /\S+@\S+\.\S+/;

    // if (!emailRegex.test(email)) {
    //   return res.status(400)
    //     .json({ message: 'All fields must be filled' });
    // }

    if (!email || !password || password === '') {
      res.status(400).json({ message: 'All fields must be filled' });
    }

    next();
  },
};

export default validationLogin;
