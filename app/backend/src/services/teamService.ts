import Team from '../database/models/teamModel';

export default class TeamService {
  allTeams = async () => {
    const teams = await Team.findAll();
    return teams;
  };
  teamById = async (id: number) => {
    const team = await Team.findOne({ where: { id } });
    if (team === null) {
      const err = new Error('Team not found');
      err.name = 'NotFoundError';
      throw err;
    }
    return team;
  };
};
