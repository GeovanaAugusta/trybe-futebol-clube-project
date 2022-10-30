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

  public async getByQuery(query: boolean): Promise<MatchesInterface[]> {
    const matches = await this.model.findAll(
      { where: { inProgress: query },
        include: [
          {
            model: TeamsModel,
            as: 'teamHome',

          },
          {
            model: TeamsModel,
            as: 'teamAway',

          },
        ],
      },
    );
    return matches;
  }

  public async newMatch(match: MatchesInterface) {
    const homeTeam = await this.model.findByPk(match!.homeTeam);
    const awayTeam = await this.model.findByPk(match!.awayTeam);

    if (!homeTeam || !awayTeam) { return false; }
    const createNewMatch = await this.model.create(match);

    return createNewMatch;
  }

  public async finish(id: number) {
    const match = await this.model.findByPk(id);

    match!.inProgress = 0;
    await match?.save();

    return match;
  }

  public async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    const matchUpdated = await this.model.findByPk(id);
    matchUpdated!.homeTeamGoals = homeTeamGoals;
    matchUpdated!.awayTeamGoals = awayTeamGoals;
    await matchUpdated?.save();
    // console.log(matchUpdated);

    return matchUpdated;
  }
}
