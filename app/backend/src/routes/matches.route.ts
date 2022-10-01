import { Router } from 'express';
import MatchesController from '../controllers/matches.controllers';

const matchRouter = Router();

const matchesController = new MatchesController();

matchRouter.get('/', matchesController.getAll);
matchRouter.post('/', matchesController.newMatch);
matchRouter.patch('/:id/finish', matchesController.finish);

export default matchRouter;
