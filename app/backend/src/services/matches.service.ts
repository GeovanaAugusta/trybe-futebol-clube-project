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

  public async newMatch(match: MatchesInterface): Promise<MatchesInterface> {
    const createNewMatch = await this.model.create(match);
    console.log({ createNewMatch });

    return createNewMatch;
  }

  public async finish(id: number) {
    const match = await this.model.findByPk(id);
    console.log(match);

    // Créditos ao grande André - maior especialista
    match!.inProgress = 0;
    await match?.save();
    console.log(match);
    return match;
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
// patch
// https://stackoverflow.com/questions/8158244/how-to-update-a-record-using-sequelize-for-node
