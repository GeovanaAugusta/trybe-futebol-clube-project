import MatchesModel from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';
import leaderboardInterface from '../interfaces/leaderboard.interface';
import orderByPriorities from './helper/orderByPriorities';
// import TeamsInterface from '../interfaces/teams.interface';

export default class LeaderboardService {
  public model = TeamsModel;

  public async getHomeTeam(): Promise<leaderboardInterface[]> {
    const teamsHome = await this.model.findAll({
      include: [
        {
          model: MatchesModel,
          as: 'teamHome',
          where: { inProgress: false },
          attributes: ['homeTeamGoals', 'awayTeamGoals'],
        },
      ],
    });
    // console.log(teamsHome);
    return LeaderboardService.buildLeaderboard(teamsHome);
  }

  private static buildLeaderboard(teamsHome: TeamsModel[]): leaderboardInterface[] {
    const finalExpect = teamsHome.map((team: any) => ({
      name: team.teamName,
      totalPoints: LeaderboardService.calculatePoints(team.teamHome),
      totalGames: team.teamHome.length,
      totalVictories: team.teamHome.filter((t: any) => t.homeTeamGoals > t.awayTeamGoals).length,
      totalDraws: team.teamHome.filter((t: any) => t.homeTeamGoals === t.awayTeamGoals).length,
      totalLosses: team.teamHome.filter((t: any) => t.homeTeamGoals < t.awayTeamGoals).length,
      goalsFavor: team.teamHome.reduce((acc: any, curr: any) => acc + curr.homeTeamGoals, 0),
      goalsOwn: team.teamHome.reduce((acc: any, curr: any) => acc + curr.awayTeamGoals, 0),
      goalsBalance: team.teamHome.reduce((acc: any, curr: any) => acc + curr.homeTeamGoals, 0)
      - team.teamHome.reduce((acc: any, curr: any) => acc + curr.awayTeamGoals, 0),
      efficiency: (((LeaderboardService.calculatePoints(team.teamHome))
      / (team.teamHome.length * 3)) * 100).toFixed(2),
    }));
    const orderBy = orderByPriorities(finalExpect);
    return orderBy as unknown as leaderboardInterface[];
    // return teamsHome;
  }

  private static calculatePoints(teamHome: any[]): number {
    return teamHome.reduce((acc: any, curr: any) => {
      if (curr.homeTeamGoals > curr.awayTeamGoals) { return acc + 3; }
      if (curr.homeTeamGoals === curr.awayTeamGoals) { return acc + 1; }
      return acc + 0;
    }, 0);
  }
}

// SOURCE
// https://stackoverflow.com/questions/71110049/sequelize-where-with-include-based-on-parents-column
// https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
