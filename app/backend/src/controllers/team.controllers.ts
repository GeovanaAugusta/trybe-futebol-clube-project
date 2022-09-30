import { Request, Response } from 'express';
import TeamService from '../services/team.service';

export default class TeamController {
  constructor(private teamService = new TeamService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const teams = await this.teamService.getAll();
    if (teams) { return res.status(200).json(teams); }
    return res.status(500).end();
  };

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const team = await this.teamService.getById(Number(id));
    if (team) { return res.status(200).json(team); }
    return res.status(500).end();
  };
}
