import MatchesInterface from './matches.interface';

interface TeamsInterface {
  id: number,
  teamName: string,
  teamHome: MatchesInterface[],
}
export default TeamsInterface;
