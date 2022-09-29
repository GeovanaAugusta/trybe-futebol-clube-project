import { NUMBER, Model } from 'sequelize';
import db from '.';

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
      allowNull: false,
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
      type: NUMBER,
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

export default Matches;

// SOURCE belongsTo
// https://stackoverflow.com/questions/63691872/typescript-with-sequelize-useradmin-belongsto-called-with-something-thats-not
// foreign keys are automatically added by associations methods (like Project.belongsTo)
// by branding them using the `ForeignKey` type, `Project.init` will know it does not need to
