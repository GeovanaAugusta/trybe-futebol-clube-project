import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';


import { Response } from 'superagent';


chai.use(chaiHttp);

const { expect } = chai;

describe('/login', () => {
  let chaiHttpResponse: Response;

  describe('POST', () => {
    it('Deve cadastrar um usuário com sucesso', async () => {
      await (chai.request(app).post('/login')).send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      })
      expect(chaiHttpResponse.status).to.equal(200);
    })
    it('Deve retornar um token, se os dados de login estiverem certos', async () => {  
       await (chai.request(app).post('/login')).send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      })
      expect(chaiHttpResponse.body).to.have.property('token');
    });
  })
});

// SOURCE
// https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/live-lectures/140133e3-d28a-4e8c-8ed3-4ba478fabf71/recording/d3d04db1-590b-47cc-be14-a719ed5baa32
// https://www.chaijs.com/plugins/chai-http/
// https://dev.to/matheusg18/testes-de-integracao-para-api-com-typescript-mocha-chai-e-sinon-3np9