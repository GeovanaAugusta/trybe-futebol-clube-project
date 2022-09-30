import MatchesInterface from '../interfaces/matches.interface';
import MatchesModel from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';

export default class MatchesService {
  public model = MatchesModel;

  public async getAll(): Promise<MatchesInterface[]> {
    const matches = await this.model.findAll({
      include: [
        {
          model: TeamsModel,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: TeamsModel,
          as: 'teamAway',
          attributes: ['teamName'],
        },
      ],
    });

    return matches;
  }
}

// SOURCE
// https://stackoverflow.com/questions/59387325/typescript-sequelize-how-to-join-two-tables-with-common
// https://stackoverflow.com/questions/53117988/sequelize-select-and-include-another-table-alias
// City.hasMany(models.building,{as: 'building', foreignKey: 'cityId'})
// include: [
//   {
//     model: Building, as: "buildings" // <---- HERE
//  }
// ]
// https://stackoverflow.com/questions/54317914/sequelize-typescript-include-on-many-to-many-only-includes-one-of-many-results
// // ...
// User.addScope('public', {
//   include: [
//       // ...
//       { model: Tag, as: 'tags', through: { attributes: [] } },
//   ]
// } as IFindOptions<User>);
// https://sequelize.org/docs/v6/core-concepts/model-querying-basics/ BINGO
