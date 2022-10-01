import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export default class TeamController {
  constructor(private matchesService = new MatchesService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const matches = await this.matchesService.getAll();
    if (matches) { return res.status(200).json(matches); }
    return res.status(500).end();
  };

  public newMatch = async (req: Request, res: Response) => {
    const allBody = req.body;
    // console.log(allBody.homeTeam);

    const objectRequired = {
      ...allBody };
    const getNewMatch = await this.matchesService.newMatch(objectRequired);
    // console.log('getNewMatch', getNewMatch);

    const bool = allBody.homeTeam === allBody.awayTeam;

    if (bool) {
      return res.status(401)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    if (!getNewMatch) {
      return res.status(404)
        .json({ message: 'There is no team with such id!' });
    }

    if (getNewMatch) { return res.status(201).json(getNewMatch); }
    return res.status(500).end();
  };

  public finish = async (req: Request, res: Response) => {
    const { id } = req.params;
    const match = await this.matchesService.finish(Number(id));
    // console.log(match);

    if (match) { return res.status(200).json({ message: 'Finished' }); }
    return res.status(500).end();
  };
}
