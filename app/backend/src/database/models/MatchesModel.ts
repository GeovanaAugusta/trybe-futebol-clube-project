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
    modelName: 'Matches',
    tableName: 'matches',
    timestamps: false,
  },
);

Matches.belongsTo(Teams, { foreignKey: 'homeTeam', as: 'teamHome' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeam', as: 'teamAway' });

Teams.hasMany(Matches, { foreignKey: 'homeTeam', as: 'teamHomeb' });
Teams.hasMany(Matches, { foreignKey: 'awayTeam', as: 'teamAwayb' });

export default Matches;
