//Bibliotecas
const request = require('supertest');
const { expect } = require('chai');



//Testes
describe('Transfer Controller', () => {
  describe('POST /api/transfers', () => {
    it('Quando informo remetente de destinatário inexistente em uma API external, recebo 400', async () => {
      const response = await request('http://localhost:3000')
        .post('/api/transfers')
        .send({
          from: "vinicius",
          to: "julio",
          amount: 100
          });

      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('error', 'Sender or recipient not found');
      });

   });    
   
});