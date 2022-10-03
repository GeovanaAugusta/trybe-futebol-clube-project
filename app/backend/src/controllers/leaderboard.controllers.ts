import { Request, Response } from 'express';
import Leaderboard from '../services/leaderboard.service';

export default class LeaderboardController {
  constructor(private leaderboard = new Leaderboard()) { }

  public buildLeaderboard = async (_req: Request, res: Response) => {
    const matches = await this.leaderboard.getHomeTeam();
    if (matches) { return res.status(200).json(matches); }
    return res.status(500).end();
  };
}
