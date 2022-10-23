import { Router } from 'express';
import LoginController from '../controllers/loginController';

const loginController = new LoginController();
const loginRouter = Router();

loginRouter.post('/login', loginController.login);
loginRouter.get('/login/validate', loginController.validate);

export default loginRouter;