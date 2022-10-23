import { Request, Response } from 'express';
import TeamService from '../services/teamService';

export default class TeamController {
  private teamService: any;
  constructor() {
    this.teamService = new TeamService();
  }
  allTeams = async (req: Request, res: Response): Promise<any> => {
    const teams = await this.teamService.allTeams();
    res.status(200).json(teams);
  };
  teamById = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const team = await this.teamService.teamById(id);
    res.status(200).json(team);
  };
};