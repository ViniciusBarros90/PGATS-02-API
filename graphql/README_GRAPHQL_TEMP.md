# API GraphQL

## Bibliotecas necessárias
- apollo-server-express
- express
- graphql
- jsonwebtoken

Instale com:
```
npm install apollo-server-express@3 express@4 graphql jsonwebtoken
```

## Como rodar a API GraphQL

1. Vá até a pasta `graphql`.
2. Execute:
```
node server.js
```

Acesse o playground em: [http://localhost:4000/graphql](http://localhost:4000/graphql)

## Autenticação
- Para mutations de transferências, envie o token JWT no header `Authorization: Bearer <token>`
