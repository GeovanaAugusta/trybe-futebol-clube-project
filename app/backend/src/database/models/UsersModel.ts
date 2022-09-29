import { INTEGER, STRING, Model } from 'sequelize';
import db from '.';

class Users extends Model {
  public id!: number;
  public username!: string;
  public role!: string;
  public email!: string;
  public password!: string;
}

// A exclamação faz com que não precise ter valor inicial

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

// SOURCE
// https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/live-lectures/9ae5c22e-c499-48fd-8fd2-516c8c1dd740/recording/1c66a464-8e2d-4c14-b5e9-f09d7a04a12e

// https://sequelize.org/docs/v6/other-topics/typescript/:

// import { Model, InferAttributes, InferCreationAttributes, DataTypes, ForeignKey } from 'sequelize';

// class Project extends Model<InferAttributes<Project>, InferCreationAttributes<Project>> {
//   id: number;
//   userId: ForeignKey<number>;
// }

// // this configures the `userId` attribute.
// Project.belongsTo(User);

// // therefore, `userId` doesn't need to be specified here.
// Project.init({
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
// }, { sequelize });

// User.init(
//   {
//     id: {
//       type: DataTypes.INTEGER.UNSIGNED,
//       autoIncrement: true,
//       primaryKey: true
//     },
//     name: {
//       type: new DataTypes.STRING(128),
//       allowNull: false
//     },
//     preferredName: {
//       type: new DataTypes.STRING(128),
//       allowNull: true
//     },
//     createdAt: DataTypes.DATE,
//     updatedAt: DataTypes.DATE,
//   },
//   {
//     tableName: 'users',
//     sequelize // passing the `sequelize` instance is required
//   }
// );
