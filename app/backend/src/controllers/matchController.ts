import { Request, Response } from 'express';
import MatchService from '../services/matchService';

export default class MatchController {
  private matchService: any;
  constructor() {
    this.matchService = new MatchService();
  }
  public allMatches = async (req: Request, res: Response): Promise<any> => {
    const { inProgress } = req.query;
    if (inProgress){
      const matches = await this.matchService.filterMatches(JSON.parse(inProgress as string));
      res.status(200).json(matches);
    }
    const matches = await this.matchService.allMatches();
    res.status(200).json(matches);
  };
  public createMatches = async (req: Request, res: Response): Promise<any> => {
    const { authorization } = req.headers;
    const newMatch = await this.matchService.createMatches(authorization, req.body);
    res.status(201).json(newMatch);
  };
  public finishMatches = async (req: Request, res: Response): Promise<any> => {
    // const { authorization } = req.headers;
    const { id } = req.params;
    const finishMatch = await this.matchService.finishMatches(id); // authorization,
    res.status(200).json(finishMatch);
  };
  public scoreMatches = async (req: Request, res: Response): Promise<any> => {
    // const { authorization } = req.headers;
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const resultMatch = await this.matchService
    .scoreMatches(id, homeTeamGoals, awayTeamGoals); // authorization, 
    res.status(200).json(resultMatch);
  };
};