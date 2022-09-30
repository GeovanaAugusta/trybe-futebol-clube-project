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
    it('Deve ser possível logar um usuário com sucesso', async () => {
      await (chai.request(app).post('/login')).send(userMock)
      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.have.property('message');
    })
    it('Deve retornar um token, se os dados de login estiverem certos', async () => {  
       await (chai.request(app).post('/login')).send(userMock);
      expect(chaiHttpResponse.body).to.have.property('token');
      expect(chaiHttpResponse.body).to.deep.equal({token: tokenMock})
    });
    it('Deve retornar um erro, se o email estiver errado', async () => {  
      await (chai.request(app).post('/login')).send({
        email: 'admin@admin.csom',
        password: 'secret_admin',
      })
     expect(chaiHttpResponse.body).not.to.have.property('token');
     expect(chaiHttpResponse.body).not.equal({token: tokenMock});
     expect(chaiHttpResponse.status).to.equal(401);
   });
  })
  

  describe('GET', () => {

     beforeEach(async () => {
      sinon.restore();
      })
 
    it('Deve retornar o nível de acesso de forma bem sucedida /login/validate', async () => {
      await (chai.request(app).post('/login/validate')).send();
      expect(chaiHttpResponse.status).to.equal(200);
    });
    it('Deve retornar o nível de acesso do user', async () => {  
      expect(chaiHttpResponse.body).to.be.equal({ role: 'admin'});
    });
   
      it('Se a autorização é validada, deve retornar o nível de acesso', async () => {
         await chai.request(app).get('/login/validate').set(
          'authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjY0NDgzNDU3LCJleHAiOjE2NjUyNjEwNTd9.LYIRn2K-PSS7EnIKy3TYRRFCPxqn4Qil2DurIaVYLKI'
        ) 
        expect(chaiHttpResponse.body).to.have.property('role');
        expect(chaiHttpResponse.body.role).to.be.equal('admin');
      })
})
})
// SOURCE
// https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/live-lectures/140133e3-d28a-4e8c-8ed3-4ba478fabf71/recording/d3d04db1-590b-47cc-be14-a719ed5baa32
// https://www.chaijs.com/plugins/chai-http/
// https://dev.to/matheusg18/testes-de-integracao-para-api-com-typescript-mocha-chai-e-sinon-3np9