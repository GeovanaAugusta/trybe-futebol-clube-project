import { Router } from 'express';
import TeamController from '../controllers/team.controllers';

const teamRouter = Router();

const teamController = new TeamController();

teamRouter.get('/', teamController.getAll);
teamRouter.get('/:id', teamController.getById);

export default teamRouter;
