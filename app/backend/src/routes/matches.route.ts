import { Router } from 'express';
import MatchesController from '../controllers/matches.controllers';
import checkToken from '../middlewares/auth';

const matchRouter = Router();

const matchesController = new MatchesController();

matchRouter.get('/', matchesController.getAll);
matchRouter.post('/', checkToken.checkToken, matchesController.newMatch);
matchRouter.patch('/:id/finish', matchesController.finish);

export default matchRouter;
