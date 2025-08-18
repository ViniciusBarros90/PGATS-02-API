# API de Transferências e Usuários

Esta API permite o registro, login, consulta de usuários e transferências de valores entre usuários, com regras de negócio para aprendizado de testes automatizados.

## Instalação

1. Clone o repositório
2. Instale as dependências:
   ```
npm install express swagger-ui-express
```

## Como rodar

- Para rodar o servidor:
  ```
  node server.js
  ```
- Acesse a documentação Swagger em: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Endpoints principais

- `POST /api/users/register` — Registro de usuário
- `POST /api/users/login` — Login de usuário
- `GET /api/users` — Listar usuários
- `POST /api/transfers` — Realizar transferência
- `GET /api/transfers` — Listar transferências

## Regras de negócio

- Login exige usuário e senha.
- Não é permitido registrar usuários duplicados.
- Transferências para destinatários não favorecidos só podem ser feitas se o valor for menor que R$ 5.000,00.
- O banco de dados é em memória (os dados são perdidos ao reiniciar o servidor).

## Testes

A API foi estruturada para facilitar testes automatizados, especialmente com Supertest, importando o `app.js` sem o método `listen()`.
