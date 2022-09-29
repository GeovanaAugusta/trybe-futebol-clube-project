import UsersModel from '../database/models/UsersModel';
import loginInterface from '../interfaces/user.interface';

export default class UserModel {
  public model = UsersModel;

  public async findOne(email: string): Promise<loginInterface> {
    const result = await this.model.findOne({ where: { email } });
    return result as loginInterface;
  }
}
