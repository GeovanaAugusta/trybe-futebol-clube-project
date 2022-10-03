// 1º Total de Vitórias; 2º Saldo de gols; 3º Gols a favor; 4º Gols sofridos.

const orderByPriorities = (leaderboard: any) =>
  leaderboard.sort((a: any, b: any) => (b.totalPoints - a.totalPoints
  || b.totalVictories - a.totalVictories || b.goalsBalance - a.goalsBalance
  || b.goalsFavor - a.goalsFavor || b.goalsOwn - a.goalsOwn));

export default orderByPriorities;

// SOURCE
// https://dev.to/markbdsouza/js-sort-an-array-of-objects-on-multiple-columns-keys-2bj1 peguei a lógica:
// Extend to sort on all 3 columns
// objs.sort((a,b)=> (a.name.localeCompare(b.name) || a.age - b.age || a.RollNo - b.RollNo));
