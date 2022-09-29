import UserInterface from '../interfaces/user.interface';
import UsersModel from '../database/models/UsersModel';
import { RoleToService } from '../interfaces/role.service.interface';

export default class UserService {
  public model = UsersModel;

  public async checkUser(email: string): Promise<UserInterface> {
    const data = await this.model.findOne({ where: { email } });
    // console.log('data', data);
    return data as UserInterface;
  }

  public async getRole(email: string): Promise<RoleToService> {
    const data = await this.checkUser(email);
    // console.log('data validate', data);
    const getRole = data.role as unknown as string;
    // console.log('role', role);
    return { role: getRole };
  }
}

// SOURCE
// https://gorrion.io/blog/node-express-js-typescript-sequelize/
