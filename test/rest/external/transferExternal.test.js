//Bibliotecas
const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();



//Testes
describe('API REST Transfer External', () => {
  describe('POST /api/transfers', () => {
    before(async () => {
      const postLogin = require('../fixture/request/login/postLogin.json');

    // 1 - Capturar o token
      const loginResponse = await request(process.env.BASE_URL_REST)
        .post('/api/users/login')
        .send(postLogin);

      token = loginResponse.body.token;
    });
        

    // 2 - Realizar a transferência
    const testesDeErrosDeNegocios = require('../fixture/transfers/postTransfersWithError.json');
    testesDeErrosDeNegocios.forEach((teste) => {
      it(`Testando a regra relacionada a ${teste.nomeDoTeste}`, async () => { 
        const response = await request(process.env.BASE_URL_REST)
          .post('/api/transfers')
          .set('Authorization', `Bearer ${token}`)
          .send(teste.postTransfers);

        expect(response.status).to.equal(teste.statusCode);
        expect(response.body).to.have.property('error', teste.mensagemEsperada);
      });

    });    
   
  });

});