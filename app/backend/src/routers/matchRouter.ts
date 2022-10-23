import { Router } from 'express';
import MatchController from '../controllers/matchController';

const matchController = new MatchController();
const matchRouter = Router();

matchRouter.get('/matches', matchController.allMatches);
matchRouter.post('/matches', matchController.createMatches);
matchRouter.patch('/matches/:id/finish', matchController.finishMatches);
matchRouter.patch('/matches/:id', matchController.scoreMatches);

export default matchRouter;