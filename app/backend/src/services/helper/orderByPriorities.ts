// 1º Total de Vitórias; 2º Saldo de gols; 3º Gols a favor; 4º Gols sofridos.

const orderByPriorities = (leaderboard: any) =>
  leaderboard.sort((a: any, b: any) => (b.totalPoints - a.totalPoints
  || b.totalVictories - a.totalVictories || b.goalsBalance - a.goalsBalance
  || b.goalsFavor - a.goalsFavor || b.goalsOwn - a.goalsOwn));

export default orderByPriorities;
