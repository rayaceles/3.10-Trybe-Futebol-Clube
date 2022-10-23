import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';

export default class LeaderboardController {
  private leaderboardService: LeaderboardService;
  constructor() {
    this.leaderboardService = new LeaderboardService();
  }
  public homeTeamFilter = async (req: Request, res: Response): Promise<any> => {
    const filter = await this.leaderboardService.homeTeamFilter();
    res.status(200).json(filter);
  };
  public awayTeamFilter = async (req: Request, res: Response): Promise<any> => {
    const filter = await this.leaderboardService.awayTeamFilter();
    res.status(200).json(filter);
  };
  public generalTeamFilter = async (req: Request, res: Response): Promise<any> => {
    const filter = await this.leaderboardService.generalTeamFilter();
    res.status(200).json(filter);
  };
};