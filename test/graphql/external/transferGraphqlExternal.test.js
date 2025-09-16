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

    it('Token de autenticação não informado', async () => {
        const resposta = await request(process.env.BASE_URL_GRAPHQL)
            .post('')
            .send(transfer);

        expect(resposta.body).to.have.property('errors');
        expect(resposta.body.errors[0].message).to.equal('Not authenticated');
    });

    const testesDeErrosDeNegocios = require('../fixture/request/transfer/createTransferWithError.json');
    testesDeErrosDeNegocios.forEach(teste => {

        it(`Testando as regras relacionadas aos erros: ${teste.nomeDoTeste}`, async () => {
            const resposta = await request(process.env.BASE_URL_GRAPHQL)
                .post('')
                .set('Authorization', 'Bearer ' + token)
                .send(teste.transferJson);

        expect(resposta.body).to.have.property('errors');
        expect(resposta.body.errors[0].message).to.equal(teste.mensagemEsperada);
        });
        
    });
   
});
