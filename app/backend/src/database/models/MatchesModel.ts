import { INTEGER } from 'sequelize';
import { NUMBER } from 'sequelize';
import { Model, DataTypes } from 'sequelize';
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

Matches.init({
  id: {
    type: NUMBER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  home_team: {
    type: NUMBER,
    allowNull: false,
  },
  home_team_goals: {
    type: NUMBER,
    allowNull: false,
  },
  away_team: {
    type: NUMBER,
    allowNull: false,
  },
  away_team_goals: {
    type: NUMBER,
    allowNull: false,
  },
  in_progress: {
    type: NUMBER,
    allowNull: false,
  }
}, 
{
  underscored: true,
  sequelize: db,
  modelName: 'matchs',
  timestamps: false,
});


Matches.belongsTo(Teams, { foreignKey: 'home_team', as: 'homeByTeam' });
Matches.belongsTo(Teams, { foreignKey: 'away_team', as: 'awayByTeam' });

export default Matches;

// SOURCE belongsTo
// https://stackoverflow.com/questions/63691872/typescript-with-sequelize-useradmin-belongsto-called-with-something-thats-not
//  // foreign keys are automatically added by associations methods (like Project.belongsTo)
  // by branding them using the `ForeignKey` type, `Project.init` will know it does not need to