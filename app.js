const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');
const { tokenVerify } = require('./config');

const { postTypeDefs } = require('./typeDef/postTypeDef');
const { userTypeDefs } = require('./typeDef/userTypeDef');
const postResolvers = require('./resolvers/post');
const userResolvers = require('./resolvers/user');
const app = express();

async function startServer() {
  const server = new ApolloServer({
    typeDefs: [postTypeDefs, userTypeDefs],
    resolvers: [postResolvers, userResolvers],
    context: async ({ req, res }) => {
      const token = req.headers.authorization;
      const user = await tokenVerify(token);
      return { user };
    },
  });
  await server.start();
  server.applyMiddleware({ app });

  await mongoose
    .connect('mongodb://localhost:27017/varosa', {
      useNewUrlParser: true,
    })
    .then(() => console.log('connected to mongodb'))
    .catch((err) => console.log(err));

  app.listen(2000, () => console.log(`server is running at port 2000`));
}
startServer();
