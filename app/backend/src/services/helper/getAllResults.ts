const allResults = {
  draws: (teamAway: any, teamHome: any) => {
    const x = teamAway.filter((t: any) => t.homeTeamGoals === t.awayTeamGoals).length;
    const y = teamHome.filter((t: any) => t.homeTeamGoals === t.awayTeamGoals).length;
    return x + y;
  },
  losses: (teamAway: any, teamHome: any) => {
    const x = teamAway.filter((t: any) => t.homeTeamGoals > t.awayTeamGoals).length;
    const y = teamHome.filter((t: any) => t.homeTeamGoals < t.awayTeamGoals).length;
    return x + y;
  },
  goalsFavor: (teamAway: any, teamHome: any) => {
    const x = teamAway.reduce((acc: any, curr: any) => acc + curr.awayTeamGoals, 0);
    const y = teamHome.reduce((acc: any, curr: any) => acc + curr.homeTeamGoals, 0);
    return x + y;
  },
  goalsOwn: (teamAway: any, teamHome: any) => {
    const x = teamAway.reduce((acc: any, curr: any) => acc + curr.homeTeamGoals, 0);
    const z = teamHome.reduce((acc: any, curr: any) => acc + curr.awayTeamGoals, 0);
    return x + z;
  },
};
export default allResults;
