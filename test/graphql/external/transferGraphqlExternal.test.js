const request = require('supertest');
const { expect } = require('chai');

describe('Transfer Mutation - GraphQL', () => {
    let token;

    before(async () => {
        const login = require('../fixture/request/login/mutationLogin.json');
        const resposta = await request('http://localhost:4000/graphql')
            .post('')
            .send(login);
            
        token = resposta.body.data.login.token;
    });

     beforeEach(async () => {
        transfer = require('../fixture/request/transfer/mutationTransfer.json');
    });

    it('Transferência com sucesso', async () => {
        const respostaEsperada = require('../fixture/request/response/transfer/transferenciaComSucesso.json');

        const resposta = await request('http://localhost:4000/graphql')
            .post('')
            .set('Authorization', 'Bearer ' + token)
            .send(transfer);

        expect(resposta.status).to.be.equal(200);
        expect(resposta.body).to.eql(respostaEsperada);
    });

    it('Sem saldo disponível para transferência', async () => {
        transfer.variables.amount = 100000000; 

        const resposta = await request('http://localhost:4000/graphql')
            .post('')
            .set('Authorization', 'Bearer ' + token)
            .send(transfer);

        expect(resposta.body).to.have.property('errors');
        expect(resposta.body.errors[0].message).to.equal('Insufficient balance');
    });

    it('Token de autenticação não informado', async () => {
        const resposta = await request('http://localhost:4000')
            .post('/graphql')
            .send(transfer);

        expect(resposta.body).to.have.property('errors');
        expect(resposta.body.errors[0].message).to.equal('Not authenticated');
    });
});
