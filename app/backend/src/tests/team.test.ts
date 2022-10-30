import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';


import { Response } from 'superagent';
import Teams from '../database/models/TeamsModel';

const teamMock = 
[
	{
		"id": 1,
		"teamName": "Avaí/Kindermann"
	},
	{
		"id": 2,
		"teamName": "Bahia"
	},
	{
		"id": 3,
		"teamName": "Botafogo"
	},
	{
		"id": 4,
		"teamName": "Corinthians"
	},
	{
		"id": 5,
		"teamName": "Cruzeiro"
	},
	{
		"id": 6,
		"teamName": "Ferroviária"
	},
	{
		"id": 7,
		"teamName": "Flamengo"
	},
	{
		"id": 8,
		"teamName": "Grêmio"
	},
	{
		"id": 9,
		"teamName": "Internacional"
	},
	{
		"id": 10,
		"teamName": "Minas Brasília"
	},
	{
		"id": 11,
		"teamName": "Napoli-SC"
	},
	{
		"id": 12,
		"teamName": "Palmeiras"
	},
	{
		"id": 13,
		"teamName": "Real Brasília"
	},
	{
		"id": 14,
		"teamName": "Santos"
	},
	{
		"id": 15,
		"teamName": "São José-SP"
	},
	{
		"id": 16,
		"teamName": "São Paulo"
	}
]

const mockById = 
{
	"id": 5,
	"teamName": "Cruzeiro"
}


chai.use(chaiHttp);

const { expect } = chai;

describe('/login', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
  sinon.restore();
  })

  sinon
      .stub(Teams, "findAll")
      .resolves(teamMock as Teams[]);


  describe('GET', () => {
    it('Deve ser possível visualizar todos os times com sucesso', async () => {
      await (chai.request(app).get('/teams'))
      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse).to.deep.equal(teamMock);
    });
  })
    it('Deve ser possível visualizar um time por id com sucesso', async () => {
      await (chai.request(app).get('/teams/5'))
      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse).to.deep.equal(mockById);
  })
});
