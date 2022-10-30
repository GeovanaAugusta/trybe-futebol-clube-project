import { INTEGER, STRING, Model } from 'sequelize';
import db from '.';

class Teams extends Model {
  public id!: number;
  public teamName!: string;
}

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
