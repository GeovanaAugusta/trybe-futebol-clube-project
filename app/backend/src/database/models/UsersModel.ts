import { INTEGER, STRING, Model } from 'sequelize';
import db from '.';

class Users extends Model {
  public id!: number;
  public username!: string;
  public role!: string;
  public email!: string;
  public password!: string;
}

Users.init(
  {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: STRING,
      allowNull: false,
    },
    role: {
      type: STRING,
      allowNull: false,
    },
    email: {
      type: STRING,
      allowNull: false,
    },
    password: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'Users',
    tableName: 'users',
    timestamps: false,
  },
);

export default Users;
