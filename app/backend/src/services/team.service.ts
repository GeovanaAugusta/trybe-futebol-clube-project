import TeamInterface from '../interfaces/team.interface';
import TeamsModel from '../database/models/TeamsModel';

export default class TeamService {
  public model = TeamsModel;

  public async getAll(): Promise<TeamInterface[]> {
    const teams = await this.model.findAll();

    return teams;
  }

  public async getById(id: number): Promise<TeamInterface> {
    const team = await this.model.findByPk(id);

    return team as TeamInterface;
  }
}
