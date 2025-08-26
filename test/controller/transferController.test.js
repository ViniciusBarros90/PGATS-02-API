//Bibliotecas
const request = require('supertest');
const sinon = require('sinon')
const { expect } = require('chai');

//Mock
const transferService = require('../../service/transferService');

//Aplicação
const app = require('../../app');
const { describe } = require('mocha');

//Testes
describe('Transfer Controller', () => {

afterEach(() => {
  sinon.restore();
});

    describe('POST /api/transfers', () => {
      it('Quando  informo remetente de destinatário inexistente recebo 400', async () => {
      const response = await request(app)
        .post('/api/transfers')
        .send({
          from: "vinicius",
          to: "julio",
          amount: 100
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
          .send({
            from: "vinicius",
            to: "julio",
            amount: 100
                });

        expect(response.status).to.equal(400);
        expect(response.body).to.have.property('error', 'Sender or recipient not found');

            //Reseta o Mock
            sinon.restore();
        });

      it.only('Usando Mocks: Quando  informo valores válidos eu tenho sucesso com 201 CREATED', async () => {
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
          .send({
             from: "vinicius",
             to: "julio",
             amount: 100
             });

        expect(response.status).to.equal(201);

            //Validação com Fixture
            const respostaEperada = required('../fixture/respostas/quandoInformoValoresValidosEuTenhoSucessoCom201Created.json');
            delete resposta.body.date;
            delete respostaEperada.date;
            expect(resposta.body).to.deep.equal(respostaEperada);


            //expect(response.body).to.have.property('from', 'vinicius');
            //expect(response.body).to.have.property('to', 'julio');
            //expect(response.body).to.have.property('amount', 100);

            //Reseta o Mock
            sinon.restore();
        });

    });

    describe('GET /api/transfers', () => {
        //it aqui

    });


})
                

        