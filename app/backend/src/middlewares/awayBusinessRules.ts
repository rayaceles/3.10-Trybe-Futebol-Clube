const teamNumbers = (matches: any) => {
  let totalVictories = 0;
  let totalDraws = 0;
  let totalLosses = 0;
  let goalsFavor = 0;
  let goalsOwn = 0;
  matches.forEach((match: any) => {
    match.awayTeamGoals > 0 ? goalsFavor += match.awayTeamGoals : goalsFavor;
    match.homeTeamGoals > 0 ? goalsOwn += match.homeTeamGoals : goalsOwn;
    match.awayTeamGoals > match.homeTeamGoals ? totalVictories += 1 : totalVictories;
    match.awayTeamGoals === match.homeTeamGoals ? totalDraws += 1 : totalDraws;
    match.awayTeamGoals < match.homeTeamGoals ? totalLosses += 1 : totalLosses;
  });
  const totalPoints = (totalVictories*3) + totalDraws;
  const efficiency = Number(((totalPoints*100)/((matches.length*3))).toFixed(2));
  const goalsBalance = goalsFavor - goalsOwn;
  return {
    totalVictories,
    totalDraws,
    goalsFavor,
    goalsOwn,
    totalPoints,
    totalLosses,
    efficiency,
    goalsBalance,
  };
};
const classOrder = async (teams: any) => { // compara e ordena time a com time b
  const order = await teams
    .sort(( a: any, b: any ) => b.goalsOwn - a.goalsOwn)
    .sort(( a: any, b: any ) => b.goalsFavor - a.goalsFavor)
    .sort(( a: any, b: any ) => b.goalsBalance - a.goalsBalance)
    .sort(( a: any, b: any ) => b.totalVictories - a.totalVictories)
    .sort(( a: any, b: any ) => b.totalPoints - a.totalPoints);
  return order;
};

export const awayTeamsDashboard = async (finishedMatches: any, allTeams: any) => {
  const teams = allTeams.map((team: any) => {
    const teamName = team.teamName;
    const matches = finishedMatches.filter((match: any) => match.awayTeam === team.id);
    const results = teamNumbers(matches);
    return {
      name: teamName,
      totalPoints: results.totalPoints,
      totalGames: matches.length,
      totalVictories: results.totalVictories,
      totalDraws: results.totalDraws,
      totalLosses: results.totalLosses,
      goalsFavor: results.goalsFavor,
      goalsOwn: results.goalsOwn,
      goalsBalance: results.goalsBalance,
      efficiency: results.efficiency,
    };
  });
  const teamsOrder = await classOrder(teams);
  return teamsOrder;
};
