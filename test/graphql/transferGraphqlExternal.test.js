const request = require('supertest');
const { expect } = require('chai');

describe('Transfer Mutation - GraphQL', () => {
    let token;

    beforeEach(async () => {
        const resposta = await request('http://localhost:4000')
            .post('/graphql')
            .send({
                query: `
                    mutation Login($username: String!, $password: String!) {
                        login(username: $username, password: $password) {
                            token
                        }
                    }
                `,
                variables: {
                    username: "vinicius",
                    password: "julio"
                }

            });
        token = resposta.body.data.login.token;
    });

    it('a) Transferência com sucesso', async () => {
        const resposta = await request('http://localhost:4000')
            .post('/graphql')
            .set('Authorization', 'Bearer ' + token)
            .send({
                query: `
                    mutation Transfer($from: String!, $to: String!, $amount: Float!) {
                        transfer(from: $from, to: $to, amount: $amount) {
                            from
                            to
                            amount
                        }
                    }
                `,
                variables: {
                    from: "vinicius",
                    to: "julio",
                    amount: 10
                }
            });

        expect(resposta.status).to.be.equal(200);
        expect(resposta.body.data.transfer).to.have.property('from', 'vinicius');
        expect(resposta.body.data.transfer).to.have.property('to', 'julio');
        expect(resposta.body.data.transfer).to.have.property('amount', 10);
    });

    it('b) Sem saldo disponível para transferência', async () => {
        const resposta = await request('http://localhost:4000')
            .post('/graphql')
            .set('Authorization', 'Bearer ' + token)
            .send({
                query: `
                    mutation Transfer($from: String!, $to: String!, $amount: Float!) {
                        transfer(from: $from, to: $to, amount: $amount) {
                            from
                            to
                            amount
                        }
                    }
                `,
                variables: {
                    from: "vinicius",
                    to: "julio",
                    amount: 100000000
                }
            });

        expect(resposta.status).to.be.equal(200);
        expect(resposta.body).to.have.property('errors');
        expect(resposta.body.errors[0].message).to.equal('Insufficient balance');
    });

    it('c) Token de autenticação não informado', async () => {
        const resposta = await request('http://localhost:4000')
            .post('/graphql')
            .send({
                query: `
                    mutation Transfer($from: String!, $to: String!, $amount: Float!) {
                        transfer(from: $from, to: $to, amount: $amount) {
                            from
                            to
                            amount
                        }
                    }
                `,
                variables: {
                    from: "julio",
                    to: "vinicius",
                    amount: 10
                }
            });

        expect(resposta.body).to.have.property('errors');
        expect(resposta.body.errors[0].message).to.equal('Not authenticated');
    });
});
