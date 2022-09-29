import { NUMBER, Model, BOOLEAN } from 'sequelize';
import db from '.';
import Teams from './TeamsModel';

class Matches extends Model {
  declare id: number;
  public homeTeam!: number;
  public homeTeamGoals!: number;
  public awayTeam!: number;
  public awayTeamGoals!: number;
  public inProgress!: number;
}

// A exclamação faz com que não precise ter valor inicial

Matches.init(
  {
    id: {
      type: NUMBER,
      autoIncrement: true,
      primaryKey: true,
    },
    homeTeam: {
      type: NUMBER,
      allowNull: false,
    },
    homeTeamGoals: {
      type: NUMBER,
      allowNull: false,
    },
    awayTeam: {
      type: NUMBER,
      allowNull: false,
    },
    awayTeamGoals: {
      type: NUMBER,
      allowNull: false,
    },
    inProgress: {
      type: BOOLEAN,
      allowNull: false,
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'matchs',
    timestamps: false,
  },
);

Matches.belongsTo(Teams, { foreignKey: 'homeTeam', as: 'teamByHome' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeam', as: 'teamByAway' });

Teams.hasMany(Matches, { foreignKey: 'homeTeam', as: 'teamByHome' });
Teams.hasMany(Matches, { foreignKey: 'awayTeam', as: 'teamByAway' });

export default Matches;

// SOURCE belongsTo
// https://stackoverflow.com/questions/63691872/typescript-with-sequelize-useradmin-belongsto-called-with-something-thats-not
// foreign keys are automatically added by associations methods (like Project.belongsTo)
// by branding them using the `ForeignKey` type, `Project.init` will know it does not need to
