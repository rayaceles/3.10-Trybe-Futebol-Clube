import Match from '../database/models/matchModel';
import Team from '../database/models/teamModel';
import { homeTeamsDashboard } from '../middlewares/homeBusinessRules';
import { awayTeamsDashboard } from '../middlewares/awayBusinessRules';
import { generalTeamsDashboard } from '../middlewares/generalBusinessRules';

export default class LeaderboardService {
  public homeTeamFilter = async () => {
    const finishedMatches = await Match.findAll({
      attributes: { exclude: ['id'] },
      where: { inProgress: false },
    });
    const allTeams = await Team.findAll();
    const teamDashboard = await homeTeamsDashboard(finishedMatches, allTeams);
    return teamDashboard;
  };
  public awayTeamFilter = async () => {
    const finishedMatches = await Match.findAll({
      attributes: { exclude: ['id'] },
      where: { inProgress: false },
    });
    const allTeams = await Team.findAll();
    const teamDashboard = await awayTeamsDashboard(finishedMatches, allTeams);
    return teamDashboard;
  };
  public generalTeamFilter = async () => {
    const finishedMatches = await Match.findAll({
      attributes: { exclude: ['id'] },
      where: { inProgress: false },
    });
    const allTeams = await Team.findAll();
    const teamDashboard = await generalTeamsDashboard(finishedMatches, allTeams);
    return teamDashboard;
  };
};