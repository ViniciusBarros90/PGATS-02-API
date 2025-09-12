//Bibliotecas
const request = require('supertest');
const sinon = require('sinon')
const { expect } = require('chai');

//Mock
const transferService = require('../../../service/transferService');

//Aplicação
const app = require('../../../app');
const { describe } = require('mocha');

//Capturar token
let token; 


//Testes
describe('API REST Transfer Controller', () => {
    describe('POST /api/transfers', () => {

      beforeEach(async  () => {
        const loginResponse = await request(app)
          .post('/api/users/login')
          .send({
            username: 'vinicius',
            password: 'julio'
          });

        token = loginResponse.body.token;
      });




      it('Quando informo remetente de destinatário inexistente recebo 400', async () => {
        const response = await request(app)
          .post('/api/transfers')
          .set('Authorization', `Bearer ${token}`)
          .send({
            from: "vinicius",
            to: "Sabrina",
            amount: 200
          });

        expect(response.status).to.equal(400);
        expect(response.body).to.have.property('error', 'Sender or recipient not found');
        });

      it('Usando Mocks: Quando  informo remetente de destinatário inexistente recebo 400', async () => {
     //Mocar apenas a função externa transfer do Service
        const transferServiceMock = sinon.stub(transferService, 'transfer');
          transferServiceMock.throws(new Error('Sender or recipient not found'));
            
        const response = await request(app)
          .post('/api/transfers')
          .set('Authorization', `Bearer ${token}`)
          .send({
            from: "vinicius",
            to: "bb",
            amount: 100
                });

        expect(response.status).to.equal(400);
        expect(response.body).to.have.property('error', 'Sender or recipient not found');
      });   
      
            
      

      it('Usando Mocks: Quando informo valores válidos eu tenho sucesso com 201 CREATED', async () => {
      //Mocar apenas a função externa transfer do Service
        const transferServiceMock = sinon.stub(transferService, 'transfer');
          transferServiceMock.returns({
            from: "vinicius",
            to: "julio",
            amount: 100,
            date: new Date().toISOString()
          });
            
        const response = await request(app)
          .post('/api/transfers')
          .set('Authorization', `Bearer ${token}`)
          .send({
             from: "",
             to: "",
             amount: 100
          });

        expect(response.status).to.equal(201);

            //Validação com Fixture
        const respostaEperada = require('../fixture/respostas/quandoInformoValoresValidosEuTenhoSucessoCom201Created.json');
        delete response.body.date;
        delete respostaEperada.date;
        expect(response.body).to.deep.equal(respostaEperada);
                      
      });
    
    });

      //Reseta o Mock
      afterEach(() => {
        sinon.restore();
      });


});
                

        