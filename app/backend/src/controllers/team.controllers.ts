import { Request, Response } from 'express';
import TeamService from '../services/team.service';

export default class TeamController {
  constructor(private teamService = new TeamService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const teams = await this.teamService.getAll();
    if (teams) { return res.status(200).json(teams); }
    return res.status(500).end();
  };
}
