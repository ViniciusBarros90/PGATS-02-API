//Bibliotecas
const request = require('supertest');
const sinon = require('sinon')
const { expect } = require('chai');

//Aplicação
const app = require('../../app');
const { describe } = require('mocha');

//Testes
describe('Transfer Controller', () => {
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

    })

    describe('GET /api/transfers', () => {
        //it aqui

    });


})
                

        