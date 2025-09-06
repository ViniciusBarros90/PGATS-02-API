const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const { authenticateTokenGraphql } = require('./auth');

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => authenticateTokenGraphql(req)
});

async function startApollo() {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });
}

startApollo();

module.exports = app;
