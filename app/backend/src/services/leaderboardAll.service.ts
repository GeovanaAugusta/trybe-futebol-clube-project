import MatchesModel from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';
import leaderboardInterface from '../interfaces/leaderboard.interface';
import allResults from './helper/getAllResults';
import orderByPriorities from './helper/orderByPriorities';

export default class LeaderboardServiceAway {
  public model = TeamsModel;

  public async getAll() {
    const teamsAway = await this.model.findAll({
      include: [
        {
          model: MatchesModel,
          as: 'teamHomeb',
          where: { inProgress: false },
          attributes: ['homeTeamGoals', 'awayTeamGoals'],
        },
        {
          model: MatchesModel,
          as: 'teamAwayb',
          where: { inProgress: false },
          attributes: ['homeTeamGoals', 'awayTeamGoals'],
        },
      ],
    });

    return LeaderboardServiceAway.buildLeaderboardAll(teamsAway);
  }

  private static buildLeaderboardAll(teamsHome: TeamsModel[]): leaderboardInterface[] {
    const finalExpect = teamsHome.map((team: any) => ({
      name: team.teamName,
      totalPoints: LeaderboardServiceAway.calculatePointsAway(team.teamAwayb)
      + LeaderboardServiceAway.calculatePointsHome(team.teamHomeb),
      totalGames: team.teamAwayb.length + team.teamHomeb.length,
      totalVictories: (team.teamAwayb.filter((t: any) => t.homeTeamGoals < t.awayTeamGoals).length)
      + (team.teamHomeb.filter((t: any) => t.homeTeamGoals > t.awayTeamGoals).length),
      totalDraws: allResults.draws(team.teamAwayb, team.teamHomeb),
      totalLosses: allResults.losses(team.teamAwayb, team.teamHomeb),
      goalsFavor: allResults.goalsFavor(team.teamAwayb, team.teamHomeb),
      goalsOwn: allResults.goalsOwn(team.teamAwayb, team.teamHomeb),
      goalsBalance: allResults.goalsFavor(team.teamAwayb, team.teamHomeb)
      - allResults.goalsOwn(team.teamAwayb, team.teamHomeb),
      efficiency: (((LeaderboardServiceAway.calculatePointsAway(team.teamAwayb)
      + LeaderboardServiceAway.calculatePointsHome(team.teamHomeb))
      / ((team.teamAwayb.length + team.teamHomeb.length) * 3)) * 100).toFixed(2),
    }));

    return orderByPriorities(finalExpect) as unknown as leaderboardInterface[];
  }

  private static calculatePointsAway(teamAway: any): number {
    return teamAway.reduce((acc: any, curr: any) => {
      if (curr.homeTeamGoals < curr.awayTeamGoals) { return acc + 3; }
      if (curr.homeTeamGoals === curr.awayTeamGoals) { return acc + 1; }
      return acc + 0;
    }, 0);
  }

  private static calculatePointsHome(teamAway: any[]): number {
    return teamAway.reduce((acc: any, curr: any) => {
      if (curr.homeTeamGoals > curr.awayTeamGoals) { return acc + 3; }
      if (curr.homeTeamGoals === curr.awayTeamGoals) { return acc + 1; }
      return acc + 0;
    }, 0);
  }

  private static calculateDraws(team: any[]): number {
    return team.filter((t: any) => t.homeTeamGoals === t.awayTeamGoals).length;
  }
}
