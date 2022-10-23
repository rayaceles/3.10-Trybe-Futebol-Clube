import { Request, Response } from 'express';
import LoginService from '../services/loginService';

export default class LoginController {
  private loginService: any;
  constructor() {
    this.loginService = new LoginService();
  }
  login = async (req: Request, res: Response): Promise<any> => {
    const token = await this.loginService.login(req.body);
    res.status(200).json({ token });
  };
  validate = async (req: Request, res: Response): Promise<any> => {
    const { authorization } = req.headers;
    console.log(authorization);
    const validation = await this.loginService.validate(authorization);
    res.status(200).json({ role: validation });
  };
};
