import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controllers';

const leaderboardRouter = Router();

const leaderboardController = new LeaderboardController();

leaderboardRouter.get('/home', leaderboardController.buildLeaderboard);
leaderboardRouter.get('/away', leaderboardController.buildLeaderboardAway);
leaderboardRouter.get('/', leaderboardController.buildLeaderboardAll);

export default leaderboardRouter;
