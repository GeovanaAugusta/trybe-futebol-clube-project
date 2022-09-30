import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export default class TeamController {
  constructor(private matchesService = new MatchesService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const matches = await this.matchesService.getAll();
    if (matches) { return res.status(200).json(matches); }
    return res.status(500).end();
  };
}
