# API de Transferências e Usuários

API REST - Login de Usuário

Criei esta API REST para login de usuários utilizando a arquitetura em camadas, seguindo boas práticas de organização de código, responsabilidade única e separação de preocupações.

A aplicação inclui:

✅ Autenticação de usuários

✅ Execução de testes automatizados

✅ Ambiente de configuração com .env

✅ Cobertura de testes via app, mock e chamadas externas

✅ Simulações com Sinon

✅ Integração com pipeline (CI/CD)

🔧 **Tecnologias e Ferramentas Utilizadas**

Node.js + Express

Arquitetura em camadas (Controller, Service, Model)

Mocha (test runner)

Chai (assertions)

Sinon (mocks)

Supertest (testes de endpoints HTTP)

dotenv (variáveis de ambiente)

Padrões de teste

Testes unitários com mock

Testes de integração com app

Testes de integração externo

Testes externos com chamada via BASE_URL_REST

## Instalação

1. Clone o repositório
npm install express swagger-ui-express

2. Instale as dependências para a API REST e GraphQL:
  ```
npm install express@4 swagger-ui-express apollo-server-express@3 graphql jsonwebtoken
```
## Configuração

Antes de seguir, crie um arquivo .env na pasta raiz contendo as propriedades BASE_URL_REST e BASE_URL_GRAPHQL com a URL desses serviços.

## Como rodar a API REST

- Para rodar o servidor REST:
  ```
  node server.js
  ```
- Acesse a documentação Swagger em: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Como rodar a API GraphQL

- Entre na pasta `graphql`:
  ```
  cd graphql
  node server.js
  ```
- Playground GraphQL: [http://localhost:4000/graphql](http://localhost:4000/graphql)


## Endpoints principais (REST)

- `POST /api/users/register` — Registro de usuário
- `POST /api/users/login` — Login de usuário
- `GET /api/users` — Listar usuários
- `POST /api/transfers` — Realizar transferência
- `GET /api/transfers` — Listar transferências

## Operações principais (GraphQL)

- `register(username, password, isFavored)` — Mutation para registrar usuário
- `login(username, password)` — Mutation para login (retorna token JWT)
- `users` — Query para listar usuários
- `transfer(from, to, amount)` — Mutation para transferir valores (requer JWT)
- `transfers` — Query para listar transferências (requer JWT)


## Regras de negócio

- Login exige usuário e senha.
- Não é permitido registrar usuários duplicados.
- Transferências para destinatários não favorecidos só podem ser feitas se o valor for menor que R$ 5.000,00.
- O banco de dados é em memória (os dados são perdidos ao reiniciar o servidor).

## Autenticação JWT

- Após o login, use o token JWT retornado para autenticar mutations de transferências e queries de transferências na API GraphQL.
- Envie o header: `Authorization: Bearer <token>`

## Testes

A API foi estruturada para facilitar testes automatizados, especialmente com Supertest, importando o `app.js` sem o método `listen()`.
