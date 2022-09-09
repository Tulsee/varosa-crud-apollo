const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');

const { postTypeDefs } = require('./typeDef/postTypeDef');
const { userTypeDefs } = require('./typeDef/userTypeDef');
const postResolvers = require('./resolvers/post');
const userResolvers = require('./resolvers/user');

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs: [postTypeDefs, userTypeDefs],
    resolvers: [postResolvers, userResolvers],
  });
  await server.start();
  server.applyMiddleware({ app: app });

  await mongoose
    .connect('mongodb://localhost:27017/varosa', {
      useNewUrlParser: true,
    })
    .then(() => console.log('connected to mongodb'))
    .catch((err) => console.log(err));

  app.listen(2000, () => console.log(`server is running at port 2000`));
}
startServer();
