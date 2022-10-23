import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboardController';

const leaderboardController = new LeaderboardController();
const leaderboardRouter = Router();

leaderboardRouter.get('/leaderboard/home', leaderboardController.homeTeamFilter);
leaderboardRouter.get('/leaderboard/away', leaderboardController.awayTeamFilter);
leaderboardRouter.get('/leaderboard', leaderboardController.generalTeamFilter);

export default leaderboardRouter;