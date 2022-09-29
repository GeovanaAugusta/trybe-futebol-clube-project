import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';


import { Response } from 'superagent';
import Users from '../database/models/UsersModel';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';


chai.use(chaiHttp);

const { expect } = chai;

const userMock = {
  email: 'admin@admin.com',
  password: 'secret_admin',
}
const tokenMock = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjY0NDY2NDE2LCJleHAiOjE2NjUyNDQwMTZ9.6F-bmiupvvyGZUsyzZAx8Mw7FE16ayDlU9ev0J9TtVA';

describe('/login', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
  sinon.restore();
  })

  sinon
      .stub(Users, "findOne")
      .resolves(userMock as Users);
    sinon
      .stub(jwt, 'sign')
      .resolves(tokenMock)
    sinon
      .stub(bcrypt, 'compareSync')
      .resolves(true)


  describe('POST', () => {
    it('Deve cadastrar um usuário com sucesso', async () => {
      await (chai.request(app).post('/login')).send(await (chai.request(app).post('/login')).send(userMock))
      expect(chaiHttpResponse.status).to.equal(200);
    })
    it('Deve retornar um token, se os dados de login estiverem certos', async () => {  
       await (chai.request(app).post('/login')).send(userMock);
      expect(chaiHttpResponse.body).to.have.property('token');
      expect(chaiHttpResponse.body).to.deep.equal({token: tokenMock})
    });
  })
});

// SOURCE
// https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/live-lectures/140133e3-d28a-4e8c-8ed3-4ba478fabf71/recording/d3d04db1-590b-47cc-be14-a719ed5baa32
// https://www.chaijs.com/plugins/chai-http/
// https://dev.to/matheusg18/testes-de-integracao-para-api-com-typescript-mocha-chai-e-sinon-3np9