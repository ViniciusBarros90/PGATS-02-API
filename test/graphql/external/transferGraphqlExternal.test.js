const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();

describe('API GRAPHQL Transfer External', () => {
    let token;

    before(async () => {
        const login = require('../fixture/request/login/mutationLogin.json');
        const resposta = await request(process.env.BASE_URL_GRAPHQL)
            .post('')
            .send(login);
            
        token = resposta.body.data.login.token;
    });

     beforeEach(async () => {
        transfer = require('../fixture/request/transfer/mutationTransfer.json');
    });

    it('Transferência com sucesso', async () => {
        const respostaEsperada = require('../fixture/request/response/transfer/transferenciaComSucesso.json');

        const resposta = await request(process.env.BASE_URL_GRAPHQL)
            .post('')
            .set('Authorization', 'Bearer ' + token)
            .send(transfer);

        expect(resposta.status).to.be.equal(200);
        expect(resposta.body).to.eql(respostaEsperada);
    });

    it('Sem saldo disponível para transferência', async () => {
        transfer.variables.amount = 100000000; 

        const resposta = await request(process.env.BASE_URL_GRAPHQL)
            .post('')
            .set('Authorization', 'Bearer ' + token)
            .send(transfer);

        expect(resposta.body).to.have.property('errors');
        expect(resposta.body.errors[0].message).to.equal('Insufficient balance');
    });

    it('Token de autenticação não informado', async () => {
        const resposta = await request(process.env.BASE_URL_GRAPHQL)
            .post('')
            .send(transfer);

        expect(resposta.body).to.have.property('errors');
        expect(resposta.body.errors[0].message).to.equal('Not authenticated');
    });
});
