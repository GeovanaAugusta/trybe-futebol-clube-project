import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controllers';
// import checkToken from '../middlewares/auth';

const leaderboardRouter = Router();

const leaderboardController = new LeaderboardController();

leaderboardRouter.get('/home', leaderboardController.buildLeaderboard);

export default leaderboardRouter;
