import { Router } from 'express';
import MatchesController from '../controllers/matches.controllers';

const teamRouter = Router();

const matchesController = new MatchesController();

teamRouter.get('/', matchesController.getAll);

export default teamRouter;
