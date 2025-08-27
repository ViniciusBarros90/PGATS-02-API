//Bibliotecas
const request = require('supertest');
const sinon = require('sinon')
const { expect } = require('chai');

//Mock
const userService = require('../../service/userService');

//Aplicação
const app = require('../../app');
const { describe } = require('mocha');

//Testes
describe('User Controller', () => {
    describe('POST /api/users/register', () => {

      
        it('Quando não informo dados obrigatórios no registro de login, recebo 400', async () => {
            const response = await request(app)
                .post('/api/users/register')
                .send({
                    username: "", 
                    password: "123456",
                    isFavored: true
                });

            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('error', 'Username and password are required');
        });

        it('Quando registrar um novo usuário com sucesso, recebo 201', async () => {
            const response = await request(app)
                .post('/api/users/register')
                .send({
                    username: "Bia",
                    password: "123456",
                    isFavored: true
                });

            expect(response.status).to.equal(201);
        });

        it('Quando registro um usuário já existente, recebo 400', async () => {
            const response = await request(app)
                .post('/api/users/register')
                .send({
                    username: "Bia",
                    password: "123456",
                    isFavored: true
                });

            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('error', 'User already exists');
        });
    });

    describe('POST /api/users/login', () => {
        it('Quando faço login com credenciais pendentes, recebo 400', async () => {
            const response = await request(app)
                .post('/api/users/login')
                .send({
                    username: "vinicius",
                    password: "",
                    isFavored: true
                });

            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('error', 'Username and password are required');
        });

        it('Quando faço login com credenciais inválidas, recebo 400', async () => {
            const response = await request(app)
                .post('/api/users/login')
                .send({
                    username: "Bia",
                    password: "123",
                    isFavored: true
                });

            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('error', 'Invalid credentials');
        });

            
            
        

    });
});