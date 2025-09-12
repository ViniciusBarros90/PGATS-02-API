//Bibliotecas
const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();



//Testes
describe('API REST Transfer External', () => {
  describe('POST /api/transfers', () => {
    it('Quando informo remetente de destinatário inexistente em uma API external, recebo 400', async () => {

    // 1 - Capturar o token
      const loginResponse = await request(process.env.BASE_URL_REST)
        .post('/api/users/login')
        .send({
          username: 'vinicius',
          password: 'julio'
        })
      const token = loginResponse.body.token;

     
    // 2 - Realizar a transferência
      const response = await request(process.env.BASE_URL_REST)
        .post('/api/transfers')
        .set('Authorization', `Bearer ${token}`)
        .send({
          from: "vinicius",
          to: "maria",
          amount: 200
          });

      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('error', 'Sender or recipient not found');
      });

   });    
   
});