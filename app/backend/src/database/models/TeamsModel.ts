import { INTEGER, STRING, Model } from 'sequelize';
import db from '.';
import Matches from './MatchesModel';

class Teams extends Model {
  public id!: number;
  public teamName!: string;
}
// A exclamação faz com que não precise ter valor inicial

Teams.init(
  {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    teamName: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'Teams',
    tableName: 'teams',
    timestamps: false,
  },
);

export default Teams;

Matches.hasOne(Teams, { foreignKey: 'home_team', as: 'id' });
Matches.hasOne(Teams, { foreignKey: 'away_team', as: 'id' });

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

// has many

// Here we associate which actually populates out pre-declared `association` static and other methods.
// User.hasMany(Project, {
//   sourceKey: 'id',
//   foreignKey: 'ownerId',
//   as: 'projects' // this determines the name in `associations`!
// });

// https://lightrun.com/answers/sequelize-sequelize-typescript-example-of-mn-relationship-belongstomany-with-through-table-attributes
// Dia 01 - ex-prat (books) e app-with-sequelize https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/94d0e996-1827-4fbc-bc24-c99fb592925b/section/0ca77b1d-4770-4646-8368-167d2305e763/day/0da9bd44-abf6-43d6-96b9-9614274e6c36/lesson/0409cb50-a1dc-44ad-bf7b-141994a79722
// https://stackoverflow.com/questions/63691872/typescript-with-sequelize-useradmin-belongsto-called-with-something-thats-not
