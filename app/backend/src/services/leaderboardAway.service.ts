import MatchesModel from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';
import leaderboardInterface from '../interfaces/leaderboard.interface';
import orderByPriorities from './helper/orderByPriorities';
// import TeamsInterface from '../interfaces/teams.interface';

export default class LeaderboardServiceAway {
  public model = TeamsModel;

  public async getAwayTeam() {
    const teamsAway = await this.model.findAll({
      include: [
        {
          model: MatchesModel,
          as: 'teamAwayb',
          where: { inProgress: false },
          attributes: ['homeTeamGoals', 'awayTeamGoals'],
        },
      ],
    });
    // console.log(teamsHome);
    return LeaderboardServiceAway.buildLeaderboardAway(teamsAway);
  }

  private static buildLeaderboardAway(teamsHome: TeamsModel[]): leaderboardInterface[] {
    const finalExpect = teamsHome.map((team: any) => ({
      name: team.teamName,
      totalPoints: LeaderboardServiceAway.calculatePointsAway(team.teamAwayb),
      totalGames: team.teamAwayb.length,
      totalVictories: team.teamAwayb.filter((t: any) => t.homeTeamGoals < t.awayTeamGoals).length,
      totalDraws: team.teamAwayb.filter((t: any) => t.homeTeamGoals === t.awayTeamGoals).length,
      totalLosses: team.teamAwayb.filter((t: any) => t.homeTeamGoals > t.awayTeamGoals).length,
      goalsFavor: team.teamAwayb.reduce((acc: any, curr: any) => acc + curr.awayTeamGoals, 0),
      goalsOwn: team.teamAwayb.reduce((acc: any, curr: any) => acc + curr.homeTeamGoals, 0),
      goalsBalance: team.teamAwayb.reduce((acc: any, curr: any) => acc + curr.awayTeamGoals, 0)
      - team.teamAwayb.reduce((acc: any, curr: any) => acc + curr.homeTeamGoals, 0),
      efficiency: (((LeaderboardServiceAway.calculatePointsAway(team.teamAwayb))
      / (team.teamAwayb.length * 3)) * 100).toFixed(2),
    }));
    const orderBy = orderByPriorities(finalExpect);
    return orderBy as unknown as leaderboardInterface[];
    // return finalExpect as unknown as leaderboardInterface[];
  }

  private static calculatePointsAway(teamAway: any[]): number {
    return teamAway.reduce((acc: any, curr: any) => {
      if (curr.homeTeamGoals < curr.awayTeamGoals) { return acc + 3; }
      if (curr.homeTeamGoals === curr.awayTeamGoals) { return acc + 1; }
      return acc + 0;
    }, 0);
  }
}

// SOURCE
// https://stackoverflow.com/questions/71110049/sequelize-where-with-include-based-on-parents-column
// https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
