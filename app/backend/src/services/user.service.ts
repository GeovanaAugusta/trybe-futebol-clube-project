import UserInterface from '../interfaces/user.interface';
import UsersModel from '../database/models/UsersModel';

export default class UserService {
  public model = UsersModel;

  public async checkUser(email: string): Promise<UserInterface> {
    const data = await this.model.findOne({ where: { email } });
    // console.log('data', data);

    return data as UserInterface;
  }
}

// SOURCE
// https://gorrion.io/blog/node-express-js-typescript-sequelize/
