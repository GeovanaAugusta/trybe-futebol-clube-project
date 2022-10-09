import { Request, Response } from 'express';
import LeaderboardHome from '../services/leaderboard.service';
import LeaderboardServiceAway from '../services/leaderboardAway.service';
// import Leaderboard from '../services/leaderboardAll.service';

export default class LeaderboardController {
  constructor(
    private leaderboardHome = new LeaderboardHome(),
    private leaderboardAway = new LeaderboardServiceAway(),
    // private leaderboard = new Leaderboard(),
  ) { }

  public buildLeaderboard = async (_req: Request, res: Response) => {
    const matches = await this.leaderboardHome.getHomeTeam();
    if (matches) { return res.status(200).json(matches); }
    return res.status(500).end();
  };

  public buildLeaderboardAway = async (_req: Request, res: Response) => {
    const matches = await this.leaderboardAway.getAwayTeam();
    if (matches) { return res.status(200).json(matches); }
    return res.status(500).end();
  };

  // public buildLeaderboardAll = async (_req: Request, res: Response) => {
  //   const matches = await this.leaderboard.getAll();
  //   if (matches) { return res.status(200).json(matches); }
  //   return res.status(500).end();
  // };
}
