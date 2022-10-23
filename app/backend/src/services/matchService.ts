import Match from '../database/models/matchModel';
import Team from '../database/models/teamModel';
import User from '../database/models/userModel';
import jwtToken from '../middlewares/jwtToken';

export default class MatchService {
  public allMatches = async () => {
    const matches = await Match.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return matches;
  };
  public filterMatches = async (inProgress: boolean) => {
    const matches = await Match.findAll({
      where: { inProgress },
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return matches;
  };
  createMatches = async (auth: string, matchInfos: any) => {
    if (!auth) {
      const err = new Error('Token must be a valid token');
      err.name = 'Unauthorized';
      throw err; 
    }
    const validateToken = jwtToken.validateToken(auth);
    const user = await User.findOne({ where: { email: validateToken } });
    if (!user) {
      const err = new Error('Token must be a valid token');
      err.name = 'Unauthorized';
      throw err;
    }
    const { homeTeam, awayTeam } = matchInfos;
    if(homeTeam === awayTeam) {
      const err = new Error('It is not possible to create a match with two equal teams');
      err.name = 'Unauthorized';
      throw err;
    }
    const validatehomeTeam = await Match.findOne({ where: { id: homeTeam } });
    const validateawayTeam = await Match.findOne({ where: { id: awayTeam } });
    if(!validatehomeTeam || !validateawayTeam) {
      const err = new Error('There is no team with such id!');
      err.name = 'NotFoundError';
      throw err;
    }
    const newMatch = await Match.create(matchInfos);
    return newMatch;
  };
  finishMatches = async (id: number) => { // auth: string,
    const finishMatch = await Match.update({ inProgress: false },{ where: { id } });
    if (!finishMatch) {
      const err = new Error('Match not found');
      err.name = 'NotFoundError';
      throw err;
    }
    return { message: 'Finished' };
  };
  scoreMatches = async (id: number, htg: number, atg: number) => { // auth: string,
    const [resultMatch] = await Match.update({
      homeTeamGoals: htg,
      awayTeamGoals: atg,
    },{ where: { id } });
    if (!resultMatch) {
      const err = new Error('Match not found');
      err.name = 'NotFoundError';
      throw err;
    }
    return resultMatch;
  };
};
