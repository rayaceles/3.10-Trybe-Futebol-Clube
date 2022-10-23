import { Router } from 'express';
import TeamController from '../controllers/teamController';

const teamController = new TeamController();
const teamRouter = Router();

teamRouter.get('/teams', teamController.allTeams);
teamRouter.get('/teams/:id', teamController.teamById);

export default teamRouter;