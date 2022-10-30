import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export default class TeamController {
  constructor(private matchesService = new MatchesService()) { }

  public getAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;

    if (inProgress) {
      return this.getByQuery(req, res);
    }

    const matches = await this.matchesService.getAll();
    if (matches) { return res.status(200).json(matches); }
    return res.status(500).end();
  };

  public getByQuery = async (req: Request, res: Response) => {
    const { inProgress } = req.query;

    const stringToBoolean = (inProgress === 'true');

    const matches = await this.matchesService.getByQuery(stringToBoolean as boolean);
    if (matches) { return res.status(200).json(matches); }
    return res.status(500).end();
  };

  public newMatch = async (req: Request, res: Response) => {
    const allBody = req.body;

    const objectRequired = {
      ...allBody };
    const getNewMatch = await this.matchesService.newMatch(objectRequired);

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

  public updateMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    const matchUpdated = await this.matchesService
      .updateMatch(Number(id), homeTeamGoals, awayTeamGoals);
    // console.log(matchUpdated);

    if (matchUpdated) { return res.status(200).json({ message: 'Updated' }); }
  };
}

// SOURCE
// // 246 https://stackoverflow.com/questions/52017809/how-to-convert-string-to-boolean-in-typescript-angular-4
// var stringValue = "true";
// var boolValue = (stringValue =="true");
