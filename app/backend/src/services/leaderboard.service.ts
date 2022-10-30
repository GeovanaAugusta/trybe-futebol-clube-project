import MatchesModel from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';
import leaderboardInterface from '../interfaces/leaderboard.interface';
import orderByPriorities from './helper/orderByPriorities';

export default class LeaderboardService {
  public model = TeamsModel;

  public async getHomeTeam(): Promise<leaderboardInterface[]> {
    const teamsHome = await this.model.findAll({
      include: [
        {
          model: MatchesModel,
          as: 'teamHomeb',
          where: { inProgress: false },
          attributes: ['homeTeamGoals', 'awayTeamGoals'],
        },
      ],
    });

    return LeaderboardService.buildLeaderboard(teamsHome);
  }

  private static buildLeaderboard(teamsHome: TeamsModel[]): leaderboardInterface[] {
    const finalExpect = teamsHome.map((team: any) => ({
      name: team.teamName,
      totalPoints: LeaderboardService.calculatePoints(team.teamHomeb),
      totalGames: team.teamHomeb.length,
      totalVictories: team.teamHomeb.filter((t: any) => t.homeTeamGoals > t.awayTeamGoals).length,
      totalDraws: team.teamHomeb.filter((t: any) => t.homeTeamGoals === t.awayTeamGoals).length,
      totalLosses: team.teamHomeb.filter((t: any) => t.homeTeamGoals < t.awayTeamGoals).length,
      goalsFavor: team.teamHomeb.reduce((acc: any, curr: any) => acc + curr.homeTeamGoals, 0),
      goalsOwn: team.teamHomeb.reduce((acc: any, curr: any) => acc + curr.awayTeamGoals, 0),
      goalsBalance: team.teamHomeb.reduce((acc: any, curr: any) => acc + curr.homeTeamGoals, 0)
      - team.teamHomeb.reduce((acc: any, curr: any) => acc + curr.awayTeamGoals, 0),
      efficiency: (((LeaderboardService.calculatePoints(team.teamHomeb))
      / (team.teamHomeb.length * 3)) * 100).toFixed(2),
    }));
    const orderBy = orderByPriorities(finalExpect);
    return orderBy as unknown as leaderboardInterface[];
  }

  private static calculatePoints(teamHome: any[]): number {
    return teamHome.reduce((acc: any, curr: any) => {
      if (curr.homeTeamGoals > curr.awayTeamGoals) { return acc + 3; }
      if (curr.homeTeamGoals === curr.awayTeamGoals) { return acc + 1; }
      return acc + 0;
    }, 0);
  }
}
