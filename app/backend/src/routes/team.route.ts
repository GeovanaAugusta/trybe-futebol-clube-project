import { Router } from 'express';
import TeamController from '../controllers/team.controllers';

const teamRouter = Router();

const teamController = new TeamController();

teamRouter.get('/', teamController.getAll);

export default teamRouter;
